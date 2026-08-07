import React, { useState } from 'react';
import { ShoppingBag, Star, Sparkles, Filter, Send, ShieldCheck } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Бенто-торт "Ніжне сонце"',
    category: 'bento',
    categoryName: 'Бенто-торти',
    price: 650,
    weight: '500 г',
    desc: 'Ніжний полуничний крем-чіз, ванільний бісквіт та авторський декор на замовлення.',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    badge: 'Хіт продажів'
  },
  {
    id: 2,
    name: 'Сет авторських Капкейків (6 шт.)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    price: 480,
    weight: '6 шт.',
    desc: 'Фісташкові та шоколадні капкейки з ніжними шапочками із крем-чізу.',
    img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    badge: 'Популярно'
  },
  {
    id: 3,
    name: 'Шоколадний "Трюфельний Оксамит"',
    category: 'cakes',
    categoryName: 'Авторські торти',
    price: 1200,
    weight: '1.5 кг',
    desc: 'Насичений бельгійський dark-шоколад, ганаш з вишневим конфеті.',
    img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    badge: 'Авторський рецепт'
  },
  {
    id: 4,
    name: 'Торт "Фісташка - Малина"',
    category: 'cakes',
    categoryName: 'Авторські торти',
    price: 1350,
    weight: '1.8 кг',
    desc: 'Повітряний мус на натуральній фісташковій пасті з малиновим кулі.',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    badge: 'Новинка'
  },
  {
    id: 5,
    name: 'Свадебный ярусный "Королівська лілія"',
    category: 'wedding',
    categoryName: 'Весільні',
    price: 3800,
    weight: '4.5 кг',
    desc: 'Шедевральний 3-ярусний торт із харчовим золотом та ніжним декором.',
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    badge: 'Преміум'
  },
  {
    id: 6,
    name: 'Набір французької випічки & Макарон',
    category: 'pastry',
    categoryName: 'Випічка',
    price: 520,
    weight: '12 шт.',
    desc: 'Свіжа французька випічка та ніжні мигдалеві макарони в асортименті.',
    img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    badge: 'Свіжа випічка'
  }
];

export default function Catalog({ onAddToCart, onGoToBuilder, onGoToBrand, onOpenStorageGuide }) {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <section className="container">
      {/* Hero Header */}
      <div className="hero-section">
        <div className="hero-pill">
          <Sparkles size={14} /> BELLA CRÈME • Смачні десерти на замовлення
        </div>
        <h1 className="hero-title">
          Солодкі Моменти <span className="hero-highlight">На Замовлення</span>
        </h1>
        <p className="hero-subtitle">
          🎂 Авторські торти та десерти • 🧁 Капкейки • 🥐 Випічка. Створюємо індивідуальні кондитерські вироби із найсвіжіших інгредієнтів.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onGoToBuilder}>
            <Sparkles size={18} /> 3D Конструктор Тортика
          </button>
          
          <button
            className="btn-primary" 
            style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', boxShadow: 'none' }}
            onClick={onOpenStorageGuide}
          >
            <ShieldCheck size={18} /> Правила зберігання
          </button>

          <a
            href="https://t.me/BELLA_CREME_ua"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.4)', color: 'var(--accent-cyan)', boxShadow: 'none', textDecoration: 'none' }}
          >
            <Send size={18} /> Замовлення в Telegram (@BELLA_CREME_ua)
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} style={{ color: 'var(--accent-rose)' }} />
          <span style={{ fontWeight: 600, fontSize: '15px' }}>Категорії:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'all', label: 'Усі десерти' },
            { id: 'bento', label: 'Бенто-торти' },
            { id: 'cakes', label: 'Авторські торти' },
            { id: 'cupcakes', label: 'Капкейки' },
            { id: 'wedding', label: 'Весільні' },
            { id: 'pastry', label: 'Випічка' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: filter === tab.id ? 'var(--accent-rose)' : 'var(--border-color)',
                background: filter === tab.id ? 'rgba(244, 63, 94, 0.15)' : 'var(--bg-surface)',
                color: filter === tab.id ? 'var(--accent-rose)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid-3">
        {filteredProducts.map(product => (
          <div key={product.id} className="cake-card">
            <div className="cake-img-wrapper">
              <img src={product.img} alt={product.name} className="cake-img" />
              <span className="badge-tag">{product.badge}</span>
            </div>
            
            <div className="cake-card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--accent-rose)', fontWeight: 600 }}>{product.categoryName}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--accent-gold)' }}>
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <h3 className="cake-card-title">{product.name}</h3>
              <p className="cake-card-desc">{product.desc}</p>
              
              <div style={{ fontSize: '13px', color: 'var(--text-subtle)', marginBottom: '16px' }}>
                Вага / Кількість: <strong style={{ color: 'var(--text-main)' }}>{product.weight}</strong>
              </div>

              <div className="cake-card-footer">
                <span className="price-tag">{product.price.toLocaleString()} ₴</span>
                <button
                  id={`add-to-cart-${product.id}`}
                  className="btn-primary"
                  style={{ padding: '10px 18px', fontSize: '13px' }}
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingBag size={15} /> Замовити
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
