import React from 'react';
import { Send, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenStorageGuide }) {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '24px' }}>🧁</span>
          <strong style={{ color: 'var(--text-main)', fontSize: '20px', letterSpacing: '0.02em' }}>BELLA CRÈME</strong>
        </div>
        
        <p style={{ maxWidth: '540px', margin: '0 auto 16px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Смачні десерти на замовлення • Авторські торти • Капкейки • Випічка. Створено з любов'ю для ваших особливих свят 🤍
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <a
            href="https://t.me/BELLA_CREME_ua"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Send size={16} /> Telegram: @BELLA_CREME_ua
          </a>

          <button
            onClick={onOpenStorageGuide}
            style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ShieldCheck size={16} /> Правила зберігання
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-subtle)', flexWrap: 'wrap' }}>
          <span>Ready for Railway Deployment</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} BELLA CRÈME. Всі права захищені.</span>
        </div>
      </div>
    </footer>
  );
}
