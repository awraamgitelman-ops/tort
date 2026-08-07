import React from 'react';
import { Cake, Sparkles, Building2, ShoppingBag, ShieldCheck, Send } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, cartCount, onOpenCart, onOpenStorageGuide }) {
  return (
    <header className="glass-header">
      <div className="container header-content">
        <div className="logo-group" onClick={() => setActiveTab('catalog')}>
          <div className="logo-badge" style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #fbbf24 100%)' }}>
            🧁
          </div>
          <div>
            <span className="logo-title" style={{ fontSize: '24px', letterSpacing: '0.02em' }}>
              BELLA CRÈME
            </span>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '-4px' }}>
              Смачні десерти на замовлення
            </div>
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

          <button
            id="nav-guide-btn"
            className="nav-btn"
            onClick={onOpenStorageGuide}
            style={{ color: 'var(--accent-gold)' }}
          >
            <ShieldCheck size={16} />
            Правила зберігання
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://t.me/BELLA_CREME_ua"
            target="_blank"
            rel="noreferrer"
            className="nav-btn"
            style={{
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: 'var(--accent-cyan)',
              padding: '10px 16px',
              textDecoration: 'none'
            }}
          >
            <Send size={15} /> Direct / Telegram
          </a>

          <button id="header-cart-btn" className="cart-button" onClick={onOpenCart}>
            <ShoppingBag size={18} />
            <span>Кошик</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
