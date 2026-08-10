import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, Video as VideoIcon, Image as ImageIcon, Calendar } from 'lucide-react';

export default function PortfolioCarousel({ onGoToPortfolio }) {
  const [works, setWorks] = useState(() => {
    try {
      const cached = localStorage.getItem('cached_portfolio_works');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const sorted = [...data].sort((a, b) => (Number(b.originalTimestamp || b.id) - Number(a.originalTimestamp || a.id)));
            setWorks(sorted);
            localStorage.setItem('cached_portfolio_works', JSON.stringify(sorted));
          }
        }
      } catch (e) {}
    };
    fetchWorks();
  }, []);

  // Auto slide every 4.5s
  useEffect(() => {
    if (works.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % works.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [works.length]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + works.length) % works.length);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % works.length);
  };

  if (works.length === 0) {
    return (
      <section style={{ marginBottom: '32px', background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '24px 28px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={13} /> Авторські десерти & Відео-огляди
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--bg-navy)', margin: '4px 0 0' }}>
              Мої Роботи у Telegram
            </h2>
          </div>
          <button
            className="btn-primary"
            onClick={onGoToPortfolio}
            style={{ fontSize: '13px', padding: '9px 18px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            Переглянути галерею робіт <ArrowRight size={15} />
          </button>
        </div>
      </section>
    );
  }

  const currentWork = works[currentIndex];
  const mediaItem = (currentWork.mediaList && currentWork.mediaList[0]) || { url: currentWork.image, type: 'image' };
  const isVideo = mediaItem.type === 'video' || (typeof mediaItem.url === 'string' && (mediaItem.url.endsWith('.mp4') || mediaItem.url.includes('video')));

  return (
    <section style={{ marginBottom: '32px', background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={13} /> Авторські десерти & Відео-огляди
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--bg-navy)', margin: '2px 0 0' }}>
            Галерея Останніх Робіт
          </h2>
        </div>

        <button
          className="btn-primary"
          onClick={onGoToPortfolio}
          style={{ fontSize: '13px', padding: '9px 18px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          Дивитися всі мої роботи <ArrowRight size={15} />
        </button>
      </div>

      {/* Carousel Main Container */}
      <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', background: '#0b172a', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', minHeight: '260px' }}>
        {/* Media Preview Box */}
        <div style={{ height: '260px', position: 'relative', overflow: 'hidden', background: '#000' }}>
          {isVideo ? (
            <video
              src={mediaItem.url}
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <img
              src={mediaItem.url}
              alt={currentWork.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}

          {currentWork.date && (
            <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(11,23,42,0.85)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} /> {currentWork.date}
            </span>
          )}

          {isVideo && (
            <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(197, 155, 39, 0.95)', color: '#0b172a', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <VideoIcon size={12} /> Відео-огляд
            </span>
          )}
        </div>

        {/* Work Description Box */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0b172a', color: '#fff' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Робота {currentIndex + 1} з {works.length}
            </span>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '20px', fontWeight: 700, margin: '6px 0 10px', lineHeight: 1.3, color: '#ffffff' }}>
              {currentWork.title}
            </h3>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {currentWork.description}
            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {works.slice(0, 8).map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: idx === currentIndex ? '22px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: idx === currentIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>

            <button
              onClick={onGoToPortfolio}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Переглянути в галереї &raquo;
            </button>
          </div>
        </div>

        {/* Left / Right Carousel Control Buttons */}
        {works.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 4 }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 4 }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
