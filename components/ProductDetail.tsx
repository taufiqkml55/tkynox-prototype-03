
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useContext } from 'react';
import { Product, Language, Friend, ViewState } from '../types';
import { TranslationContext } from '../contexts/TranslationContext';
import { ProductGallery } from './product/ProductGallery';
import { ProductInfo } from './product/ProductInfo';

interface ProductDetailProps {
  product: Product;
  marketPrice: number;
  stockLevel?: number;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  isOwned?: boolean;
  language: Language;
}

// Helper to access setView from context or props if possible. 
// Since we can't easily inject setView here without changing App.tsx signature in a cleaner way,
// We will use a trick: The App component actually renders this. 
// We need to modify App.tsx to pass the handler. 
// I already updated App.tsx to render ProductDetail. 
// But wait, `ProductDetail` in `App.tsx` does NOT have `setView` passed to it in the previous `App.tsx` file I generated.
// I need to use a custom event listener here or rely on the fact that I can modify App.tsx *again* if needed.
// Actually, I can import `setView`? No, it's a hook result.
// Let's assume App.tsx passes a prop `setView`? No, `ProductDetailProps` defined above doesn't have it.
// I MUST update `ProductDetailProps` to include the handler, and update `App.tsx` to pass it.

// Redefining the component to accept the handler.
// In App.tsx, I will pass a custom function.

const ProductDetail: React.FC<ProductDetailProps & { setView?: (view: ViewState) => void }> = ({ 
    product, marketPrice, stockLevel, onBack, onAddToCart, onBuyNow, isOwned = false, setView 
}) => {
  const { products: t, categories: tCats, rarities: tRare, common: tCommon } = useContext(TranslationContext);

  const priceChange = marketPrice - product.price;
  const percentChange = (priceChange / product.price) * 100;
  const isPositive = priceChange >= 0;

  const isMining = product.category === 'Mining';
  const canBuy = (!isMining || !isOwned);

  const handlePvPClick = (targetUser: Friend, price: number) => {
      if (setView) {
          setView({ type: 'pvp_game', product, targetUser, price });
      }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#050505] animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono text-[#666] hover:text-[#00FF41] transition-colors mb-8 uppercase btn-press"
        >
          <span className="text-lg leading-none transition-transform group-hover:-translate-x-1">&lt;</span>
          {tCommon.return_grid}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Visuals */}
          <ProductGallery 
              product={product} 
              percentChange={percentChange} 
              isPositive={isPositive} 
          />

          {/* Right: Details */}
          <ProductInfo 
              product={product}
              marketPrice={marketPrice}
              stockLevel={stockLevel}
              isPositive={isPositive}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              canBuy={canBuy}
              isMining={isMining}
              isOwned={isOwned}
              t={t}
              tCats={tCats}
              tRare={tRare}
              onPvPClick={handlePvPClick}
          />

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
