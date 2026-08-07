import React, { useState } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import StorageGuidePage from './components/StorageGuidePage';
import CartModal from './components/CartModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

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
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'catalog' && (
          <Catalog
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'guide' && (
          <StorageGuidePage
            onGoToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <Footer onGoToGuide={() => setActiveTab('guide')} />
    </div>
  );
}
