
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo, useContext } from 'react';
import { Product, Language } from '../types';
import { ProductCard } from './ProductCard';
import { TranslationContext } from '../contexts/TranslationContext';
import { audioSystem } from '../services/audioSystem';
import { GridControls } from './grid/GridControls';
import { GridPagination } from './grid/GridPagination';

const ITEMS_PER_PAGE = 14;

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  marketPrices: Record<string, number>;
  stockLevels?: Record<string, number>;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  language: Language;
  // Navigation state managed by parent
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
    products, onProductClick, marketPrices, stockLevels = {}, onAddToCart, onBuyNow, language,
    activeCategory, onCategoryChange, searchQuery, onSearchChange, currentPage, onPageChange
}) => {
  
  const { products: t, categories: tCats } = useContext(TranslationContext);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by Category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery, products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
      const start = currentPage * ITEMS_PER_PAGE;
      return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage: number) => {
      if (newPage >= 0 && newPage < totalPages) {
          onPageChange(newPage);
          audioSystem.playClick();
          
          // Force scroll to top of grid with manual offset calculation for reliability on mobile
          setTimeout(() => {
              const gridElement = document.getElementById('product-grid-top');
              if (gridElement) {
                  const headerOffset = 120; // Account for fixed navbar + small buffer
                  const elementPosition = gridElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;
                  
                  window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                  });
              }
          }, 10);
      }
  };

  return (
    <section id="services" className="pt-8 pb-16 md:pt-16 md:pb-32 px-6 md:px-12 bg-[#0A0A0A] border-t border-[#1A1A1A]">
      <div className="max-w-[1800px] mx-auto">
        
        <GridControls 
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            t={t}
            tCats={tCats}
        />

        {/* Grid */}
        <div id="product-grid-top" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 min-h-[400px]">
          {paginatedProducts.length > 0 ? (
              paginatedProducts.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    marketPrice={marketPrices[product.id] || product.price}
                    stockLevel={stockLevels[product.id]}
                    onClick={onProductClick} 
                    onAddToCart={onAddToCart}
                    onBuyNow={onBuyNow}
                    language={language}
                />
              ))
          ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-[#666] font-mono border border-[#333] border-dashed bg-[#0D0D0D]">
                  <span className="text-[#00FF41] text-2xl mb-4" aria-hidden="true">!</span>
                  <p className="uppercase tracking-widest">{t.no_results} "{searchQuery}"</p>
                  <button onClick={() => onSearchChange('')} className="mt-6 text-xs underline hover:text-white">{t.reset}</button>
              </div>
          )}
        </div>

        <GridPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default ProductGrid;
