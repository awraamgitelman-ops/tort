import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Відгук вдячного клієнта',
    text: 'Торт виглядає як з обкладинки журналу, видно одразу що ви дуже професійно відноситесь до своєї справи) Його ні з чим не можна порівнювати, я нічого такого у місті подібного не куштував) Крем дуже ніжний і тане у роті. І сам декор торта був виконаний на висоті.'
  }
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (REVIEWS.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevReview = () => {
    if (REVIEWS.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const nextReview = () => {
    if (REVIEWS.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const current = REVIEWS[currentIndex] || REVIEWS[0];

  return (
    <section style={{ position: 'relative', margin: '0 0 12px', background: '#ffffff', border: '1px solid var(--border-light)', padding: '32px 28px 24px', boxShadow: 'var(--shadow-sm)' }}>
      {/* Cursive Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: "'Georgia', cursive, serif", fontSize: '38px', fontStyle: 'italic', color: 'var(--bg-navy)', margin: 0, fontWeight: 700 }}>
          Наші відгуки
        </h2>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Що кажуть наші вдячні клієнти
        </div>
      </div>

      {/* Review Content Slider Box */}
      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', padding: '0 36px' }}>
        <Quote size={32} style={{ color: 'var(--accent-gold)', opacity: 0.3, margin: '0 auto 12px', display: 'block' }} />

        <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, marginBottom: '20px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          "{current.text}"
        </p>

        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {current.name}
        </div>
      </div>

      {/* Navigation Arrow Buttons (Only when > 1 review) */}
      {REVIEWS.length > 1 && (
        <>
          <button
            onClick={prevReview}
            style={{
              position: 'absolute',
              left: '16px',
              top: '55%',
              transform: 'translateY(-50%)',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              margin: 0,
              lineHeight: 0,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
              color: '#0b172a',
              zIndex: 5
            }}
            title="Попередній відгук"
          >
            <ChevronLeft size={22} style={{ display: 'block', margin: 'auto', transform: 'translateX(-1px)' }} />
          </button>

          <button
            onClick={nextReview}
            style={{
              position: 'absolute',
              right: '16px',
              top: '55%',
              transform: 'translateY(-50%)',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              margin: 0,
              lineHeight: 0,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
              color: '#0b172a',
              zIndex: 5
            }}
            title="Наступний відгук"
          >
            <ChevronRight size={22} style={{ display: 'block', margin: 'auto', transform: 'translateX(1px)' }} />
          </button>

          {/* Slider Pagination Dots */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
            {REVIEWS.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: idx === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === currentIndex ? 'var(--accent-gold)' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
