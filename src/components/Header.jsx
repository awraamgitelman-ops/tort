import React from 'react';
import { Cake, Sparkles, Building2, ShoppingBag } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, cartCount, onOpenCart }) {
  return (
    <header className="glass-header">
      <div className="container header-content">
        <div className="logo-group" onClick={() => setActiveTab('catalog')}>
          <div className="logo-badge">🍰</div>
          <div>
            <span className="logo-title">Tortiks</span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            id="nav-catalog-btn"
            className={`nav-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <Cake size={16} />
            Каталог
          </button>

          <button
            id="nav-builder-btn"
            className={`nav-btn ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            <Sparkles size={16} />
            3D Конструктор
          </button>

          <button
            id="nav-brand-btn"
            className={`nav-btn ${activeTab === 'brand' ? 'active' : ''}`}
            onClick={() => setActiveTab('brand')}
          >
            <Building2 size={16} />
            Dembrandt Studio
          </button>
        </nav>

        <button id="header-cart-btn" className="cart-button" onClick={onOpenCart}>
          <ShoppingBag size={18} />
          <span>Корзина</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
