import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { CoffeeRecipe } from "../types";

// Types for the session events
type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

interface BaristaCallbacks {
  onStateChange: (state: ConnectionState) => void;
  onAudioLevel?: (level: number) => void; // For visualizer
  onError: (error: string) => void;
}

export class LiveBaristaService {
  private ai: GoogleGenAI;
  private currentSession: any = null;
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private inputSource: MediaStreamAudioSourceNode | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private nextStartTime: number = 0;
  private audioSources: Set<AudioBufferSourceNode> = new Set();
  private callbacks: BaristaCallbacks;

  constructor(callbacks: BaristaCallbacks) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");
    this.ai = new GoogleGenAI({ apiKey });
    this.callbacks = callbacks;
  }

  async connect(currentRecipe: CoffeeRecipe) {
    this.callbacks.onStateChange('connecting');

    try {
      // 1. Setup Audio Contexts
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // 2. Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 3. Define the system prompt with context
      const systemInstruction = `You are an expert, charming barista at a high-end specialty coffee shop called 'Coffee-Decoded'. 
      The customer is currently looking at a 3D visualization of a "${currentRecipe.name}" (${currentRecipe.category}). 
      Description: ${currentRecipe.description}.
      Ingredients: ${currentRecipe.layers.map(l => l.type).join(', ')}.
      
      Your goal is to have a natural, friendly spoken conversation. 
      Answer questions about this coffee, brewing tips, or coffee history.
      Keep your responses relatively concise and conversational, suitable for spoken audio. 
      Do not use markdown formatting in speech. Be warm and passionate.`;

      // 4. Connect to Gemini Live
      const config = {
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: this.handleOpen.bind(this, stream),
          onmessage: this.handleMessage.bind(this),
          onerror: (e: any) => {
            console.error("Gemini Live Error:", e);
            this.callbacks.onError("Connection error occurred.");
            this.callbacks.onStateChange('error');
          },
          onclose: () => {
            console.log("Gemini Live Closed");
            this.callbacks.onStateChange('disconnected');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: systemInstruction,
        }
      };

      // Store the session promise so we can access it in the audio processor
      this.currentSession = this.ai.live.connect(config);

    } catch (error: any) {
      console.error("Failed to connect:", error);
      this.callbacks.onError(error.message || "Failed to access microphone or connect.");
      this.callbacks.onStateChange('error');
    }
  }

  private handleOpen(stream: MediaStream) {
    this.callbacks.onStateChange('connected');
    
    if (!this.inputAudioContext) return;

    // Create the input processing pipeline
    this.inputSource = this.inputAudioContext.createMediaStreamSource(stream);
    // bufferSize 4096, 1 input channel, 1 output channel
    this.scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);
    
    this.scriptProcessor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      
      // Calculate generic audio level for UI visualizer
      if (this.callbacks.onAudioLevel) {
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        this.callbacks.onAudioLevel(Math.sqrt(sum / inputData.length));
      }

      // Convert to PCM 16-bit
      const pcm16 = this.floatTo16BitPCM(inputData);
      const base64Data = this.arrayBufferToBase64(pcm16);

      // Send to Gemini
      if (this.currentSession) {
        this.currentSession.then((session: any) => {
             session.sendRealtimeInput({ 
                media: { 
                    mimeType: 'audio/pcm', 
                    data: base64Data 
                } 
             });
        });
      }
    };

    this.inputSource.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.inputAudioContext.destination);
  }

  private async handleMessage(message: LiveServerMessage) {
    const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    
    if (audioData && this.outputAudioContext) {
      // Decode the raw PCM output from Gemini
      const audioBuffer = await this.decodeAudioData(
        this.base64ToArrayBuffer(audioData),
        this.outputAudioContext,
        24000,
        1
      );

      // Play audio queue
      this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
      
      const source = this.outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.outputAudioContext.destination);
      
      source.start(this.nextStartTime);
      this.nextStartTime += audioBuffer.duration;
      this.audioSources.add(source);
      
      source.onended = () => {
        this.audioSources.delete(source);
      };
    }

    // Handle interruptions
    if (message.serverContent?.interrupted) {
      this.stopAllAudio();
      this.nextStartTime = 0;
    }
  }

  disconnect() {
    if (this.scriptProcessor && this.inputSource) {
      this.inputSource.disconnect();
      this.scriptProcessor.disconnect();
    }
    
    if (this.inputAudioContext) this.inputAudioContext.close();
    if (this.outputAudioContext) this.outputAudioContext.close();
    
    this.stopAllAudio();
    this.currentSession = null;
    this.callbacks.onStateChange('disconnected');
  }

  private stopAllAudio() {
    this.audioSources.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    this.audioSources.clear();
  }

  // --- Helpers ---

  private floatTo16BitPCM(input: Float32Array): ArrayBuffer {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return output.buffer;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private async decodeAudioData(
    arrayBuffer: ArrayBuffer, 
    ctx: AudioContext, 
    sampleRate: number, 
    numChannels: number
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(arrayBuffer);
    const frameCount = dataInt16.length / numChannels;
    const audioBuffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return audioBuffer;
  }
}