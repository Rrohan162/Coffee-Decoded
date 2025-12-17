import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import CoffeeCup from './components/CoffeeCup';
import { COFFEE_RECIPES, CATEGORIES } from './constants';
import { CoffeeRecipe, GeminiCoffeeInfo } from './types';
import { fetchCoffeeInfo } from './services/geminiService';
import { Info, Leaf, ChevronDown, Coffee, Search, X, Check } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeRecipe>(COFFEE_RECIPES[2]); // Default to Cappuccino
  const [geminiInfo, setGeminiInfo] = useState<GeminiCoffeeInfo | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Mobile Category & Search State
  const [mobileCategory, setMobileCategory] = useState("All");
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // Reset search when category changes
  useEffect(() => {
    setMobileSearchTerm("");
  }, [mobileCategory]);

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    let list = COFFEE_RECIPES;

    if (mobileCategory !== "All") {
      list = list.filter(r => r.category === mobileCategory);
    }

    if (mobileSearchTerm.trim()) {
      const lowerTerm = mobileSearchTerm.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(lowerTerm));
    }

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [mobileCategory, mobileSearchTerm]);

  // Auto-select logic
  useEffect(() => {
    if (mobileSearchTerm) return;
    const isCurrentInList = filteredRecipes.some(r => r.id === selectedCoffee.id);
    if (!isCurrentInList && filteredRecipes.length > 0) {
      setSelectedCoffee(filteredRecipes[0]);
    }
  }, [mobileCategory, mobileSearchTerm, filteredRecipes, selectedCoffee]);

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-[#1a1a1a] text-white overflow-hidden font-sans">
      {/* Sidebar Navigation (Desktop) */}
      <Sidebar 
        selectedCoffee={selectedCoffee} 
        onSelect={setSelectedCoffee} 
        className="hidden md:flex flex-shrink-0"
      />

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden absolute top-0 left-0 w-full z-20 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
           <div className="flex items-center gap-2 pointer-events-auto">
             <div className="p-1.5 bg-amber-600 rounded-lg shadow-lg">
               <Coffee className="text-white w-4 h-4" />
             </div>
           </div>
        </div>

        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_60%_40%,rgba(60,40,30,0.25),rgba(0,0,0,0))] pointer-events-none z-0"></div>

        {/* Main Visual Container - Updated to allow scrolling on mobile if content overflows */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 md:p-8 max-w-6xl mx-auto safe-area-bottom overflow-y-auto md:overflow-visible scrollbar-hide">
            
            {/* 1. Header Section */}
            <div className="flex-none pt-12 md:pt-0 text-center animate-fade-in-down z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-1 font-serif tracking-tight leading-tight drop-shadow-lg">
                {selectedCoffee.name}
              </h2>
              
              <p className="hidden md:block text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed mt-2">
                {selectedCoffee.description}
              </p>
              <p className="md:hidden text-gray-300 text-[11px] max-w-xs mx-auto leading-tight line-clamp-2 mt-1 opacity-90">
                {selectedCoffee.description}
              </p>

              {/* Mobile Tags */}
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
            
            {/* 2. Coffee Visualizer - Added min-height to ensure it doesn't shrink to 0 */}
            <div className="flex-1 flex items-center justify-center relative min-h-[300px] md:min-h-0 my-0 md:my-2">
              <CoffeeCup recipe={selectedCoffee} />
            </div>

            {/* 3. Info Section */}
            <div className="flex-none w-full flex flex-col gap-2 max-w-3xl mx-auto animate-fade-in-up md:mb-0 pb-[160px] md:pb-0">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full">
                {/* Taste Profile (Desktop) */}
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

                {/* Fun Fact (Desktop) */}
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

              {/* Mobile Footer Credits - Ensured high z-index and visibility */}
              <div className="md:hidden text-center pt-2 pb-1 opacity-90 flex flex-col items-center gap-1 relative z-10">
                <p className="text-[10px] text-gray-500">Built with ❤️ by <span className="text-gray-400 font-medium">Rohan Mayekar</span></p>
                <a 
                  href="https://www.linkedin.com/in/rohanmayekar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
              
            </div>
        </div>

        {/* Mobile Bottom Control Container */}
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 flex flex-col gap-3 safe-area-bottom">
          
          {/* Backdrop for Dropdown */}
          {isDropdownOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] animate-fade-in"
              onClick={() => setIsDropdownOpen(false)}
            />
          )}

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide z-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setMobileCategory(cat)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg backdrop-blur-md border border-white/10
                  ${mobileCategory === cat 
                    ? 'bg-amber-600 text-white shadow-amber-900/20' 
                    : 'bg-[#1a1a1a]/80 text-gray-400 hover:bg-[#2a2a2a]'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Custom Searchable Dropdown */}
          <div className="relative z-20">
              
              {/* Dropdown Menu (Popup) */}
              {isDropdownOpen && (
                <div className="absolute bottom-full mb-2 left-0 w-full bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[50vh] animate-fade-in-up origin-bottom">
                    
                    {/* Search Header */}
                    <div className="p-3 border-b border-white/5 bg-[#1e1e1e] sticky top-0 z-10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder={`Search ${mobileCategory === 'All' ? 'all' : mobileCategory}...`}
                                value={mobileSearchTerm}
                                onChange={(e) => setMobileSearchTerm(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder-gray-600"
                            />
                            {mobileSearchTerm && (
                                <button 
                                    onClick={() => setMobileSearchTerm('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar">
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map(recipe => (
                                <button
                                    key={recipe.id}
                                    onClick={() => {
                                        setSelectedCoffee(recipe);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between transition-colors ${
                                        selectedCoffee.id === recipe.id 
                                        ? 'bg-amber-600/20 text-amber-500' 
                                        : 'text-gray-300 hover:bg-white/5'
                                    }`}
                                >
                                    <span className="font-medium truncate mr-2">{recipe.name}</span>
                                    {selectedCoffee.id === recipe.id && <Check className="w-4 h-4 shrink-0" />}
                                </button>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
                                <Coffee className="w-8 h-8 opacity-20" />
                                <span>No coffees found</span>
                            </div>
                        )}
                    </div>
                </div>
              )}

              {/* Trigger Button */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                    w-full bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl 
                    flex items-center justify-between text-left transition-all active:scale-[0.98]
                    ${isDropdownOpen ? 'ring-2 ring-amber-500/50 border-transparent' : ''}
                `}
              >
                  <div className="flex flex-col overflow-hidden mr-2">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Selected Brew</span>
                    <span className="font-bold text-white text-base truncate">{selectedCoffee.name}</span>
                  </div>
                  <div className={`
                    p-2 rounded-full bg-white/5 transition-transform duration-300 shrink-0
                    ${isDropdownOpen ? 'rotate-180 bg-amber-500 text-white' : 'text-amber-500'}
                  `}>
                     <ChevronDown className="w-5 h-5" />
                  </div>
              </button>
          </div>
        </div>

      </main>

      <style>{`
        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;