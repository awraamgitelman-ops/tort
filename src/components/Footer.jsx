import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>🍰</span>
          <strong style={{ color: 'var(--text-main)', fontSize: '18px' }}>Tortiks Boutique</strong>
        </div>
        
        <p style={{ maxWidth: '500px', margin: '0 auto 16px', fontSize: '13px' }}>
          Авторские торты, брендирование сладостей ИИ-библиотекой Dembrandt и доставкой по всему городу.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '12px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} style={{ color: 'var(--accent-rose)' }} /> Ready for Railway Deployment
          </span>
          <span>•</span>
          <span>© {new Date().getFullYear()} Tortiks. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
