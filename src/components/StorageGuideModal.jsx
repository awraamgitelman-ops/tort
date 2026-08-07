import React from 'react';
import { X, ShieldCheck, Car, ThermometerSnowflake, Clock, Sparkles } from 'lucide-react';

export default function StorageGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '620px' }} onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="hero-pill" style={{ marginBottom: '12px' }}>
            <ShieldCheck size={14} /> Рекомендації кондитера
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>
            Правила отримання та зберігання тортика
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Щоб ваш тортик був не лише красивим, а й таким же смачним, дотримуйтесь кількох простих рекомендацій:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '6px' }}>
          {/* Section 1 */}
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Car size={18} /> Після отримання:
            </h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>перевозьте торт на рівній поверхні (найкраще — на підлозі автомобіля або в багажнику);</li>
              <li>уникайте різких поворотів, гальмувань і прискорень;</li>
              <li>не залишайте торт у спекотному автомобілі.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ThermometerSnowflake size={18} /> Зберігання:
            </h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>одразу після отримання поставте торт у холодильник;</li>
              <li>оптимальна температура зберігання — <strong style={{ color: 'var(--text-main)' }}>+2...+6°C</strong>;</li>
              <li>не ставте торт поруч із продуктами, що мають різкий запах.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} /> Перед подачею:
            </h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>дістаньте торт із холодильника за <strong style={{ color: 'var(--text-main)' }}>30-60 хвилин</strong> до святкового столу — так начинка стане ніжнішою, а смак розкриється повністю;</li>
              <li>якщо на торті є топери, свічки чи інший неїстівний декор — обов'язково зніміть їх перед розрізанням.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div style={{
            background: 'rgba(244, 63, 94, 0.08)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            textAlign: 'center'
          }}>
            <Clock size={20} style={{ color: 'var(--accent-rose)', margin: '0 auto 6px' }} />
            <p style={{ fontSize: '13.5px', color: 'var(--text-main)', fontWeight: 600 }}>
              Кожен тортик виготовляється індивідуально та зі свіжих інгредієнтів, тому найкраще смакує в день отримання або протягом <span style={{ color: 'var(--accent-gold)' }}>2-3 діб</span> за умови правильного зберігання.
            </p>
          </div>
        </div>

        <button className="btn-primary" onClick={onClose} style={{ width: '100%', marginTop: '20px' }}>
          Зрозуміло, дякую!
        </button>
      </div>
    </div>
  );
}
