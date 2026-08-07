import React from 'react';
import { ShieldCheck, Car, ThermometerSnowflake, Sparkles, Clock } from 'lucide-react';

export default function StorageGuidePage({ onGoToCatalog }) {
  return (
    <div style={{ background: '#f6f1e9', minHeight: '80vh', padding: '40px 0 80px' }}>
      <div className="container">
        {/* Vintage Parchment Document Container */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          background: '#fdfbf7',
          border: '2px solid #d4af37',
          borderRadius: '16px',
          padding: '50px 40px',
          boxShadow: '0 15px 35px rgba(180, 140, 50, 0.15), inset 0 0 80px rgba(212, 175, 55, 0.05)',
          position: 'relative'
        }}>
          {/* Decorative Corner Ornaments */}
          <div style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '20px', color: '#c59b27' }}>✦</div>
          <div style={{ position: 'absolute', top: '12px', right: '16px', fontSize: '20px', color: '#c59b27' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '12px', left: '16px', fontSize: '20px', color: '#c59b27' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '12px', right: '16px', fontSize: '20px', color: '#c59b27' }}>✦</div>

          {/* Header Seal & Title */}
          <div style={{ textAlign: 'center', marginBottom: '36px', borderBottom: '2px double #d4af37', paddingBottom: '28px' }}>
            <div style={{
              width: '70px',
              height: '70px',
              margin: '0 auto 16px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c59b27 0%, #8b6b1b 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 15px rgba(197, 155, 39, 0.4)',
              fontSize: '28px'
            }}>
              ✨
            </div>

            <div style={{ fontFamily: "'Georgia', serif", fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#8b6b1b', fontWeight: 700, marginBottom: '6px' }}>
              Кондитерська Мануфактура BELLA CRÈME
            </div>

            <h1 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontSize: '38px', color: '#0b172a', fontWeight: 700 }}>
              Рекомендації Кондитера
            </h1>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: '16px', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>
              Правила дбайливого транспортування та зберігання вашого авторського тортика
            </p>
          </div>

          {/* Intro Paragraph */}
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '15px', color: '#334155', lineHeight: 1.7, textIndent: '20px', marginBottom: '32px' }}>
            Щоб ваш тортик був не лише вражаюче красивим, а й зберіг свій первозданний ніжний смак та ідеальну текстуру, будь ласка, дотримуйтесь кількох традиційних правил від нашого шеф-кондитера:
          </p>

          {/* Rules List Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Rule 1 */}
            <div style={{ background: '#faf6f0', border: '1px solid #e8dec8', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '20px', color: '#8b6b1b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Car size={22} style={{ color: '#c59b27' }} /> 🎂 Після отримання (Транспортування):
              </h3>
              <ul style={{ fontFamily: "'Georgia', serif", fontSize: '14.5px', color: '#475569', paddingLeft: '24px', lineHeight: 1.7 }}>
                <li>Перевозьте торт виключно на рівній горизонтальній поверхні (найкраще — на підлозі автомобіля або в багажнику);</li>
                <li>Уникайте різких поворотів, гальмувань та швидкісних прискорень;</li>
                <li>Ніколи не залишайте торт у спекотному або прогрітому автомобілі.</li>
              </ul>
            </div>

            {/* Rule 2 */}
            <div style={{ background: '#faf6f0', border: '1px solid #e8dec8', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '20px', color: '#0284c7', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ThermometerSnowflake size={22} style={{ color: '#0284c7' }} /> ❄️ Правильне Зберігання:
              </h3>
              <ul style={{ fontFamily: "'Georgia', serif", fontSize: '14.5px', color: '#475569', paddingLeft: '24px', lineHeight: 1.7 }}>
                <li>Одразу після отримання обов'язково поставте торт у холодильну камеру;</li>
                <li>Оптимальна температура зберігання становить <strong style={{ color: '#0b172a' }}>+2...+6°C</strong>;</li>
                <li>Не ставте десерт поруч із продуктами, що мають сильний або гострий запах.</li>
              </ul>
            </div>

            {/* Rule 3 */}
            <div style={{ background: '#faf6f0', border: '1px solid #e8dec8', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '20px', color: '#ec4899', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={22} style={{ color: '#ec4899' }} /> ✨ Перед Святковою Подачею:
              </h3>
              <ul style={{ fontFamily: "'Georgia', serif", fontSize: '14.5px', color: '#475569', paddingLeft: '24px', lineHeight: 1.7 }}>
                <li>Дістаньте торт із холодильника за <strong style={{ color: '#0b172a' }}>30-60 хвилин</strong> до святкового столу — так кремова начинка стане максимально ніжною, а букет смаків розкриється повністю;</li>
                <li>Якщо на десерті присутні топери, свічки або інший неїстівний декор — обов'язково зніміть їх перед розрізанням.</li>
              </ul>
            </div>

            {/* Shelf Life Box */}
            <div style={{
              background: '#fef3c7',
              border: '1px dashed #d4af37',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <Clock size={24} style={{ color: '#b45309', margin: '0 auto 8px' }} />
              <p style={{ fontFamily: "'Georgia', serif", fontSize: '15px', color: '#78350f', fontWeight: 600, lineHeight: 1.6 }}>
                Кожен тортик виготовляється індивідуально та зі свіжих натуральних інгредієнтів, тому найкраще смакує в день отримання або протягом <strong>2-3 діб</strong> за умови дотримання правильного температурного режиму.
              </p>
            </div>
          </div>

          {/* Footer Vintage Note & Return Button */}
          <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '28px', borderTop: '1px solid #e8dec8' }}>
            <p style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontSize: '15px', color: '#8b6b1b', marginBottom: '20px' }}>
              Дякуємо, що довіряєте нам бути частиною ваших особливих свят! 🤍
            </p>

            <button
              className="btn-primary"
              onClick={onGoToCatalog}
              style={{ padding: '14px 32px', fontSize: '15px', background: '#0b172a' }}
            >
              Перейти до Каталогу Десертів &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
