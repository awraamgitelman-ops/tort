import React from 'react';
import { Send, Phone, MessageSquare, CheckCircle2, Clock, ArrowLeft, Sparkles } from 'lucide-react';

export default function TelegramOrderPage({ onGoToCatalog }) {
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
            fontSize: '13.5px',
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
            Швидке Оформлення
          </span>
          <h1 style={{ fontSize: '32px', fontFamily: "'Georgia', serif", color: 'var(--bg-navy)', fontWeight: 700, margin: '6px 0 12px' }}>
            Замовлення в Telegram
          </h1>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, maxWidth: '720px' }}>
            Найпростіший та найшвидший спосіб узгодити дизайн торта, вибрати начинку, надіслати власні фото-референси або поставити запитання кондитеру.
          </p>
        </div>

        {/* Step-by-Step Guide */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', padding: '32px', borderRadius: 0, marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontFamily: "'Georgia', serif", color: 'var(--bg-navy)', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} style={{ color: 'var(--accent-gold)' }} /> Як оформити замовлення у Telegram?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '4px' }}>КРОК 1</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>Перейдіть у бот</h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                Відкрийте наш офіційний менеджер-бот <strong>@BELLA_CREME_Meneger</strong> у своєму додатку Telegram.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '4px' }}>КРОК 2</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>Оберіть десерт чи референс</h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                Надішліть назву обраного торта з каталогу або фотокартку бажаного дизайну з Інтернету.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '4px' }}>КРОК 3</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>Узгодження деталей</h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                Кондитер порадить найкращу начинку, узгодить дату доставки/самовивозу та підтвердить замовлення.
              </p>
            </div>
          </div>
        </div>

        {/* Working Hours & Direct Link Box */}
        <div style={{ background: 'var(--bg-navy)', color: '#ffffff', padding: '36px 32px', borderRadius: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
            <Send size={32} style={{ color: 'var(--accent-gold)' }} />
          </div>

          <div>
            <h2 style={{ fontSize: '24px', fontFamily: "'Georgia', serif", fontWeight: 700, marginBottom: '8px' }}>
              BELLA CRÈME Telegram Manager
            </h2>
            <p style={{ fontSize: '14.5px', color: '#cbd5e1', maxWidth: '520px', margin: '0 auto 12px' }}>
              Прийом замовлень та консультації 7 днів на тиждень з 09:00 до 20:00
            </p>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold)' }}>
              Тел: +38(068)655-19-19
            </div>
          </div>

          <a
            href="https://t.me/BELLA_CREME_Meneger"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ background: 'var(--accent-gold)', color: '#ffffff', borderRadius: 0, padding: '14px 32px', fontSize: '15px', fontWeight: 800 }}
          >
            <Send size={18} /> Відкрити Telegram @BELLA_CREME_Meneger
          </a>
        </div>
      </div>
    </div>
  );
}
