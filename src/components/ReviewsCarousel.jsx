import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Анастасія Кравченко',
    text: 'Ягідний Наполеон — це найкращий торт, який мені доводилося куштувати! Рідко залишаю відгуки, але цей десерт мене підкорив. Завжди приємне та привітне обслуговування. Щиро дякую кондитерам за справжній шедевр!'
  },
  {
    id: 2,
    name: 'Олена Ковальчук',
    text: 'Замовляли десерт доньці на день народження — це було неймовірно! Іменинниця та всі гості в повному захваті. Дуже ніжний, із багатим шоколадним смаком та помірною солодкістю. Вишуканий декор зі свіжими ягодами та квітами. Рекомендую від щирого серця!'
  },
  {
    id: 3,
    name: 'Вікторія Мельник',
    text: 'Замовили великий святковий торт на дитяче свято. Оформлення виконано бездоганно — ніжне безе діти розібрали миттєво! А сам морквяний бісквіт виявився неймовірно соковитим та смачним, з\'їли все до останнього шматочка. Обов\'язково звернемося ще!'
  },
  {
    id: 4,
    name: 'Тетяна Василенко',
    text: 'Вже тривалий час замовляю солодощі лише у BELLA CRÈME. Для мене критично важливий натуральний склад без штучних домішок. Натуральні інгредієнти відчуваються у кожному шматочку, а смак просто бездоганний — усі гості завжди в захваті!'
  },
  {
    id: 5,
    name: 'Ярослав Шевченко',
    text: 'Зробив замовлення за порадою кондитера — довірився вибору і не прогадав! Десерти мають витончений смак та збалансовану солодкість. Окремо відзначу трюфельні вироби — приголомшлива структура та глибокий шоколадний посмак.'
  }
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const current = REVIEWS[currentIndex];

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

        <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, marginBottom: '20px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          "{current.text}"
        </p>

        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {current.name}
        </div>
      </div>

      {/* Navigation Arrow Buttons (Perfectly Centered & Aligned) */}
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
    </section>
  );
}
