import React from 'react';
import { Phone, Mail, Send } from 'lucide-react';

export default function Footer({ onGoToGuide }) {
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
                +38(096)162-95-92
              </div>
              <div style={{ fontSize: '13px', color: 'var(--accent-cyan)' }}>
                Direct Telegram: @BELLA_CREME_ua
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
                <a href="https://t.me/BELLA_CREME_ua" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '6px 16px', fontSize: '12px' }}>
                  <Send size={12} /> Telegram @BELLA_CREME_ua
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Four Footer Columns */}
        <div className="footer-cols">
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
              Прийом замовлень у Direct & Telegram 7 днів на тиждень
            </p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--bg-navy)' }}>
              09:00 — 20:00
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Продукція</h4>
            <ul className="footer-links">
              <li><a href="#cakes">Авторські Торти</a></li>
              <li><a href="#cheesecake">Ванильні & Фруктові Чизкейки</a></li>
              <li><a href="#jars">Десерти в баночках</a></li>
              <li><a href="#exclusive">Вишукані Сладості</a></li>
              <li><a href="#cupcakes">Капкейки & Випічка</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Інформація</h4>
            <ul className="footer-links">
              <li>
                <button
                  onClick={onGoToGuide}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', fontSize: '13px', fontWeight: 700, padding: 0 }}
                >
                  Правила зберігання тортика 🍰
                </button>
              </li>
              <li><a href="https://t.me/BELLA_CREME_ua" target="_blank" rel="noreferrer">Замовлення в Direct</a></li>
              <li><a href="#delivery">Доставка та оплата</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Ми приймаємо до оплати</h4>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ fontWeight: 800, fontSize: '16px', color: '#16a34a' }}>LiqPay &raquo;</span>
              <span style={{ fontWeight: 800, fontSize: '16px', color: '#1d4ed8' }}>VISA</span>
              <span style={{ fontWeight: 800, fontSize: '16px', color: '#ea580c' }}>MasterCard</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div style={{ borderTop: '1px solid var(--border-light)', padding: '20px 0', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
          Всі права захищені © {new Date().getFullYear()} BELLA CRÈME (t.me/BELLA_CREME_ua)
        </div>
      </div>
    </footer>
  );
}
