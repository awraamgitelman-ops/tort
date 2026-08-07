import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Layers, Palette, Type, Gift } from 'lucide-react';

const FROSTING_COLORS = [
  { id: 'rose', name: 'Клубничный бархат', hex: '#f43f5e', bg: 'hsl(348, 83%, 60%)' },
  { id: 'gold', name: 'Золотая ваниль', hex: '#fbbf24', bg: 'hsl(45, 93%, 58%)' },
  { id: 'purple', name: 'Черничный лаванда', hex: '#a855f7', bg: 'hsl(270, 91%, 65%)' },
  { id: 'mint', name: 'Фисташковый фреш', hex: '#10b981', bg: 'hsl(160, 84%, 39%)' },
  { id: 'dark', name: 'Бельгийский трюфель', hex: '#451a03', bg: 'hsl(24, 87%, 12%)' },
  { id: 'cyan', name: 'Морская лазурь', hex: '#06b6d4', bg: 'hsl(188, 86%, 53%)' }
];

const FILLINGS = [
  { id: 'strawberry', name: 'Клубничный чизкейк', desc: 'Сливочный крем-чиз и сочная клубника', pricePerKg: 2200 },
  { id: 'pistachio', name: 'Фисташка - Малина', desc: 'Фисташковый бисквит и малиновое конфи', pricePerKg: 2600 },
  { id: 'fudge', name: 'Шоколадный Фадж', desc: 'Темный шоколад и хрустящее пралине', pricePerKg: 2400 },
  { id: 'mango', name: 'Манго - Маракуйя', desc: 'Тропический мусс и желе из маракуйи', pricePerKg: 2500 }
];

export default function CakeCustomizer({ onAddToCart }) {
  const [tiers, setTiers] = useState(2);
  const [frosting, setFrosting] = useState(FROSTING_COLORS[0]);
  const [filling, setFilling] = useState(FILLINGS[0]);
  const [topperText, setTopperText] = useState('Happy Birthday!');
  const [goldFlakes, setGoldFlakes] = useState(true);
  const [freshBerries, setFreshBerries] = useState(true);

  // Price Calculation
  const baseWeight = tiers === 1 ? 1.2 : tiers === 2 ? 2.5 : 4.2;
  const rawPrice = Math.round(baseWeight * filling.pricePerKg + (goldFlakes ? 600 : 0) + (freshBerries ? 500 : 0));

  const handleAddToCart = () => {
    const customCakeItem = {
      id: `custom-${Date.now()}`,
      name: `Кастомный торт (${tiers} ${tiers === 1 ? 'ярус' : 'яруса'})`,
      category: 'custom',
      price: rawPrice,
      weight: `${baseWeight} кг`,
      desc: `Начинка: ${filling.name}. Цвет: ${frosting.name}. Топпер: "${topperText}".`,
      img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      badge: 'Кастомный'
    };
    onAddToCart(customCakeItem);
  };

  return (
    <section className="container" style={{ paddingBottom: '60px' }}>
      <div className="hero-section" style={{ paddingBottom: '20px' }}>
        <div className="hero-pill">
          <Sparkles size={14} /> Интерактивная 3D Студия
        </div>
        <h1 className="hero-title" style={{ fontSize: '42px' }}>
          Сконструируйте Свой <span className="hero-highlight">Идеальный Торт</span>
        </h1>
        <p className="hero-subtitle">
          Выбирайте количество ярусов, вкуснейшие авторские начинки, фирменный цвет глазури и персонализированную надпись.
        </p>
      </div>

      <div className="customizer-layout">
        {/* Visual Live Render Column */}
        <div className="cake-preview-box">
          {topperText && (
            <div className="cake-topper-text">
              ✨ {topperText} ✨
            </div>
          )}

          <div className="cake-visual-wrapper">
            {/* Tier 3 (Top) */}
            {tiers >= 3 && (
              <div 
                className="cake-tier"
                style={{
                  width: '140px',
                  height: '55px',
                  background: frosting.hex,
                  boxShadow: goldFlakes ? '0 0 15px rgba(251, 191, 36, 0.6)' : undefined
                }}
              >
                3 Ярус (800г)
              </div>
            )}

            {/* Tier 2 (Middle) */}
            {tiers >= 2 && (
              <div 
                className="cake-tier"
                style={{
                  width: '200px',
                  height: '70px',
                  background: frosting.hex,
                  boxShadow: goldFlakes ? '0 0 20px rgba(251, 191, 36, 0.5)' : undefined
                }}
              >
                2 Ярус (1.2кг)
              </div>
            )}

            {/* Tier 1 (Base) */}
            <div 
              className="cake-tier"
              style={{
                width: '270px',
                height: '85px',
                background: frosting.hex,
                boxShadow: goldFlakes ? '0 0 25px rgba(251, 191, 36, 0.4)' : undefined
              }}
            >
              1 Ярус (1.5кг)
            </div>

            {/* Cake Stand */}
            <div style={{
              width: '300px',
              height: '14px',
              background: 'linear-gradient(90deg, #d97706, #fbbf24, #d97706)',
              borderRadius: '8px',
              marginTop: '4px'
            }} />
          </div>

          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            {freshBerries && <span style={{ fontSize: '13px', color: 'var(--accent-rose)', marginRight: '12px' }}>🍓 Ягоды</span>}
            {goldFlakes && <span style={{ fontSize: '13px', color: 'var(--accent-gold)' }}>✨ Пищевое золото</span>}
          </div>
        </div>

        {/* Customization Options Controls Column */}
        <div>
          {/* Tiers Option */}
          <div className="custom-option-group">
            <label className="custom-label">
              <Layers size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Количество ярусов:
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[1, 2, 3].map(count => (
                <button
                  key={count}
                  onClick={() => setTiers(count)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: tiers === count ? 'var(--accent-rose)' : 'var(--border-color)',
                    background: tiers === count ? 'rgba(244, 63, 94, 0.15)' : 'var(--bg-primary)',
                    color: tiers === count ? 'var(--accent-rose)' : 'var(--text-main)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {count} {count === 1 ? 'ярус' : 'яруса'}
                </button>
              ))}
            </div>
          </div>

          {/* Filling Option */}
          <div className="custom-option-group">
            <label className="custom-label">
              <Gift size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Авторская начинка:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {FILLINGS.map(f => (
                <div
                  key={f.id}
                  onClick={() => setFilling(f)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: filling.id === f.id ? 'var(--accent-rose)' : 'var(--border-color)',
                    background: filling.id === f.id ? 'rgba(244, 63, 94, 0.1)' : 'var(--bg-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '14px' }}>
                    <span>{f.name}</span>
                    <span style={{ color: 'var(--accent-gold)' }}>{f.pricePerKg} ₽ / кг</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Frosting Color Swatches */}
          <div className="custom-option-group">
            <label className="custom-label">
              <Palette size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Цвет покрытия торта:
            </label>
            <div className="color-picker-grid">
              {FROSTING_COLORS.map(c => (
                <div
                  key={c.id}
                  title={c.name}
                  onClick={() => setFrosting(c)}
                  className={`color-swatch ${frosting.id === c.id ? 'active' : ''}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Topper Text Input */}
          <div className="custom-option-group">
            <label className="custom-label">
              <Type size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Текст на топпере:
            </label>
            <input
              type="text"
              className="input-field"
              value={topperText}
              onChange={e => setTopperText(e.target.value)}
              placeholder="Например: С Днём Рождения, Анна!"
            />
          </div>

          {/* Extras Checkboxes */}
          <div className="custom-option-group" style={{ display: 'flex', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
              <input
                type="checkbox"
                checked={goldFlakes}
                onChange={e => setGoldFlakes(e.target.checked)}
              />
              Пищевое золото 24K (+600 ₽)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
              <input
                type="checkbox"
                checked={freshBerries}
                onChange={e => setFreshBerries(e.target.checked)}
              />
              Свежие ягоды (+500 ₽)
            </label>
          </div>

          {/* Total & Submit */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Рассчитанный вес: {baseWeight} кг</div>
              <div className="price-tag">{rawPrice.toLocaleString()} ₽</div>
            </div>

            <button id="add-custom-cake-btn" className="btn-primary" onClick={handleAddToCart}>
              <ShoppingBag size={18} /> В корзину
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
