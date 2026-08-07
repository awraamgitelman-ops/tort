import React, { useState } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import StorageGuidePage from './components/StorageGuidePage';
import CartPage from './components/CartPage';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setActiveTab('cart');
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
        onOpenCart={() => setActiveTab('cart')}
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

        {activeTab === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onGoToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      <Footer onGoToGuide={() => setActiveTab('guide')} />
    </div>
  );
}
