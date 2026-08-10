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
    img: '/images/bento_cake.jpg',
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
    img: '/images/bento_cake.jpg',
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
    img: '/images/bento_cake.jpg',
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
    img: '/images/cupcakes.jpg',
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
    img: '/images/cupcakes.jpg',
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
    img: '/images/cupcakes.jpg',
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
    img: '/images/cupcakes.jpg',
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
    img: '/images/cupcakes.jpg',
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
    img: '/images/big_cake.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
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
    img: '/images/cake_filling.jpg',
    badge: 'Бестселер',
    articleText: 'Насичений шоколадний бісквіт, молочне просочення, домашНЯ солона карамель з обсмаженим арахісом, ганаш на молочному шоколаді та крем-сир.',
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
    img: '/images/cake_filling.jpg',
    badge: 'Ніжний смак',
    articleText: 'Соковиті шматочки персикового конфи у прошарках із повітряного крем-сиру та пухкого ванільного бісквіту.',
    ingredients: ['Ванільний бісквіт', 'Молочне просочення', 'Персикове конфи', 'Крем сир на вершках']
  }
];

export default function App() {
  const getInitialTab = () => {
    if (typeof window === 'undefined') return 'catalog';
    const rawHash = window.location.hash.replace('#', '').trim();
    const cleanTab = rawHash.split('?')[0];
    const validTabs = ['catalog', 'portfolio', 'guide', 'cart', 'search'];
    return validTabs.includes(cleanTab) ? cleanTab : 'catalog';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      if (window.location.hash.replace('#', '').split('?')[0] !== tab) {
        window.location.hash = tab;
      }
    }
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      const cleanTab = rawHash.split('?')[0];
      const validTabs = ['catalog', 'portfolio', 'guide', 'cart', 'search'];
      if (validTabs.includes(cleanTab)) {
        setActiveTabState(cleanTab);
      }
    };

    if (window.location.hash === '') {
      window.location.hash = 'catalog';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
