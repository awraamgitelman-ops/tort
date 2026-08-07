import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'Усі десерти', count: 48 },
  { id: 'cakes', name: 'Авторські Торти', count: 12 },
  { id: 'cheesecake', name: 'Ванильні & Фруктові Чизкейки', count: 8 },
  { id: 'jars', name: 'Десерти в баночках', count: 7 },
  { id: 'exclusive', name: 'Вишукані Сладості', count: 13 },
  { id: 'sets', name: 'Солодкі сети', count: 6 },
  { id: 'cupcakes', name: 'Капкейки & Випічка', count: 9 },
  { id: 'bento', name: 'Бенто-торти', count: 4 }
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Ванильний чизкейк з малиновим кулі',
    category: 'cheesecake',
    weights: '1000 г, 1500 г, 2000 г, 2500 г',
    price: 700,
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    desc: 'Класичний оксамитовий чизкейк з подвійною ваніллю та свіжими ягодами.'
  },
  {
    id: 2,
    name: 'Горіховий торт "Естерхазі"',
    category: 'cakes',
    weights: '1000 г, 2000 г, 3000 г, 4000 г',
    price: 750,
    img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    desc: 'Мигдалево-горіхові коржі з ніжним заварним кремом та пеканом.'
  },
  {
    id: 3,
    name: 'Карамельний чизкейк із меренгою',
    category: 'cheesecake',
    weights: '1000 г, 1500 г, 2000 г, 2500 г',
    price: 720,
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    desc: 'Солона карамель, підпечена обпалена меренга та хрусткий бисквит.'
  },
  {
    id: 4,
    name: 'Лимонно-цитрусовий муссовий торт',
    category: 'cakes',
    weights: '1200 г, 1800 г, 2400 г',
    price: 680,
    img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    desc: 'Освіжаючий лимонний курду з легким вершковим мусом.'
  },
  {
    id: 5,
    name: 'Торт "Ягідний макарон & безе"',
    category: 'exclusive',
    weights: '1500 г, 2500 г, 3500 г',
    price: 890,
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    desc: 'Святковий торт з французькими макаронами та лохиною.'
  },
  {
    id: 6,
    name: 'Торт із золотими королівськими піками',
    category: 'cakes',
    weights: '1500 г, 2000 г, 3000 г',
    price: 950,
    img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    desc: 'Авторський дизайн із харчовим золотом 24K та шоколадними піками.'
  }
];

export default function Catalog({ onAddToCart, searchQuery }) {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Hero Mint Banner */}
      <section className="hero-banner">
        <div className="container hero-banner-content">
          <div>
            <h1 className="hero-banner-title">Авторські Торти</h1>
            <div className="hero-breadcrumb">Головна &gt; Авторські Торти</div>
          </div>
          <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" alt="BELLA CRÈME Tiramisu Jar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Main Two Column Page Content */}
      <div className="container page-layout">
        {/* Left Sidebar Categories */}
        <aside className="sidebar-box">
          <h3 className="sidebar-title">Категорія</h3>
          <div className="category-list">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className={`category-link ${selectedCat === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat.id)}
              >
                <span><ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {cat.name}</span>
                <span className="category-count">({cat.count})</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Product Grid */}
        <main>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-img-box">
                  <img src={product.img} alt={product.name} className="product-img" />
                </div>

                <div className="product-body">
                  <div style={{ marginBottom: '8px' }}>
                    <span className="weight-pill">{product.weights}</span>
                    <span className="product-price">{product.price} грн</span>
                  </div>

                  <h4 className="product-title">{product.name}</h4>

                  <button
                    className="select-btn"
                    onClick={() => onAddToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      weight: product.weights.split(',')[0]
                    })}
                  >
                    <span>ВИБРАТИ _ »</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
