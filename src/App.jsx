import React, { useState } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import CakeCustomizer from './components/CakeCustomizer';
import BrandCakeStudio from './components/BrandCakeStudio';
import CartModal from './components/CartModal';
import StorageGuideModal from './components/StorageGuideModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Бенто-торт "Ніжне сонце"',
      price: 650,
      weight: '500 г'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStorageGuideOpen, setIsStorageGuideOpen] = useState(false);

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStorageGuide={() => setIsStorageGuideOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'catalog' && (
          <Catalog
            onAddToCart={handleAddToCart}
            onGoToBuilder={() => setActiveTab('builder')}
            onGoToBrand={() => setActiveTab('brand')}
            onOpenStorageGuide={() => setIsStorageGuideOpen(true)}
          />
        )}

        {activeTab === 'builder' && (
          <CakeCustomizer onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'brand' && (
          <BrandCakeStudio onAddToCart={handleAddToCart} />
        )}
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <StorageGuideModal
        isOpen={isStorageGuideOpen}
        onClose={() => setIsStorageGuideOpen(false)}
      />

      <Footer onOpenStorageGuide={() => setIsStorageGuideOpen(true)} />
    </div>
  );
}
