import React, { useEffect } from 'react';
import { ShieldCheck, FileText, ArrowLeft, Building2, Phone, Mail, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AgreementPage({ onBackToCatalog }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px 64px' }}>
      {/* Top Breadcrumb / Back Button */}
      <button
        onClick={onBackToCatalog}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f1f5f9',
          border: '1px solid #cbd5e1',
          padding: '8px 16px',
          borderRadius: 0,
          fontSize: '13.5px',
          fontWeight: 700,
          color: 'var(--bg-navy)',
          cursor: 'pointer',
          marginBottom: '24px',
          transition: 'all 0.2s ease'
        }}
      >
        <ArrowLeft size={16} /> Повернутися до каталогу
      </button>

      {/* Main Document Card */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 0, padding: '36px 32px', boxShadow: 'var(--shadow-sm)' }}>
        
        {/* Document Header */}
        <div style={{ borderBottom: '2px solid var(--accent-gold)', paddingBottom: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.12)', color: 'var(--accent-gold)', padding: '6px 14px', borderRadius: 0, fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
            <FileText size={15} /> Офіційний документ
          </div>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: '28px', color: 'var(--bg-navy)', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.3 }}>
            Договір публічної оферти та Угода користувача
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
            Умови купівлі-продажу кондитерських виробів дистанційним способом та правила використання офіційного сайту <strong>BELLA CRÈME</strong>.
          </p>
        </div>

        {/* Warning Notice Box */}
        <div style={{ background: '#f8fafc', borderLeft: '4px solid var(--accent-gold)', padding: '16px 20px', marginBottom: '32px', borderRadius: 0, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <AlertCircle size={22} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
            <strong>Увага:</strong> Перед переглядом цього сайту та оформленням замовлення уважно прочитайте ці умови. Якщо ви не згодні з цими умовами, будь ласка, не використовуйте цей сайт та не здійснюйте замовлення.
          </div>
        </div>

        {/* Sections Content */}
        <div style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Section 1 */}
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              1. Загальні положення
            </h2>
            <p>
              1.1. Ця публічна оферта (далі — «Оферта», «Договір») є офіційною пропозицією <strong>ТОВ «БОВАСКО»</strong> (Торговельна марка «BELLA CRÈME»), далі по тексту — «Продавець», укласти Договір купівлі-продажу кондитерських виробів та десертів дистанційним способом (через Інтернет-магазин) на умовах, викладених нижче.
            </p>
            <p style={{ marginTop: '8px' }}>
              1.2. Моментом повного і безумовного прийняття Покупцем пропозиції Продавця (акцептом) укласти електронний договір вважається факт оформлення замовлення, підтвердження через Telegram-менеджера або здійснення передоплати / повної оплати замовлення.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '12px' }}>
              2. Поняття та визначення
            </h2>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>«Товар»</strong> — авторські кондитерські вироби (бенто-торти, великі торти від 2 кг, святкові сеты, капкейки, десерти), представлені в каталозі Інтернет-магазину.</li>
              <li><strong>«Інтернет-магазин»</strong> — офіційний веб-сайт BELLA CRÈME, створений для ознайомлення з прейскурантом, описом начинок та оформлення дистанційних замовлень.</li>
              <li><strong>«Продавець»</strong> — ТОВ «БОВАСКО» (код ЄДРПОУ: 43342987, м. Одеса).</li>
              <li><strong>«Покупець»</strong> — дієздатна фізична або юридична особа, яка замовляє Товар на умовах цього Договору.</li>
              <li><strong>«Замовлення»</strong> — перелік окремих кондитерських позицій, узгоджена вага, начинка, дата готовності та адреса доставки, оформлені через сайт або Telegram-менеджера.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '12px' }}>
              3. Предмет Договору та особливості кондитерської продукції
            </h2>
            <p>
              3.1. Продавець зобов'язується виготовити та передати у власність Покупця замовлений Товар, а Покупець зобов'язується своєчасно прийняти та оплатити його.
            </p>
            <p style={{ marginTop: '8px' }}>
              3.2. <strong>Особливості ручної роботи:</strong> Усі кондитерські вироби є продукцією ручної роботи. Допускається незначне відхилення фактичної ваги готового торта від розрахункової в межах ±200 грамів (для багатоярусних тортів — до ±500 грамів).
            </p>
            <p style={{ marginTop: '8px' }}>
              3.3. Відтінки кольорів крему, декору та малюнків можуть незначно відрізнятися від зображень на екрані через індивідуальні налаштування передачі кольору дисплеїв.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '12px' }}>
              4. Порядок оформлення замовлення
            </h2>
            <p>
              4.1. Покупець обирає товар у каталозі сайту, вказує бажані смаки начинок, дату події та оформлює заявку.
            </p>
            <p style={{ marginTop: '8px' }}>
              4.2. Для узгодження складного індивідуального декору, написів, цукрових картинок та фігурок замовлення підтверджується через офіційного менеджера в Telegram (<strong>@BELLA_CREME_Manager</strong>) або за телефоном <strong>+38(068)655-19-19</strong>.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '12px' }}>
              5. Оплата замовлення
            </h2>
            <p>
              5.1. Розрахунки здійснюються у національній валюті України — гривні (UAH).
            </p>
            <p style={{ marginTop: '8px' }}>
              5.2. Виготовлення індивідуальних святкових тортів та великих замовлень здійснюється за попередньою передоплатою або повною оплатою за домовленістю сторін.
            </p>
            <p style={{ marginTop: '8px' }}>
              5.3. Оплата може здійснюватися безготівковим переказом на банківські реквізити Продавця або іншими узгодженими платіжними способами.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '12px' }}>
              6. Доставка, самовивіз та зберігання
            </h2>
            <p>
              6.1. Доставка здійснюється кур'єрськими службами або на таксі з дбайливим кондитерським транспортуванням по м. Одеса та області, або шляхом узгодженого самовивозу.
            </p>
            <p style={{ marginTop: '8px' }}>
              6.2. <strong>Умови зберігання:</strong> Кондитерські вироби з натуральними вершками, крем-сиром та свіжими ягодами є швидкопсувними продуктами харчування. Обов'язкове зберігання здійснюється виключно в холодильнику при температурі <strong>+2°C … +6°C</strong>. Термін придатності — до 72 годин з моменту виготовлення.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '12px' }}>
              7. Порядок повернення та обміну харчових продуктів
            </h2>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: 0, marginBottom: '10px' }}>
              <p style={{ margin: 0, fontWeight: 600, color: '#92400e' }}>
                Відповідно до Закону України «Про захист прав споживачів» та Постанови Кабінету Міністрів України № 172 від 19.03.1994 р. (Додаток № 3), продовольчі товари (харчові продукти, зокрема торти, десерти, капкейки) <strong>належної якості обміну та поверненню не підлягають</strong>.
              </p>
            </div>
            <p style={{ marginTop: '8px' }}>
              7.1. Покупець зобов'язаний перевірити цілісність пакування та зовнішній вигляд десерту в момент отримання (від кур'єра або при самовивозі).
            </p>
            <p style={{ marginTop: '8px' }}>
              7.2. У разі виявлення суттєвих пошкоджень продукції з вини служби доставки або невідповідності замовленого товару, Покупець повинен зафіксувати це фото/відео та негайно повідомити Продавця для оперативного вирішення ситуації, заміни виробу або повернення коштів.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '12px' }}>
              8. Конфіденційність та захист персональних даних
            </h2>
            <p>
              8.1. Оформлюючи замовлення, Покупець надає згоду на обробку своїх персональних даних (ім'я, контактний телефон, адреса доставки) відповідно до Закону України «Про захист персональних даних» виключно з метою виконання умов цього Договору та своєчасної доставки десертів.
            </p>
          </section>

          {/* Section 9 */}
          <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px', marginTop: '12px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bg-navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={20} style={{ color: 'var(--accent-gold)' }} />
              9. Реквізити Продавця
            </h2>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Юридична особа</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--bg-navy)', marginTop: '2px' }}>ТОВ «БОВАСКО»</div>
                <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>Код ЄДРПОУ: <strong>43342987</strong></div>
                <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>Місцезнаходження: м. Одеса, Україна</div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Контакти для замовлень та зв'язку</div>
                <div style={{ fontSize: '14px', color: '#0b172a', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} style={{ color: 'var(--accent-gold)' }} /> +38(068)655-19-19
                </div>
                <div style={{ fontSize: '14px', color: '#0b172a', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={14} style={{ color: 'var(--accent-gold)' }} /> Telegram: <a href="https://t.me/BELLA_CREME_Manager" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', fontWeight: 700, textDecoration: 'none' }}>@BELLA_CREME_Manager</a>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Графік: щоденно 09:00 — 20:00
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Catalog Button */}
        <div style={{ marginTop: '36px', textAlign: 'center' }}>
          <button
            onClick={onBackToCatalog}
            className="btn-primary"
            style={{ borderRadius: 0, padding: '14px 32px', fontSize: '14.5px', fontWeight: 800 }}
          >
            Перейти до каталогу десертів
          </button>
        </div>

      </div>
    </div>
  );
}
