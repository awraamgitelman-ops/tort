import React from 'react';
import { Search, ShoppingBag, Menu, ShieldCheck, Send } from 'lucide-react';

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
          {/* Logo Block with Official Uploaded Emblem */}
          <div className="logo-block" onClick={() => setActiveTab('catalog')}>
            <img
              src="/logo.png"
              alt="BELLA CRÈME Logo"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-gold)',
                boxShadow: '0 4px 12px rgba(197, 155, 39, 0.3)'
              }}
            />
            <div>
              <div className="logo-text-title">BELLA CRÈME</div>
              <div className="logo-text-subtitle">Торти • Кондитерські вироби власного виробництва</div>
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
              className="nav-item"
              onClick={onOpenStorageGuide}
            >
              <ShieldCheck size={16} /> Правила зберігання
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
