import React, { useEffect, useState } from 'react';
import { Sparkles, Send, Calendar, RefreshCw, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

function WorkCard({ work, onAddToCart }) {
  const allImages = work.images && work.images.length > 0 ? work.images : [work.image];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <article
      style={{
        background: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s'
      }}
    >
      {/* Photo Gallery Box with Carousel navigation */}
      <div style={{ width: '100%', height: '260px', overflow: 'hidden', position: 'relative', background: '#0b172a' }}>
        <img
          src={allImages[activeImgIndex]}
          alt={work.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s' }}
        />

        {/* Multi-photo badge */}
        {allImages.length > 1 && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(11,23,42,0.85)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ImageIcon size={12} /> {activeImgIndex + 1} / {allImages.length} фото
          </span>
        )}

        {/* Date badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(11,23,42,0.85)',
          color: '#fff',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Calendar size={12} /> {work.date || 'Нова робота'}
        </span>

        {/* Carousel Prev/Next Navigation Controls if > 1 image */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Mini Thumbnails Strip if Album */}
      {allImages.length > 1 && (
        <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', background: '#f8fafc', overflowX: 'auto', borderBottom: '1px solid #e2e8f0' }}>
          {allImages.map((thumbUrl, idx) => (
            <img
              key={idx}
              src={thumbUrl}
              alt="thumbnail"
              onClick={() => setActiveImgIndex(idx)}
              style={{
                width: '44px',
                height: '44px',
                objectFit: 'cover',
                borderRadius: '4px',
                cursor: 'pointer',
                border: activeImgIndex === idx ? '2px solid var(--accent-gold)' : '1px solid #cbd5e1',
                opacity: activeImgIndex === idx ? 1 : 0.65
              }}
            />
          ))}
        </div>
      )}

      {/* Card Content Description */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '18px', color: 'var(--bg-navy)', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
          {work.title}
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px', flex: 1, whiteSpace: 'pre-line' }}>
          {work.description}
        </p>

        <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '14px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a
            href="https://t.me/BELLA_CREME_ua"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--accent-cyan)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Send size={13} /> t.me/BELLA_CREME_ua
          </a>

          <button
            className="btn-primary"
            onClick={() => onAddToCart({
              id: `portfolio-${work.id}`,
              name: work.title,
              price: 1100,
              weight: 'Індивідуальне замовлення'
            })}
            style={{ padding: '8px 16px', fontSize: '12px' }}
          >
            Замовити схожий &raquo;
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage({ onAddToCart }) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setWorks(data);
      }
    } catch (err) {
      console.warn('Failed to load portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div style={{ minHeight: '80vh', padding: '36px 0 80px', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header Mint Banner */}
        <div className="hero-banner" style={{ borderRadius: 'var(--radius-md)', padding: '32px 36px', marginBottom: '32px' }}>
          <div className="hero-banner-content">
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
                Офіційна портфоліо-галерея
              </span>
              <h1 className="hero-banner-title" style={{ fontSize: '36px', marginTop: '4px' }}>
                Мої Роботи & Авторські Десерти
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', maxWidth: '650px', lineHeight: 1.5 }}>
                Усі роботи в цій галереї автоматично спарсені з нашого офіційного Telegram-каналу <strong>@BELLA_CREME_ua</strong> з підтримкою мульти-фото альбомів.
              </p>
            </div>

            <button
              onClick={fetchPortfolio}
              className="btn-primary"
              style={{ padding: '10px 18px', fontSize: '13px', background: '#0b172a' }}
            >
              <RefreshCw size={14} className={loading ? 'spin' : ''} /> Оновити галерею
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '16px', fontWeight: 600 }}>Завантаження робіт з бази Telegram-бота...</p>
          </div>
        ) : works.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-md)', padding: '48px 24px', textAlign: 'center' }}>
            <Sparkles size={48} style={{ color: 'var(--accent-gold)', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>
              Галерея робіт наразі формується!
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 16px' }}>
              Пересилайте альбоми з фотографіями в наш Telegram-бот <code>@BELLA_CREME_ua</code>, і вони миттєво з'являться тут з фото-каруселлю!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
            {works.map((work) => (
              <WorkCard key={work.id} work={work} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
