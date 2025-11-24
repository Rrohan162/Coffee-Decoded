import React, { useEffect, useState } from 'react';
import { CoffeeRecipe, CoffeeLayer, IngredientType } from '../types';

interface CoffeeCupProps {
  recipe: CoffeeRecipe;
}

const CoffeeCup: React.FC<CoffeeCupProps> = ({ recipe }) => {
  const [animatedLayers, setAnimatedLayers] = useState<CoffeeLayer[]>(recipe.layers);

  // Update layers when recipe changes
  useEffect(() => {
    setAnimatedLayers(recipe.layers);
  }, [recipe]);

  // Precise positioning math
  // The Cup is h-96 (384px).
  // The liquid container is inset-2 bottom-2 (top: 8px, bottom: 8px).
  // Liquid renders in a 368px height area (384 - 16).
  // Bottom offset is 8px.
  const CONTAINER_HEIGHT_PX = 384; 
  const PADDING_VERTICAL_PX = 16;
  const BOTTOM_OFFSET_PX = 8;
  const LIQUID_HEIGHT_PX = CONTAINER_HEIGHT_PX - PADDING_VERTICAL_PX;

  // Calculate label positions
  let currentHeightRatio = 0;
  const labels = recipe.layers.map((layer) => {
    // Calculate center relative to liquid stack
    const layerCenterRatio = currentHeightRatio + layer.ratio / 2;
    currentHeightRatio += layer.ratio;
    
    const centerInLiquidPx = (layerCenterRatio / 100) * LIQUID_HEIGHT_PX;
    const absoluteBottomPx = BOTTOM_OFFSET_PX + centerInLiquidPx;
    const cssBottomPercent = (absoluteBottomPx / CONTAINER_HEIGHT_PX) * 100;

    // Apply -5% vertical offset as requested
    const finalBottomPercent = cssBottomPercent - 5;

    return {
      ...layer,
      centerPosition: finalBottomPercent
    };
  });

  return (
    // Dynamic scaling: 
    // Adjusted mobile scale to 0.72 to prevent text cropping on narrow screens while keeping it large enough
    // scale-100 on desktop
    <div className="relative w-full h-full flex items-center justify-center perspective-1000 scale-[0.72] sm:scale-90 md:scale-100 transition-transform duration-500 origin-center">
      {/* Platform/Shadow */}
      <div className="absolute bottom-4 w-40 h-8 bg-black/50 blur-xl rounded-full transform rotate-x-60"></div>

      {/* The Cup Container */}
      <div className="relative w-56 h-80 sm:w-64 sm:h-96 transition-all duration-500">
        
        {/* Glass Reflection Front */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-b-[4rem] rounded-t-sm border-l border-r border-b border-white/20 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/10 to-transparent transform skew-x-12"></div>
          <div className="absolute bottom-4 left-1/4 w-1/2 h-24 bg-white/5 blur-2xl rounded-full"></div>
        </div>

        {/* Liquid Container */}
        <div className="absolute inset-2 bottom-2 rounded-b-[3.5rem] overflow-hidden flex flex-col-reverse bg-white/5 backdrop-blur-[2px] z-10 transition-all duration-700 ease-out border border-white/10">
          {animatedLayers.map((layer, index) => {
            const isIce = layer.type === IngredientType.ICE;
            
            return (
              <div
                key={`${layer.type}-${index}`}
                style={{
                  height: `${layer.ratio}%`,
                  background: layer.gradient,
                  transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="w-full relative shadow-lg overflow-hidden"
              >
                 {/* Bubbles/Texture overlay for realism */}
                 <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                 
                 {/* Ice Cubes Rendering */}
                 {isIce && (
                    <div className="absolute inset-0 w-full h-full">
                        <div className="absolute top-1/4 left-4 w-10 h-10 bg-white/20 border border-white/40 rounded-lg transform rotate-12 backdrop-blur-sm shadow-inner"></div>
                        <div className="absolute bottom-2 right-6 w-12 h-12 bg-white/20 border border-white/40 rounded-lg transform -rotate-12 backdrop-blur-sm shadow-inner"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 border border-white/40 rounded-xl transform rotate-45 backdrop-blur-sm shadow-inner"></div>
                        <div className="absolute bottom-6 left-8 w-8 h-8 bg-white/20 border border-white/40 rounded-md transform rotate-6 backdrop-blur-sm shadow-inner"></div>
                    </div>
                 )}
              </div>
            );
          })}
        </div>
        
        {/* Handle */}
        <div className="absolute top-12 -right-10 w-14 h-32 border-[12px] border-white/10 rounded-r-3xl rounded-l-none transform translate-z-[-10px] z-0 shadow-2xl"></div>

        {/* Floating Labels */}
        <div className="absolute inset-0 pointer-events-none z-30">
            {labels.map((label, index) => {
               // Only show label if the layer exists in the recipe
               if (label.ratio <= 0) return null;
               
               const isLeft = index % 2 === 0;
               
               return (
                <div
                  key={`label-${index}`}
                  className={`
                    absolute flex items-center group transition-all duration-500 ease-out
                    ${isLeft ? 'flex-row-reverse right-[100%] pr-2' : 'flex-row left-[100%] pl-2'}
                  `}
                  style={{
                    bottom: `${label.centerPosition}%`,
                    transform: `translateY(50%)`,
                    opacity: 1
                  }}
                >
                  {/* Dot on glass */}
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,1)] shrink-0 z-40"></div>
                  
                  {/* Connector Line - Shortened on mobile (w-4) to keep labels close to cup */}
                  <div className="w-4 md:w-16 h-[1px] bg-gradient-to-r from-amber-400 to-amber-400/0 mx-0 shrink-0"></div>

                  {/* Text Bubble */}
                  <div className={`
                    bg-[#111]/80 backdrop-blur-xl border border-white/10 p-2 md:p-3 rounded-lg text-white shadow-2xl
                    min-w-[80px] md:min-w-[120px] flex flex-col
                    ${isLeft ? 'mr-0 text-right items-end' : 'ml-0 text-left items-start'}
                  `}>
                    <span className="text-amber-400 font-bold text-lg md:text-xl leading-none">{Math.round(label.ratio)}%</span>
                    <span className="text-gray-200 text-[10px] md:text-[10px] font-bold uppercase tracking-widest mt-1 whitespace-nowrap">{label.type}</span>
                  </div>
                </div>
               );
            })}
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default CoffeeCup;