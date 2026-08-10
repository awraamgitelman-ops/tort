import React from 'react';
import { Truck, Package, Clock, ShieldCheck, MapPin, Phone, Send, ArrowLeft } from 'lucide-react';

export default function DeliveryPage({ onGoToCatalog }) {
  return (
    <div style={{ minHeight: '80vh', padding: '36px 0 80px', background: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Back button */}
        <button
          onClick={onGoToCatalog}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: 0,
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#0b172a',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}
        >
          <ArrowLeft size={16} /> Повернутися до каталогу
        </button>

        {/* Hero Banner */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 0, padding: '32px 36px', marginBottom: '32px', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
            Сервіс & Логістика
          </span>
          <h1 style={{ fontSize: '32px', fontFamily: "'Georgia', serif", color: 'var(--bg-navy)', fontWeight: 700, margin: '6px 0 12px' }}>
            Доставка та Умови Замовлення
          </h1>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, maxWidth: '720px' }}>
            Ми дбаємо про те, щоб кожен торт та авторський десерт доставлялися у найкращому стані, ідеальній температурі та збереженні дизайну.
          </p>
        </div>

        {/* Delivery Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', padding: '24px', borderRadius: 0 }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--bg-navy)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0, marginBottom: '16px' }}>
              <Truck size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>
              Кур'єрська Доставка
            </h3>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
              Доставка здійснюється дбайливо у спеціальних термо-контейнерах таксі або кур'єром. Вартість доставки розраховується за тарифом перевізника.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', padding: '24px', borderRadius: 0 }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--accent-gold)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0, marginBottom: '16px' }}>
              <MapPin size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>
              Самовивіз
            </h3>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
              Ви можете особисто забрати готове замовлення за попередньою домовленістю у зручний для вас час із 09:00 до 20:00.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', padding: '24px', borderRadius: 0 }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--bg-navy)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0, marginBottom: '16px' }}>
              <Package size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>
              Фірмове Пакування
            </h3>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
              Кожен бенто-торт безкоштовно комплектується еко-коробкою, ложечкою, свічкою, листівочкою та святковою стрічкою.
            </p>
          </div>
        </div>

        {/* Ordering Terms Detailed Box */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', padding: '32px', borderRadius: 0, marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontFamily: "'Georgia', serif", color: 'var(--bg-navy)', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={22} style={{ color: 'var(--accent-gold)' }} /> Терміни та Оплата Замовлень
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#334155' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Мінімальний термін замовлення:</strong> бажано оформлювати за 1–3 дні до вашого свята. Можливе термінове виготовлення бенто-тортів день-у-день за наявності вільних слотів.</div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Передоплата:</strong> виготовлення десертів починається після підтвердження деталей та внесення передоплати 50% або 100%.</div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Індивідуальний декор:</strong> написи до 5 слів на бенто-тортах включено у вартість. Складний малюнок чи цукровий друк узгоджуються окремо.</div>
            </li>
          </ul>
        </div>

        {/* Contact Banner */}
        <div style={{ background: 'var(--bg-navy)', color: '#ffffff', padding: '28px 32px', borderRadius: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Маєте запитання щодо доставки?</div>
            <div style={{ fontSize: '13.5px', color: '#cbd5e1' }}>Напишіть нам у Telegram або зателефонуйте: +38(068)655-19-19</div>
          </div>
          <a
            href="https://t.me/BELLA_CREME_Manager"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ background: 'var(--accent-gold)', color: '#ffffff', borderRadius: 0, padding: '12px 24px', fontSize: '13.5px' }}
          >
            <Send size={16} /> Написати в Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
