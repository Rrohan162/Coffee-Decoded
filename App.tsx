import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import CoffeeCup from './components/CoffeeCup';
import { COFFEE_RECIPES } from './constants';
import { CoffeeRecipe, GeminiCoffeeInfo } from './types';
import { fetchCoffeeInfo } from './services/geminiService';
import { Info, Leaf, ChevronDown, Coffee } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeRecipe>(COFFEE_RECIPES[2]); // Default to Cappuccino
  const [geminiInfo, setGeminiInfo] = useState<GeminiCoffeeInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getInfo = async () => {
      setLoading(true);
      setGeminiInfo(null);
      
      const info = await fetchCoffeeInfo(selectedCoffee.name);
      
      if (isMounted) {
        setGeminiInfo(info);
        setLoading(false);
      }
    };

    getInfo();

    return () => {
      isMounted = false;
    };
  }, [selectedCoffee]);

  // Sort recipes alphabetically for mobile dropdown
  const sortedRecipes = useMemo(() => {
    return [...COFFEE_RECIPES].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleMobileSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const recipeId = e.target.value;
    const recipe = COFFEE_RECIPES.find(r => r.id === recipeId);
    if (recipe) setSelectedCoffee(recipe);
  };

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-[#1a1a1a] text-white overflow-hidden font-sans">
      {/* Sidebar Navigation (Desktop/Tablet - md breakpoint is 768px) */}
      <Sidebar 
        selectedCoffee={selectedCoffee} 
        onSelect={setSelectedCoffee} 
        className="hidden md:flex flex-shrink-0"
      />

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        
        {/* Mobile Header (Compact - only visible on small screens) */}
        <div className="md:hidden absolute top-0 left-0 w-full z-20 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
           <div className="flex items-center gap-2 pointer-events-auto">
             <div className="p-1.5 bg-amber-600 rounded-lg shadow-lg">
               <Coffee className="text-white w-4 h-4" />
             </div>
             {/* App Name removed for mobile as requested */}
           </div>
        </div>

        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_60%_40%,rgba(60,40,30,0.25),rgba(0,0,0,0))] pointer-events-none z-0"></div>

        {/* Main Visual Container - Flex Column with NO SCROLL */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 md:p-8 max-w-6xl mx-auto">
            
            {/* 1. Header Section */}
            <div className="flex-none pt-10 md:pt-0 text-center animate-fade-in-down z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-1 font-serif tracking-tight leading-tight drop-shadow-lg">
                {selectedCoffee.name}
              </h2>
              
              <p className="hidden md:block text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed mt-2">
                {selectedCoffee.description}
              </p>
              {/* Mobile description kept minimal */}
              <p className="md:hidden text-gray-300 text-[11px] max-w-xs mx-auto leading-tight line-clamp-2 mt-1 opacity-90">
                {selectedCoffee.description}
              </p>

              {/* MOBILE ONLY: Taste Profile Tags displayed immediately below description */}
              <div className="md:hidden flex flex-wrap justify-center gap-1.5 mt-2 animate-fade-in-up min-h-[24px]">
                 {loading ? (
                    <span className="text-gray-500 text-[10px]">Loading...</span>
                  ) : (
                    geminiInfo?.tasteProfile.split(',').slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-amber-900/30 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-sm shadow-sm">
                        {tag.trim()}
                      </span>
                    ))
                  )}
              </div>
            </div>
            
            {/* 2. Coffee Visualizer - Grows to fill space */}
            <div className="flex-1 flex items-center justify-center relative min-h-0 my-0 md:my-2">
              <CoffeeCup recipe={selectedCoffee} />
            </div>

            {/* 3. Info Section - Fixed at bottom above selector */}
            <div className="flex-none w-full flex flex-col gap-2 max-w-3xl mx-auto animate-fade-in-up mb-20 md:mb-0">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full">
                {/* Taste Profile - Desktop Only (Hidden on mobile as tags are at top) */}
                <div className="hidden md:flex bg-[#232323]/90 backdrop-blur-xl border border-white/5 p-2.5 md:p-4 rounded-xl shadow-lg flex-col items-center text-center">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Leaf className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                    <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Taste Profile</h4>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {loading ? (
                      <span className="text-gray-500 text-[10px]">Loading...</span>
                    ) : (
                      geminiInfo?.tasteProfile.split(',').slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-black/40 border border-white/10 text-gray-300 text-[10px] md:text-xs font-medium rounded-full whitespace-nowrap">
                          {tag.trim()}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Fun Fact - Desktop Only (Removed from mobile as requested) */}
                <div className="hidden md:flex bg-[#232323]/90 backdrop-blur-xl border border-white/5 p-2.5 md:p-4 rounded-xl shadow-lg flex-col items-center text-center">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Info className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    <h4 className="text-blue-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Did You Know?</h4>
                  </div>
                  <p className="text-gray-300 text-[10px] md:text-xs leading-snug line-clamp-3">
                    {loading ? "Brewing facts..." : geminiInfo?.funFact}
                  </p>
                </div>
              </div>

              {/* Mobile Footer Credits */}
              <div className="md:hidden text-center pt-2 pb-1 opacity-90">
                <p className="text-[10px] text-gray-500">Built with ❤️ by <span className="text-gray-400 font-medium">Rohan Mayekar</span></p>
                <a href="https://www.linkedin.com/in/rohanmayekar/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-amber-500 hover:text-amber-400 transition-colors">Connect on LinkedIn</a>
              </div>
              
            </div>
        </div>

        {/* Mobile Bottom Selector (Floating above bottom) */}
        <div className="md:hidden fixed bottom-6 left-4 right-4 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 p-2 rounded-2xl z-50 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="relative">
             <select 
               value={selectedCoffee.id}
               onChange={handleMobileSelect}
               className="w-full appearance-none bg-[#2a2a2a] text-white border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm font-medium focus:outline-none focus:border-amber-500/50 transition-colors shadow-xl"
             >
                {sortedRecipes.map(recipe => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.name}
                  </option>
                ))}
             </select>
             <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-4 h-4 pointer-events-none" />
          </div>
        </div>

      </main>

      <style>{`
        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 16px);
        }
      `}</style>
    </div>
  );
};

export default App;