import React, { useState } from 'react';
import { Building2, Globe, Sparkles, CheckCircle2, ShoppingBag, Loader2 } from 'lucide-react';

export default function BrandCakeStudio({ onAddToCart }) {
  const [url, setUrl] = useState('stripe.com');
  const [loading, setLoading] = useState(false);
  const [brandData, setBrandData] = useState({
    domain: 'stripe.com',
    colors: ['#635bff', '#00d4b6', '#0a2540', '#f6f9fc'],
    fonts: ['Outfit', 'Inter', 'sans-serif'],
    mode: 'demo'
  });

  const handleExtractBrand = async (e) => {
    e?.preventDefault();
    if (!url) return;
    setLoading(true);

    try {
      const res = await fetch('/api/extract-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setBrandData(data);
    } catch (err) {
      console.error('Extraction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderCorporateCake = () => {
    const brandCake = {
      id: `corporate-${Date.now()}`,
      name: `Корпоративный торт под Бренд (${brandData.domain})`,
      category: 'corporate',
      price: 18500,
      weight: '5.0 кг',
      desc: `Фирменные цвета: ${brandData.colors.slice(0, 3).join(', ')}. Нанесение логотипа и палитра брендбука.`,
      img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
      badge: 'Dembrandt AI'
    };
    onAddToCart(brandCake);
  };

  const primaryColor = brandData.colors?.[0] || '#f43f5e';
  const secondaryColor = brandData.colors?.[1] || '#a855f7';
  const darkColor = brandData.colors?.[2] || '#1a202c';

  return (
    <section className="container" style={{ paddingBottom: '60px' }}>
      <div className="hero-section">
        <div className="hero-pill">
          <Building2 size={14} /> Dembrandt AI Engine
        </div>
        <h1 className="hero-title">
          Брендинг Тортов по <span className="hero-highlight">URL Вашего Сайта</span>
        </h1>
        <p className="hero-subtitle">
          Введите адрес вашего сайта. Библиотека <strong>Dembrandt</strong> автоматически извлечёт брендбук компании (цвета, шрифты) и мгновенно оформит десерты в вашем корпоративном стиле.
        </p>
      </div>

      <div className="brand-studio-box">
        <form onSubmit={handleExtractBrand} className="brand-url-bar">
          <div style={{ position: 'relative', flex: 1 }}>
            <Globe size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-subtle)' }} />
            <input
              type="text"
              id="dembrandt-url-input"
              className="input-field"
              style={{ paddingLeft: '48px', height: '48px' }}
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Введите сайт (например, stripe.com или yandex.ru)"
            />
          </div>
          <button
            id="extract-brand-btn"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ height: '48px', minWidth: '180px' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin" /> Анализ через Dembrandt...
              </>
            ) : (
              <>
                <Sparkles size={18} /> Извлечь Стиль
              </>
            )}
          </button>
        </form>

        {/* Extracted Brand Palette Result Display */}
        {brandData && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700 }}>
                  Извлечённая Бренд-Палитра: <span style={{ color: 'var(--accent-rose)' }}>{brandData.domain}</span>
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Шрифтовая система: {brandData.fonts?.join(', ') || 'Outfit, Inter'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {brandData.colors?.map((col, idx) => (
                  <div key={idx} className="color-pill">
                    <span className="color-dot" style={{ background: col }} />
                    <code>{col}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Cake Preview Box */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              border: '1px solid var(--border-color)',
              marginTop: '24px'
            }}>
              {/* Visual Corporate Cake Simulation */}
              <div style={{
                background: darkColor,
                borderRadius: 'var(--radius-md)',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  background: primaryColor,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '14px',
                  marginBottom: '16px',
                  boxShadow: `0 4px 15px ${primaryColor}80`
                }}>
                  {brandData.domain?.toUpperCase()} CORPORATE CAKE
                </div>

                <div style={{
                  width: '220px',
                  height: '80px',
                  background: primaryColor,
                  borderRadius: '12px 12px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  borderBottom: `4px solid ${secondaryColor}`
                }}>
                  Верхний ярус (Бренд-глазурь)
                </div>

                <div style={{
                  width: '270px',
                  height: '100px',
                  background: secondaryColor,
                  borderRadius: '0 0 12px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}>
                  Нижний ярус (Печать логотипа)
                </div>
              </div>

              {/* Order Info Details */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
                  Корпоративный сет "Брендбук"
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                  Пакет включает 2-х ярусный торт на 5 кг, украшенный логотипом вашей компании и выполненный строго в цветовых кодах <code>{primaryColor}</code> и <code>{secondaryColor}</code>.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-rose)' }} /> 100% точность совпадения бренд-цветов
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-rose)' }} /> Съедобная печать логотипа высокого разрешения
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-rose)' }} /> Доставка в холодильном транспорте по городу
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div className="price-tag">18 500 ₽</div>
                  <button id="order-corporate-cake-btn" className="btn-primary" onClick={handleOrderCorporateCake}>
                    <ShoppingBag size={18} /> Заказать Сет
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
