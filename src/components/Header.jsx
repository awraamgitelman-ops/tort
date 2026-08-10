import React from 'react';
import { Search, ShoppingBag, Menu, ShieldCheck, Send, Sparkles } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  onOpenCart,
  onPerformSearch,
  searchQuery,
  setSearchQuery
}) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onPerformSearch(searchQuery.trim());
    }
  };

  return (
    <header>
      {/* Top White Bar */}
      <div className="top-header">
        <div className="container top-header-content">
          {/* Logo Block */}
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
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <Search className="search-icon" size={18} style={{ cursor: 'pointer' }} onClick={handleSearchSubmit} />
            <input
              type="text"
              className="search-input"
              placeholder="Пошук десертів та начинок..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length >= 2) {
                  onPerformSearch(e.target.value.trim());
                }
              }}
            />
          </form>

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
              className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
              onClick={() => setActiveTab('portfolio')}
            >
              Мої роботи
            </button>

            <button
              className={`nav-item ${activeTab === 'guide' ? 'active' : ''}`}
              onClick={() => setActiveTab('guide')}
            >
              Правила зберігання
            </button>
          </div>

          <a
            href="https://t.me/BELLA_CREME_ua"
            target="_blank"
            rel="noreferrer"
            className="nav-phone"
          >
            <Send size={15} style={{ color: 'var(--accent-gold)' }} />
            <span>+38(068)655-19-19 / @BELLA_CREME_ua</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
