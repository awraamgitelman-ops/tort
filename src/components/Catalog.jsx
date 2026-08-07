import React, { useState } from 'react';
import { ShoppingBag, Star, Sparkles, Filter } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Бенто-торт "Нежный Мусс"',
    category: 'bento',
    categoryName: 'Бенто',
    price: 1990,
    weight: '500 г',
    desc: 'Мини-торт на 1-2 персоны с клубничным конфетти и ванильным бисквитом.',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    badge: 'Хит продаж'
  },
  {
    id: 2,
    name: 'Свадебный Ярусный "Королевский бархат"',
    category: 'wedding',
    categoryName: 'Свадебные',
    price: 14500,
    weight: '4.5 кг',
    desc: 'Трёхъярусное шедевральное исполнение с пищевым золотом и живыми орхидеями.',
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    badge: 'Премиум'
  },
  {
    id: 3,
    name: 'Шоколадный "Трюфельный Нуар"',
    category: 'chocolate',
    categoryName: 'Шоколадные',
    price: 3490,
    weight: '1.2 кг',
    desc: 'Насыщенный бельгийский dark-шоколад, ганаш с вишней и ромом.',
    img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    badge: 'Авторский рецепт'
  },
  {
    id: 4,
    name: 'Фисташково-малиновый фреш',
    category: 'mousse',
    categoryName: 'Муссовые',
    price: 3890,
    weight: '1.5 кг',
    desc: 'Воздушный мусс на фисташковой пасте с прослойкой свежесваренного малинового кули.',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    badge: 'Новинка'
  },
  {
    id: 5,
    name: 'Фисташка с золотой поталью',
    category: 'exclusive',
    categoryName: 'Эксклюзив',
    price: 4900,
    weight: '1.8 кг',
    desc: 'Премиальный бисквит с хрустящим пралине и карамелизированным пеканом.',
    img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    badge: 'Шедевр'
  },
  {
    id: 6,
    name: 'Набор брендированных Макарон',
    category: 'corporate',
    categoryName: 'Корпоративные',
    price: 2800,
    weight: '12 шт.',
    desc: 'Набор французских пирожных макарон с логотипом компании.',
    img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    badge: 'Для бизнеса'
  }
];

export default function Catalog({ onAddToCart, onGoToBuilder, onGoToBrand }) {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <section className="container">
      {/* Hero Header */}
      <div className="hero-section">
        <div className="hero-pill">
          <Sparkles size={14} /> Кондитерское Ателье Tortiks
        </div>
        <h1 className="hero-title">
          Искусство Создавать <span className="hero-highlight">Сладкие Моменты</span>
        </h1>
        <p className="hero-subtitle">
          Заказывайте уникальные авторские торты, собственный 3D десерт или создайте брендированные сладости в палитре вашей компании через наш ИИ-модуль.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={onGoToBuilder}>
            <Sparkles size={18} /> Открыть 3D Конструктор
          </button>
          <button 
            className="btn-primary" 
            style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', boxShadow: 'none' }}
            onClick={onGoToBrand}
          >
            Брендинг через Dembrandt
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} style={{ color: 'var(--accent-rose)' }} />
          <span style={{ fontWeight: 600, fontSize: '15px' }}>Категории:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'all', label: 'Все торты' },
            { id: 'bento', label: 'Бенто' },
            { id: 'wedding', label: 'Свадебные' },
            { id: 'chocolate', label: 'Шоколадные' },
            { id: 'mousse', label: 'Муссовые' },
            { id: 'corporate', label: 'Корпоративные' }
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
                Вес: <strong style={{ color: 'var(--text-main)' }}>{product.weight}</strong>
              </div>

              <div className="cake-card-footer">
                <span className="price-tag">{product.price.toLocaleString()} ₽</span>
                <button
                  id={`add-to-cart-${product.id}`}
                  className="btn-primary"
                  style={{ padding: '10px 18px', fontSize: '13px' }}
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingBag size={15} /> Заказать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
