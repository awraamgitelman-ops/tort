import React, { useState } from 'react';
import { ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import PortfolioCarousel from './PortfolioCarousel';
import ReviewsCarousel from './ReviewsCarousel';

const CATEGORIES = [
  { id: 'all', name: 'Увесь Прейскурант', count: 23 },
  { id: 'bento', name: 'Бенто-Торти та Сети', count: 5 },
  { id: 'big_cakes', name: 'Великі Торти (від 2 кг)', count: 1 },
  { id: 'cupcakes', name: 'Капкейки', count: 3 },
  { id: 'fillings', name: 'Опис Начинок та Розрізів', count: 12 }
];

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
    img: '/images/bento_custom_real.jpg',
    badge: 'Популярний подарунок',
    articleText: 'Милі міні-тортики у традиційній екологічній бенто-коробці. Ідеальне рішення для персонального привітання або затишного свята.',
    desc: 'У вартість входить: напис до 5 слів на білому фоні, святкова свічка, ложечка, листівка та святкове пакування. Додатково: довгий напис / кольоровий фон / мазки / золото (+50 грн); малюнок чи цукрова картинка (+100-250 грн).',
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
    img: '/images/bento_custom_real.jpg',
    badge: 'Оптимальний розмір',
    articleText: 'Збільшена версія класичного бенто-торта для невеликої компанії друзів. Вишуканий зовнішній вигляд та насичені вершкові начинки.',
    desc: 'У вартість входить: напис до 5 слів на білому фоні, свічка, ложка, листівка та святкове пакування. Додатково: довгий напис/колір (+50 грн), малюнки (+100-250 грн).',
    flavors: ['Ваніль-полуниця', 'Ваніль-персик', 'Манго-полуниця', 'Малина-карамель', 'Снікерс', 'Вишня-шоколад', 'Шоколад-банан', 'Червоний оксамит']
  },
  {
    id: 'bento-1500',
    name: 'Бенто-Торт Великий (1.5 кг)',
    category: 'bento',
    categoryName: 'Бенто-Торти',
    weights: '1.5 кг (на 6-8 осіб)',
    price: 1700,
    unit: 'грн',
    img: '/images/bento_custom_real.jpg',
    badge: 'Для компанії',
    articleText: 'Повноцінний авторський торт збільшеного розміру. Дозволяє реалізувати складний художній декор, малюнки та написи.',
    desc: 'У вартість входить: напис до 5 слів на білому фоні, свічка, ложка, листівка та святкове пакування.',
    flavors: ['Ваніль-полуниця', 'Ваніль-персик', 'Манго-полуниця', 'Малина-карамель', 'Снікерс', 'Вишня-шоколад', 'Шоколад-банан', 'Червоний оксамит']
  },
  {
    id: 'bento-set-small',
    name: 'Сет: Маленький Бенто (500г) + 5 Капкейків',
    category: 'bento',
    categoryName: 'Солодкі Сети',
    weights: 'Бенто 500г + 5 капкейків',
    price: 1500,
    unit: 'грн',
    img: '/images/bento_set_real_ukr.jpg',
    badge: 'Хіт Сет',
    articleText: 'Найпопулярніший святковий комплект! Поєднує свіжоспечений бенто-тортик (500г) для винуватця свята та 5 ніжних капкейків для гостей.',
    desc: 'Ідеальний вибір для фотосесій, днів народження та вітань.'
  },
  {
    id: 'bento-set-medium',
    name: 'Сет: Середній Бенто (1 кг) + 5 Капкейків',
    category: 'bento',
    categoryName: 'Солодкі Сети',
    weights: 'Бенто 1 кг + 5 капкейків',
    price: 1800,
    unit: 'грн',
    img: '/images/bento_set_real_ukr.jpg',
    badge: 'Великий Сет',
    articleText: 'Великий подарунковий сет! Повноцінний 1 кг бенто-торт та 5 капкейків з асорті начинками.',
    desc: 'У вартість входить: святкове пакування, напис до 5 слів, свічка, ложечка та фірмова листівка.'
  },

  /* CUPCAKES */
  {
    id: 'cupcakes-6',
    name: 'Авторські Капкейки (Сет 6 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    weights: '6 шт у коробці',
    price: 850,
    unit: 'грн',
    img: '/images/cupcakes_6_set.jpg',
    badge: '6 шт — 850 грн',
    articleText: 'Ніжні порційні десерти. Кекси: ванільні, шоколадні, цитрусові, кокосові, червоний оксамит. Начинки: ягідна (малина/полуниця/вишня), апельсин, карамель+арахіс, шоколад.',
    desc: 'У вартість входить: оформлення посипками/намистинками/субліматами, свічка, листівка, святкове пакування. Додатковий декор (ягоди, квіти, мастика, шоколадні фігурки) оплачується окремо.'
  },
  {
    id: 'cupcakes-9',
    name: 'Авторські Капкейки (Сет 9 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    weights: '9 шт у коробці',
    price: 1250,
    unit: 'грн',
    img: '/images/cupcakes_9_real.png',
    badge: '9 шт — 1250 грн',
    articleText: 'Середній набір асорті капкейків. Кекси: ванільні, шоколадні, цитрусові, кокосові, червоний оксамит. Начинки на вибір.',
    desc: 'У вартість входить: оформлення посипками, свічка, листівка, святкове пакування.'
  },
  {
    id: 'cupcakes-12',
    name: 'Авторські Капкейки (Сет 12 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    weights: '12 шт у коробці',
    price: 1700,
    unit: 'грн',
    img: '/images/cupcakes_12_real_oreo.png',
    badge: '12 шт — 1700 грн',
    articleText: 'Великий асорті-набір капкейків для кенді-бару або свята. Багатий вибір бісквітів та соковитих начинок.',
    desc: 'У вартість входить: оформлення намистинками/субліматами, свічка, листівка, святкове пакування.'
  },

  /* BIG CAKES */
  {
    id: 'big-cake-custom',
    name: 'Великі Авторські Торти на замовлення (від 2-х кг)',
    category: 'big_cakes',
    categoryName: 'Авторські Торти',
    weights: 'від 2 кг (розрахунок 150-200г / людина)',
    price: 1100,
    unit: 'грн / кг',
    img: '/images/big_cake_real_angel.png',
    badge: '1100 грн / кг',
    articleText: 'Головна окраса будь-якого урочистого заходу — весілля, ювілею чи корпоративу. Створюємо ярусні та класичні торти з урахуванням усіх ваших побажань. Покриття: ніжний крем-сир на маслі або ганаш.',
    desc: 'Умови: відхилення ваги +-200г (для ярусних +-500г). Декор оплачується окремо. У ярусних тортах (від 4-х кг) додатково оплачується опорна конструкція (250-450 грн).',
    flavors: [
      'Ваніль-полуниця', 'Ваніль-персик', 'Манго-полуниця', 'Малина-карамель',
      'Манго-маракуйя', 'Червоний оксамит', 'Снікерс', 'Вишня-шоколад',
      'Шоколад-банан', 'Чорниця-шоколад', 'Маково-ягідний', 'Фісташка-малина'
    ]
  },

  /* ALL 12 FILLINGS FROM IMAGES */
  {
    id: 'filling-blueberry',
    name: 'Начинка: Чорничний',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Ванільний / шоколадний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_blueberry_hd.jpg',
    badge: 'Ягідний мус',
    articleText: 'Ніжний бісквіт з подвійним чорничним прошарком: соковите чорничне конфи та вишуканий чорничний мус під кремом-сиром на вершках.',
    ingredients: ['Ванільний/шоколадний бісквіт', 'Молочне просочення', 'Чорничне конфи', 'Чорничний мус', 'Крем сир на вершках']
  },
  {
    id: 'filling-red-velvet',
    name: 'Начинка: Червоний Оксамит',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Ванільний червоний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_redvelvet_hd.jpg',
    badge: 'Святкова класика',
    articleText: 'Яскравий ванільний червоний бісквіт з малиновим просоченням, ягідним малиновим кремом на білому шоколаді та крем-сиром.',
    ingredients: ['Ванільний червоний бісквіт', 'Малинове просочення', 'Малиновий крем на вершках і білому шоколаді', 'Крем сир на вершках']
  },
  {
    id: 'filling-pistachio-raspberry',
    name: 'Начинка: Фісташка - Малина',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Фісташковий бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_pistachio_hd.jpg',
    badge: 'Преміум смак',
    articleText: 'Натуральний фісташковий бісквіт з молочним просоченням, подвійним малиновим шаром (конфи + мус) та крем-сиром на вершках.',
    ingredients: ['Фісташковий бісквіт', 'Молочне просочення', 'Малинове конфи', 'Малиновий мус', 'Крем сир на вершках']
  },
  {
    id: 'filling-mango-strawberry',
    name: 'Начинка: Манго - Полуниця',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_mangostrawberry_real.png',
    badge: 'Соковитий дует',
    articleText: 'Повітряний ванільний бісквіт з молочним просоченням, насиченим полуничним желе та ніжним манговим кремом.',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Полуничне желе', 'Манговий крем', 'Крем сир на вершках']
  },
  {
    id: 'filling-cherry-chocolate',
    name: 'Начинка: Вишня - Шоколад',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Шоколадний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_cherrychoco_real.png',
    badge: 'Шоколадний шик',
    articleText: 'Насичений шоколадний бісквіт з молочним просоченням, вишневим конфи, ганашем на темному бельгійському шоколаді та крем-сиром.',
    ingredients: ['Шоколадний бісквіт', 'Молочне просочення', 'Вишневе конфи', 'Ганаш на темному шоколаді', 'Крем сир на вершках']
  },
  {
    id: 'filling-raspberry-caramel',
    name: 'Начинка: Малина - Карамель',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_raspberrycaramel_real.png',
    badge: 'Хрусткий кріспі',
    articleText: 'Ванільний бісквіт з малиновим конфи, домашньою солоною карамеллю з хрусткими кульками кріспі та вершковим кремом.',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Малинове конфи', 'Солона карамель з кульками кріспі', 'Крем сир на вершках']
  },
  {
    id: 'filling-chocolate-banana',
    name: 'Начинка: Шоколад - Банан',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Шоколадний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_chocobanana_real.png',
    badge: 'Карамельний банан',
    articleText: 'Шоколадний бісквіт з ароматними шматочками банана в карамелі, ганашем на молочному шоколаді з кульками кріспі та крем-сиром.',
    ingredients: ['Шоколадний бісквіт', 'Молочне просочення', 'Банан в карамелі', 'Ганаш на молочному шоколаді з кульками кріспі', 'Крем сир на вершках']
  },
  {
    id: 'filling-mango-passion',
    name: 'Начинка: Манго - Маракуйя',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_mangopassion_real.jpg',
    badge: 'Тропічний мус',
    articleText: 'Багатий тропічний букет: ганаш манго-маракуйя, соковите желе манго-маракуйя та легкий мус манго-маракуйя на ванільному бісквіті.',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Ганаш манго-маракуйя', 'Желе манго-маракуйя', 'Мус манго-маракуйя', 'Крем сир на вершках']
  },
  {
    id: 'filling-poppy-berry',
    name: 'Начинка: Маково - Ягідний',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Маковий бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_poppyberry_real.jpg',
    badge: 'Хрустке безе',
    articleText: 'Пишний маковий бісквіт з освіжаючим лимонним просоченням, яскравим ягідним конфи та хрустким прошарком безе.',
    ingredients: ['Маковий бісквіт', 'Лимонне просочення', 'Ягідне конфи', 'Хрусткий шар безе', 'Крем сир на вершках']
  },
  {
    id: 'filling-vanilla-strawberry',
    name: 'Начинка: Ваніль - Полуниця',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_vanillastrawberry_real.jpg',
    badge: 'Класика',
    articleText: 'Легкий та ніжний смак. Поєднання ароматної ванілі з натуральним полуничним конфи та крем-сиром на вершках.',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Полуничне конфи', 'Крем сир на вершках']
  },
  {
    id: 'filling-snikers',
    name: 'Начинка: Снікерс',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Шоколадний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_snikers_hd.jpg',
    badge: 'Бестселер',
    articleText: 'Насичений шоколадний бісквіт, молочне просочення, домашня солона карамель з обсмаженим арахісом, ганаш на молочному шоколаді та крем-сир.',
    ingredients: ['Шоколадний бісквіт', 'Молочне просочення', 'Солона карамель з арахісом', 'Ганаш на молочному шоколаді', 'Крем сир на вершках']
  },
  {
    id: 'filling-vanilla-peach',
    name: 'Начинка: Ваніль - Персик',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: '/images/filling_vanillapeach_real.jpg',
    badge: 'Ніжний смак',
    articleText: 'Соковиті шматочки персикового конфи у прошарках із повітряного крем-сиру та пухкого ванільного бісквіту.',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Персикове конфи', 'Крем сир на вершках']
  }
];

export default function Catalog({ onAddToCart, onGoToPortfolio, selectedCategory }) {
  const [selectedCat, setSelectedCat] = useState(selectedCategory || 'all');

  React.useEffect(() => {
    if (selectedCategory) {
      setSelectedCat(selectedCategory);
    }
  }, [selectedCategory]);

  const filteredProducts = selectedCat === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(p => p.category === selectedCat);

  return (
    <div>
      {/* Hero Mint Banner */}
      <section className="hero-banner">
        <div className="container hero-banner-content">
          <div>
            <h1 className="hero-banner-title">Авторські Торти & Каталог</h1>
            <div className="hero-breadcrumb">Головна &gt; Прейскурант та опис десертів BELLA CRÈME</div>
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
          <h3 className="sidebar-title">Розділи Меню</h3>
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

        {/* Right Content Column */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Reviews Carousel */}
          <ReviewsCarousel />

          {/* Interactive Carousel of Recent Works */}
          <PortfolioCarousel onGoToPortfolio={onGoToPortfolio} />

          {filteredProducts.map(product => (
            <article
              key={product.id}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: 0,
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {/* Article Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-gold)' }}>
                    {product.categoryName}
                  </span>
                  <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '22px', color: 'var(--bg-navy)', fontWeight: 700, marginTop: '4px' }}>
                    {product.name}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    {product.price} {product.unit || 'грн'}
                  </div>
                  <span className="weight-pill" style={{ margin: 0, borderRadius: 0 }}>{product.weights}</span>
                </div>
              </div>

              {/* Article Main Body */}
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px' }}>
                <div style={{ borderRadius: 0, overflow: 'hidden', height: '170px', position: 'relative' }}>
                  <img
                    src={product.img}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/cake_filling.jpg';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }}
                  />
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(11,23,42,0.85)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: 0 }}>
                    {product.badge}
                  </span>
                </div>

                <div>
                  <p style={{ fontFamily: "'Georgia', serif", fontSize: '14.5px', color: '#334155', lineHeight: 1.6, marginBottom: '12px' }}>
                    {product.articleText || product.desc}
                  </p>
                  
                  {product.desc && product.articleText && (
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '12px' }}>
                      {product.desc}
                    </p>
                  )}

                  {/* Flavors list tags */}
                  {product.flavors && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '6px' }}>Доступні смаки:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {product.flavors.map((flv, idx) => (
                          <span key={idx} style={{ fontSize: '11px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: 0, color: '#475569' }}>
                            {flv}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ingredients list if available */}
                  {product.ingredients && (
                    <div style={{ marginTop: '8px', background: '#fdfbf7', padding: '10px 14px', borderRadius: 0, border: '1px dashed #d4af37' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#8b6b1b', marginBottom: '4px' }}>Склад шарів та інгредієнти:</div>
                      <div style={{ fontSize: '12px', color: '#475569', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {product.ingredients.map((ing, idx) => (
                          <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={12} style={{ color: '#c59b27' }} /> {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Article Footer Action Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderTop: '1px dashed #f1f5f9', paddingTop: '14px', marginTop: '4px' }}>
                <button
                  className="btn-primary"
                  onClick={() => onAddToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    weight: product.weights
                  })}
                  style={{ padding: '10px 24px', fontSize: '13.5px', borderRadius: 0 }}
                >
                  <span>Додати в кошик та Замовити &raquo;</span>
                </button>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
