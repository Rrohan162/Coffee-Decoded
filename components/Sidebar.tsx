import React, { useState, useMemo } from 'react';
import { COFFEE_RECIPES, CATEGORIES } from '../constants';
import { CoffeeRecipe } from '../types';
import { Coffee, ChevronRight, Search } from 'lucide-react';

interface SidebarProps {
  selectedCoffee: CoffeeRecipe;
  onSelect: (coffee: CoffeeRecipe) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCoffee, onSelect, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAndSortedRecipes = useMemo(() => {
    return COFFEE_RECIPES.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, selectedCategory]);

  return (
    <div className={`w-full md:w-80 bg-[#232323] border-r border-white/5 flex flex-col h-full overflow-hidden z-20 shadow-2xl ${className}`}>
      <div className="flex-none p-6 border-b border-white/5 bg-[#2a2a2a] z-30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-600 rounded-lg shadow-lg shadow-amber-900/20">
            <Coffee className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">Coffee-Decoded</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Interactive Menu</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search coffees..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 transition-colors placeholder-gray-600"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all
                ${selectedCategory === cat 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        {filteredAndSortedRecipes.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-10">No coffees found.</div>
        )}

        {filteredAndSortedRecipes.map((coffee) => (
          <button
            key={coffee.id}
            onClick={() => onSelect(coffee)}
            className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
              selectedCoffee.id === coffee.id
                ? 'bg-amber-600 shadow-lg shadow-amber-900/20 text-white translate-x-1'
                : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-medium text-sm text-left">{coffee.name}</span>
              {selectedCategory === "All" && (
                 <span className="text-[9px] text-gray-500 uppercase">{coffee.category}</span>
              )}
            </div>
            <ChevronRight className={`w-3 h-3 transition-transform ${selectedCoffee.id === coffee.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
          </button>
        ))}
      </div>
      
      <div className="p-4 bg-[#1a1a1a] border-t border-white/5 text-center flex-none">
        <p className="text-[10px] text-gray-400 mb-1">Built with ❤️ by Rohan Mayekar</p>
        <a 
          href="https://www.linkedin.com/in/rohanmayekar/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] text-amber-500 hover:text-amber-400 font-medium block mb-2 transition-colors"
        >
          Connect on LinkedIn
        </a>
        <p className="text-[9px] text-gray-600">Powered by Gemini 2.5 Flash</p>
      </div>

      <style>{`
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

export default Sidebar;