import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Check, Sparkles, Star } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'Увесь Прейскурант', count: 18 },
  { id: 'bento', name: 'Бенто-Торти', count: 5 },
  { id: 'big_cakes', name: 'Великі Торти (від 2 кг)', count: 6 },
  { id: 'cupcakes', name: 'Капкейки', count: 3 },
  { id: 'fillings', name: 'Опис Начинок та Розрізів', count: 6 }
];

// Exact products and price lists extracted from official menu images
const MENU_ITEMS = [
  /* BENTO CAKES */
  {
    id: 'bento-500',
    name: 'Бенто-Торт Маленький (500 г)',
    category: 'bento',
    categoryName: 'Бенто-Торти',
    weights: '500 г (на 1-2 особи)',
    price: 800,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    badge: 'Популярний подарунок',
    desc: 'У вартість входить: напис до 5 слів на білому фоні, свічка, ложка, листівка та святкове пакування.',
    flavors: ['Ваніль-полуниця', 'Ваніль-персик', 'Манго-полуниця', 'Малина-карамель', 'Снікерс', 'Вишня-шоколад', 'Шоколад-банан', 'Червоний оксамит']
  },
  {
    id: 'bento-1000',
    name: 'Бенто-Торт Середній (1 кг)',
    category: 'bento',
    categoryName: 'Бенто-Торти',
    weights: '1 кг (на 4-5 осіб)',
    price: 1100,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    badge: 'Оптимальний розмір',
    desc: 'У вартість входить: напис до 5 слів на білому фоні, свічка, ложка, листівка та святкове пакування.',
    flavors: ['Ваніль-полуниця', 'Снікерс', 'Малина-карамель', 'Червоний оксамит', 'Вишня-шоколад']
  },
  {
    id: 'bento-1500',
    name: 'Бенто-Торт Великий (1.5 кг)',
    category: 'bento',
    categoryName: 'Бенто-Торти',
    weights: '1.5 кг (на 6-8 осіб)',
    price: 1700,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    badge: 'Для компанії',
    desc: 'У вартість входить: напис до 5 слів на білому фоні, свічка, ложка, листівка та святкове пакування.',
    flavors: ['Манго-полуниця', 'Фісташка-малина', 'Вишня-шоколад', 'Шоколад-банан']
  },
  {
    id: 'bento-set-small',
    name: 'Сет: Маленький Бенто + 5 Капкейків',
    category: 'bento',
    categoryName: 'Солодкі Сети',
    weights: 'Бенто 500г + 5 капкейків',
    price: 1500,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    badge: 'Хіт Сет',
    desc: 'Ідеальний святковий набір для подарунка. Включає тортик і 5 ніжних капкейків з декор-оформленням.'
  },
  {
    id: 'bento-set-medium',
    name: 'Сет: Середній Бенто + 5 Капкейків',
    category: 'bento',
    categoryName: 'Солодкі Сети',
    weights: 'Бенто 1кг + 5 капкейків',
    price: 1800,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    badge: 'Максі Сет',
    desc: 'Повноцінний солодкий стіл для свята.'
  },

  /* CUPCAKES */
  {
    id: 'cupcakes-6',
    name: 'Набір Капкейків (6 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    weights: '6 шт',
    price: 850,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    badge: 'Капкейки',
    desc: 'Кекси: ванільні, шоколадні, цитрусові, кокосові, червоний оксамит. Начинка: ягідна, апельсин, карамель+арахіс, шоколад.'
  },
  {
    id: 'cupcakes-9',
    name: 'Набір Капкейків (9 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    weights: '9 шт',
    price: 1250,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    badge: 'Капкейки',
    desc: 'У вартість входить: оформлення посипками/намистинками/субліматами, свічка, листівка, святкове пакування.'
  },
  {
    id: 'cupcakes-12',
    name: 'Набір Капкейків (12 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    weights: '12 шт',
    price: 1700,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    badge: 'Велика коробка',
    desc: 'Свіжа випічка з крем-чизом та авторською начинкою на вибір.'
  },

  /* BIG CAKES */
  {
    id: 'big-cake-custom',
    name: 'Великий Авторський Торт (від 2-х кг)',
    category: 'big_cakes',
    categoryName: 'Авторські Торти',
    weights: 'від 2 кг (розрахунок 150-200г / людина)',
    price: 1100,
    unit: 'грн / кг',
    img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    badge: '1100 грн / кг',
    desc: 'Покриття на вибір: крем-сир на маслі або ганаш. Можливі будь-які авторські начинки з нашого каталогу.',
    flavors: [
      'Ваніль-полуниця', 'Ваніль-персик', 'Манго-полуниця', 'Малина-карамель',
      'Манго-маракуйя', 'Червоний оксамит', 'Снікерс', 'Вишня-шоколад',
      'Шоколад-банан', 'Чорниця-шоколад', 'Маково-ягідний', 'Фісташка-малина'
    ]
  },

  /* FLAVORS & CUT DETAILS */
  {
    id: 'filling-vanilla-strawberry',
    name: 'Начинка: Ваніль - Полуниця',
    category: 'fillings',
    categoryName: 'Склад Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    badge: 'Класика',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Полуничне конфи', 'Крем сир на вершках']
  },
  {
    id: 'filling-snikers',
    name: 'Начинка: Снікерс',
    category: 'fillings',
    categoryName: 'Склад Начинок',
    weights: 'Шоколадний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    badge: 'Бестселер',
    ingredients: ['Шоколадний бісквіт', 'Молочне просочення', 'Солона карамель з арахісом', 'Ганаш на молочному шоколаді', 'Крем сир на вершках']
  },
  {
    id: 'filling-vanilla-peach',
    name: 'Начинка: Ваніль - Персик',
    category: 'fillings',
    categoryName: 'Склад Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    badge: 'Ніжний смак',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Персикове конфи', 'Крем сир на вершках']
  },
  {
    id: 'filling-mango-strawberry',
    name: 'Начинка: Манго - Полуниця',
    category: 'fillings',
    categoryName: 'Склад Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    badge: 'Тропік',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Полуничне желе', 'Манговий крем', 'Крем сир на вершках']
  },
  {
    id: 'filling-cherry-chocolate',
    name: 'Начинка: Вишня - Шоколад',
    category: 'fillings',
    categoryName: 'Склад Начинок',
    weights: 'Шоколадний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    badge: 'Шоколадний шик',
    ingredients: ['Шоколадний бісквіт', 'Молочне просочення', 'Вишневе конфи', 'Ганаш на темному шоколаді', 'Крем сир на вершках']
  },
  {
    id: 'filling-raspberry-caramel',
    name: 'Начинка: Малина - Карамель',
    category: 'fillings',
    categoryName: 'Склад Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    badge: 'Ягідний мікс',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Малинове конфи', 'Солона карамель з кульками кріспі', 'Крем сир на вершках']
  }
];

export default function Catalog({ onAddToCart, searchQuery }) {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredProducts = MENU_ITEMS.filter(p => {
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
            <h1 className="hero-banner-title">Офіційний Прейскурант & Начинки</h1>
            <div className="hero-breadcrumb">Головна &gt; Авторські Торти & Прейскурант BELLA CRÈME</div>
          </div>
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
            <img src="/logo.png" alt="BELLA CRÈME Emblem" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Main Two Column Page Content */}
      <div className="container page-layout">
        {/* Left Sidebar Categories */}
        <aside className="sidebar-box">
          <h3 className="sidebar-title">Прейскурант</h3>
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

          {/* Quick Info Box */}
          <div style={{ marginTop: '24px', padding: '16px', background: '#fdf8f6', borderRadius: 'var(--radius-sm)', border: '1px solid #fce7f3' }}>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '6px' }}>💡 Інформація до замовлення:</h5>
            <ul style={{ fontSize: '11.5px', color: 'var(--text-muted)', listStyle: 'disc', paddingLeft: '16px', lineHeight: 1.5 }}>
              <li>Розрахунок великих тортів: 150-200г на людину.</li>
              <li>Бенто містить свічку, ложку, напис до 5 слів.</li>
              <li>Додатковий декор оплачується окремо.</li>
            </ul>
          </div>
        </aside>

        {/* Right Product Grid */}
        <main>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-img-box">
                  <img src={product.img} alt={product.name} className="product-img" />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(11, 23, 42, 0.85)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {product.badge}
                  </span>
                </div>

                <div className="product-body">
                  <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="weight-pill">{product.weights}</span>
                    <span className="product-price">{product.price} {product.unit || 'грн'}</span>
                  </div>

                  <h4 className="product-title">{product.name}</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
                    {product.desc}
                  </p>

                  {/* Flavors list tags if available */}
                  {product.flavors && (
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '4px' }}>Смаки на вибір:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {product.flavors.slice(0, 5).map((flv, idx) => (
                          <span key={idx} style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-dark)' }}>
                            {flv}
                          </span>
                        ))}
                        {product.flavors.length > 5 && (
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+{product.flavors.length - 5} ще</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Ingredients list if available */}
                  {product.ingredients && (
                    <div style={{ marginBottom: '14px', background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '4px' }}>Склад шарів:</div>
                      <ul style={{ fontSize: '11px', color: 'var(--text-muted)', paddingLeft: '14px', margin: 0 }}>
                        {product.ingredients.map((ing, idx) => (
                          <li key={idx}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    className="select-btn"
                    onClick={() => onAddToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      weight: product.weights
                    })}
                  >
                    <span>ЗАМОВИТИ _ »</span>
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
