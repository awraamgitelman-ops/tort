import React from 'react';
import { Search, ShoppingBag, Phone, Menu, Sparkles, ShieldCheck, Building2, Send } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenStorageGuide,
  searchQuery,
  setSearchQuery
}) {
  return (
    <header>
      {/* Top White Bar */}
      <div className="top-header">
        <div className="container top-header-content">
          {/* Logo Block */}
          <div className="logo-block" onClick={() => setActiveTab('catalog')}>
            <div className="logo-circle">ele</div>
            <div>
              <div className="logo-text-title">BELLA CRÈME</div>
              <div className="logo-text-subtitle">Вишуканий смак ручної роботи</div>
            </div>
          </div>

          {/* Search Box */}
          <div className="header-search">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Пошук десерта..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cart Widget */}
          <div className="cart-widget" onClick={onOpenCart}>
            <div style={{ position: 'relative' }}>
              <ShoppingBag size={20} style={{ color: 'var(--bg-navy)' }} />
            </div>
            <span className="cart-badge">{cartCount}</span>
            <span style={{ fontWeight: 700, fontSize: '14px' }}>{cartTotal.toLocaleString()} ₴</span>
          </div>
        </div>
      </div>

      {/* Main Navy Navigation Bar */}
      <nav className="main-nav">
        <div className="container nav-container">
          <div className="nav-menu">
            <button
              className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <Menu size={16} /> Каталог
            </button>

            <button
              className={`nav-item ${activeTab === 'builder' ? 'active' : ''}`}
              onClick={() => setActiveTab('builder')}
            >
              <Sparkles size={16} /> Замовити торт (3D)
            </button>

            <button
              className="nav-item"
              onClick={onOpenStorageGuide}
            >
              <ShieldCheck size={16} /> Правила зберігання
            </button>

            <button
              className={`nav-item ${activeTab === 'brand' ? 'active' : ''}`}
              onClick={() => setActiveTab('brand')}
            >
              <Building2 size={16} /> Dembrandt Studio
            </button>
          </div>

          <a
            href="https://t.me/BELLA_CREME_ua"
            target="_blank"
            rel="noreferrer"
            className="nav-phone"
          >
            <Send size={15} style={{ color: 'var(--accent-gold)' }} />
            <span>+38(096)162-95-92 / @BELLA_CREME_ua</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
