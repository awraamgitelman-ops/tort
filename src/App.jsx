import React, { useState } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import StorageGuidePage from './components/StorageGuidePage';
import CartPage from './components/CartPage';
import SearchResultsPage from './components/SearchResultsPage';
import PortfolioPage from './components/PortfolioPage';
import Footer from './components/Footer';

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
    articleText: 'Милі міні-тортики у традиційній екологічній бенто-коробці. Ідеальне рішення для персонального привітання, романтичного вечора або затишного сімейного чаювання.',
    desc: 'У вартість входить: авторський напис до 5 слів на білому фоні, святкова свічка, дерев\'яна ложечка, фірмова листівка та пакування стрічкою.',
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
    articleText: 'Збільшена версія класичного бенто-торта для невеликої компанії друзів. Вишуканий зовнішній вигляд та насичені вершкові начинки.',
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
    articleText: 'Повноцінний авторський торт збільшеного розміру. Дозволяє реалізувати складний художній декор, малюнки та написи.',
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
    articleText: 'Найпопулярніший святковий комплект! Поєднує свіжоспечений бенто-тортик для винуватця свята та 5 ніжних капкейків для гостей.',
    desc: 'Ідеальний вибір для фотосесій, днів народження та корпоративних вітань.'
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
    img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    badge: 'Капкейки',
    articleText: 'Ніжні порційні десерти на основі натурального вершкового масла та бісквіту. Прикрашаються шапочкою з крему та святковою посипкою.',
    desc: 'Кекси: ванільні, шоколадні, цитрусові, кокосові, червоний оксамит. Начинка: ягідна, апельсин, карамель+арахіс, шоколад.'
  },
  {
    id: 'cupcakes-12',
    name: 'Авторські Капкейки (Сет 12 шт)',
    category: 'cupcakes',
    categoryName: 'Капкейки',
    weights: '12 шт у коробці',
    price: 1700,
    unit: 'грн',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    badge: 'Велика коробка',
    articleText: 'Великий асорті-набір капкейків для кенді-бару або офісного святкування. Кожен капкейк має багату ягідну або шоколадну серединку.',
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
    img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    badge: '1100 грн / кг',
    articleText: 'Головна окраса будь-якого урочистого заходу — весілля, ювілею чи корпоративу. Створюємо ярусні та класичні торти з урахуванням усіх ваших побажань.',
    desc: 'Покриття на вибір: ніжний крем-сир на вершковому маслі або насичений шоколадний ганаш.',
    flavors: [
      'Ваніль-полуниця', 'Ваніль-персик', 'Манго-полуниця', 'Малина-карамель',
      'Манго-маракуйя', 'Червоний оксамит', 'Снікерс', 'Вишня-шоколад',
      'Шоколад-банан', 'Чорниця-шоколад', 'Маково-ягідний', 'Фісташка-малина'
    ]
  },

  /* FLAVORS & ARTICLES */
  {
    id: 'filling-vanilla-strawberry',
    name: 'Начинка: Ваніль - Полуниця',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Ванільний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    badge: 'Класика',
    articleText: 'Легкий та ніжний смак, який полюбляють дорослі та діти. Поєднання ароматної ванілі з натуральним полуничним конфи.',
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
    img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    badge: 'Бестселер',
    articleText: 'Насичений шоколадний бісквіт, просочений молочним сиропом, домашня солона карамель з хрустким арахісом та ганаш на бельгійському шоколаді.',
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
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    badge: 'Ніжний смак',
    articleText: 'Соковиті шматочки персикового конфи у прошарках із повітряного крем-сиру та пухкого ванільного коржа.',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Персикове конфи', 'Крем сир на вершках']
  },
  {
    id: 'filling-cherry-chocolate',
    name: 'Начинка: Вишня - Шоколад',
    category: 'fillings',
    categoryName: 'Опис Начинок',
    weights: 'Шоколадний бісквіт',
    price: 1100,
    unit: 'грн/кг',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    badge: 'Шоколадний шик',
    articleText: 'Класичний дует злегка кислуватої терпкої вишні та вишуканого темного ганашу.',
    ingredients: ['Шоколадний бісквіт', 'Молочне просочення', 'Вишневе конфи', 'Ганаш на темному шоколаді', 'Крем сир на вершках']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setActiveTab('cart');
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePerformSearch = (query) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        cartTotal={cartTotal}
        onOpenCart={() => setActiveTab('cart')}
        onPerformSearch={handlePerformSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'catalog' && (
          <Catalog
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioPage
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'guide' && (
          <StorageGuidePage
            onGoToCatalog={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onGoToCatalog={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'search' && (
          <SearchResultsPage
            searchQuery={searchQuery}
            menuItems={MENU_ITEMS}
            onAddToCart={handleAddToCart}
            onGoToCatalog={() => setActiveTab('catalog')}
            onGoToGuide={() => setActiveTab('guide')}
          />
        )}
      </main>

      <Footer onGoToGuide={() => setActiveTab('guide')} />
    </div>
  );
}
