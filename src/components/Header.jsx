import React, { useState } from 'react';
import {
  Search, ShoppingBag, Menu, X, Phone, Send,
  Cake, Image as ImageIcon, BookOpen, Truck, FileText
} from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onPerformSearch(searchQuery.trim());
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={{ position: 'relative', zIndex: 100 }}>
      {/* Top White Bar */}
      <div className="top-header">
        <div className="container top-header-content">
          {/* Left: Mobile Menu Toggle Button & Logo Block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Hamburger Button on Mobile (Top Left) */}
            <button
              type="button"
              className="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="Відкрити меню"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo Block */}
            <div className="logo-block" onClick={() => handleNavClick('catalog')}>
              <img
                src="/logo.png"
                alt="BELLA CRÈME Logo"
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: '0 4px 12px rgba(197, 155, 39, 0.3)',
                  flexShrink: 0
                }}
              />
              <div className="logo-text-wrapper">
                <div className="logo-text-title">BELLA CRÈME</div>
                <div className="logo-text-subtitle">Торти • Кондитерські вироби</div>
              </div>
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

      {/* Main Navy Navigation Bar (Desktop) */}
      <nav className="main-nav desktop-nav">
        <div className="container nav-container">
          <div className="nav-menu">
            <button
              className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => handleNavClick('catalog')}
            >
              <Cake size={16} /> Каталог
            </button>

            <button
              className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
              onClick={() => handleNavClick('portfolio')}
            >
              <ImageIcon size={16} /> Наші роботи
            </button>

            <button
              className={`nav-item ${activeTab === 'guide' ? 'active' : ''}`}
              onClick={() => handleNavClick('guide')}
            >
              <BookOpen size={16} /> Правила зберігання
            </button>

            <button
              className={`nav-item ${activeTab === 'delivery' ? 'active' : ''}`}
              onClick={() => handleNavClick('delivery')}
            >
              <Truck size={16} /> Доставка
            </button>

            <button
              className={`nav-item ${activeTab === 'telegram' ? 'active' : ''}`}
              onClick={() => handleNavClick('telegram')}
            >
              <Send size={16} /> Замовлення в Telegram
            </button>
          </div>

          <a
            href="tel:+380686551919"
            className="nav-phone"
          >
            <Phone size={15} style={{ color: 'var(--accent-gold)' }} />
            <span>+38(068)655-19-19</span>
          </a>
        </div>
      </nav>

      {/* Mobile Slide-Down Accordion Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-menu">
          <div className="mobile-drawer-inner">
            <div className="mobile-drawer-section-title">Розділи сайту</div>
            <div className="mobile-drawer-links">
              <button
                className={`mobile-drawer-item ${activeTab === 'catalog' ? 'active' : ''}`}
                onClick={() => handleNavClick('catalog')}
              >
                <Cake size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Каталог десертів та начинок</span>
              </button>

              <button
                className={`mobile-drawer-item ${activeTab === 'portfolio' ? 'active' : ''}`}
                onClick={() => handleNavClick('portfolio')}
              >
                <ImageIcon size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Наші роботи</span>
              </button>

              <button
                className={`mobile-drawer-item ${activeTab === 'guide' ? 'active' : ''}`}
                onClick={() => handleNavClick('guide')}
              >
                <BookOpen size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Правила зберігання тортика</span>
              </button>

              <button
                className={`mobile-drawer-item ${activeTab === 'delivery' ? 'active' : ''}`}
                onClick={() => handleNavClick('delivery')}
              >
                <Truck size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Доставка та умови</span>
              </button>

              <button
                className={`mobile-drawer-item ${activeTab === 'telegram' ? 'active' : ''}`}
                onClick={() => handleNavClick('telegram')}
              >
                <Send size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Замовлення в Telegram</span>
              </button>

              <button
                className={`mobile-drawer-item ${activeTab === 'agreement' ? 'active' : ''}`}
                onClick={() => handleNavClick('agreement')}
              >
                <FileText size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Публічна оферта та угода</span>
              </button>
            </div>

            <div className="mobile-drawer-contacts">
              <div className="mobile-drawer-section-title">Прямий зв'язок</div>
              <a href="tel:+380686551919" className="mobile-contact-row">
                <Phone size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>+38(068)655-19-19</span>
              </a>
              <a
                href="https://t.me/BELLA_CREME_Manager"
                target="_blank"
                rel="noreferrer"
                className="mobile-contact-row"
              >
                <Send size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>Telegram: @BELLA_CREME_Manager</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
