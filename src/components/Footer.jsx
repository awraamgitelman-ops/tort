import React from 'react';
import { Phone, Mail, Send } from 'lucide-react';

export default function Footer({ onGoToTab, onGoToCategory }) {
  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid var(--border-light)' }}>
      <div className="container" style={{ paddingTop: '40px' }}>
        {/* Support & Join Boxes */}
        <div className="footer-support-boxes">
          <div className="support-box">
            <div className="support-icon">
              <Phone size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Підтримка & Замовлення</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--bg-navy)' }}>
                +38(068)655-19-19
              </div>
              <div style={{ fontSize: '13px', color: 'var(--accent-cyan)' }}>
                Telegram: @BELLA_CREME_Manager
              </div>
            </div>
          </div>

          <div className="support-box">
            <div className="support-icon" style={{ background: 'var(--accent-gold)' }}>
              <Mail size={24} style={{ color: '#fff' }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Приєднуйтесь до нас</div>
              <div style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: 600, margin: '4px 0 10px' }}>
                Підписуйтесь на наші сторінки, щоб бути в курсі новин та знижок
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="https://t.me/BELLA_CREME_ua" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '6px 16px', fontSize: '12px', borderRadius: 0 }}>
                  <Send size={12} /> Telegram @BELLA_CREME_ua
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="footer-cols" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img
                src="/logo.png"
                alt="BELLA CRÈME Logo"
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--accent-gold)' }}
              />
              <span style={{ fontWeight: 800, fontSize: '16px', color: 'var(--bg-navy)' }}>BELLA CRÈME</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Торти • Кондитерські вироби власного виробництва
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Прийом замовлень у Telegram 7 днів на тиждень
            </p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--bg-navy)' }}>
              09:00 — 20:00
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Продукція</h4>
            <ul className="footer-links">
              <li>
                <a href="#bento" onClick={(e) => { e.preventDefault(); onGoToCategory('bento'); }}>
                  Бенто-Торти
                </a>
              </li>
              <li>
                <a href="#big_cakes" onClick={(e) => { e.preventDefault(); onGoToCategory('big_cakes'); }}>
                  Великі Авторські Торти
                </a>
              </li>
              <li>
                <a href="#cupcakes" onClick={(e) => { e.preventDefault(); onGoToCategory('cupcakes'); }}>
                  Капкейки
                </a>
              </li>
              <li>
                <a href="#fillings" onClick={(e) => { e.preventDefault(); onGoToCategory('fillings'); }}>
                  Опис та склад начинок
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Інформація</h4>
            <ul className="footer-links">
              <li>
                <a href="#guide" onClick={(e) => { e.preventDefault(); onGoToTab('guide'); }} style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
                  Правила зберігання тортика
                </a>
              </li>
              <li>
                <a href="#telegram" onClick={(e) => { e.preventDefault(); onGoToTab('telegram'); }}>
                  Замовлення в Telegram
                </a>
              </li>
              <li>
                <a href="#delivery" onClick={(e) => { e.preventDefault(); onGoToTab('delivery'); }}>
                  Доставка та умови
                </a>
              </li>
              <li>
                <a href="#agreement" onClick={(e) => { e.preventDefault(); onGoToTab('agreement'); }}>
                  Публічна оферта та угода
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Line & Legal Info */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          padding: '20px 0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '13px',
          color: 'var(--text-muted)'
        }}>
          <div>
            Всі права захищені © {new Date().getFullYear()} BELLA CRÈME
          </div>
          <div style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>
            ТОВ «БОВАСКО»
          </div>
        </div>
      </div>
    </footer>
  );
}
