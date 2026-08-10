import React, { useState } from 'react';
import { Trash2, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function CartPage({ cartItems, onRemoveItem, onClearCart, onGoToCatalog }) {
 const [submitted, setSubmitted] = useState(false);
 const [form, setForm] = useState({ name: '', phone: '+380 ', address: '', date: '', comment: '' });

 const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

 const handlePhoneChange = (e) => {
 let val = e.target.value;
 if (!val.startsWith('+380')) {
 val = '+380 ' + val.replace(/^\+?3?8?0?\s?/, '');
 }
 setForm({ ...form, phone: val });
 };

 const [sending, setSending] = useState(false);

 const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        date: form.date,
        comments: form.comment,
        cartItems: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          weight: item.weight || item.weights || ''
        })),
        totalAmount: totalPrice
      };

      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Failed to send order notification:', err);
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

 const handleFinish = () => {
 setSubmitted(false);
 onClearCart();
 onGoToCatalog();
 };

 return (
 <div style={{ background: '#e5e5e5', minHeight: '85vh', padding: '30px 0 60px', fontFamily: "'Times New Roman', Times, serif" }}>
 <div className="container">
 {/* Retro 2000s Style Document Container */}
 <div style={{
 maxWidth: '900px',
 margin: '0 auto',
 background: '#ffffff',
 border: '3px inset #71717a',
 padding: '24px',
 boxShadow: '4px 4px 0px #a1a1aa'
 }}>
 {/* Retro Top Header Table */}
 <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderColor: '#a1a1aa', background: '#f4f4f5', marginBottom: '20px' }}>
 <tbody>
 <tr>
 <td style={{ background: '#0b172a', color: '#ffffff', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>
 КОШИК ЗАМОВЛЕНЬ
 </td>
 <td style={{ textAlign: 'right', background: '#e4e4e7', fontSize: '13px', fontFamily: 'Courier New, monospace' }}>
 [ <a href="#back" onClick={(e) => { e.preventDefault(); onGoToCatalog(); }} style={{ color: '#0000ff', textDecoration: 'underline', cursor: 'pointer' }}>&laquo; Повернутися до каталогу</a> ]
 </td>
 </tr>
 </tbody>
 </table>

 {submitted ? (
 /* Retro Success Order Receipt Page */
 <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', padding: '24px', textAlign: 'center' }}>
 <CheckCircle2 size={48} style={{ color: '#16a34a', margin: '0 auto 12px' }} />
 <h2 style={{ fontFamily: 'Arial, sans-serif', color: '#15803d', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
 ВАШЕ ЗАМОВЛЕННЯ № {Math.floor(100000 + Math.random() * 900000)} ПРИЙНЯТО В ОБРОБКУ!
 </h2>
 <p style={{ fontSize: '15px', color: '#166534', lineHeight: 1.6, marginBottom: '20px' }}>
 Дякуємо! Інформацію про замовлення надіслано до черги кондитерської <strong>BELLA CRÈME</strong>. Менеджер зв'яжеться з вами за номером <strong>{form.phone}</strong> протягом 10 хвилин.
 </p>

 <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', padding: '16px', margin: '0 auto 20px', maxWidth: '500px', textAlign: 'left', fontSize: '13px', fontFamily: 'Courier New, monospace' }}>
 <div><strong>Клієнт:</strong> {form.name}</div>
 <div><strong>Телефон:</strong> {form.phone}</div>
 <div><strong>Адреса:</strong> {form.address}</div>
 <div><strong>Дата виконання:</strong> {form.date}</div>
 <div><strong>Сума замовлення:</strong> {totalPrice.toLocaleString()} ₴</div>
 </div>

 <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
 <a
 href="https://t.me/BELLA_CREME_ua"
 target="_blank"
 rel="noreferrer"
 style={{
 background: '#0284c7',
 color: '#ffffff',
 padding: '10px 20px',
 fontWeight: 'bold',
 fontSize: '14px',
 fontFamily: 'Arial, sans-serif',
 textDecoration: 'none',
 border: '2px outset #0284c7'
 }}
 >
 Перейти в Telegram (@BELLA_CREME_ua)
 </a>

 <button
 onClick={handleFinish}
 style={{
 background: '#e4e4e7',
 color: '#000000',
 padding: '10px 20px',
 fontWeight: 'bold',
 fontSize: '14px',
 fontFamily: 'Arial, sans-serif',
 cursor: 'pointer',
 border: '2px outset #d4d4d8'
 }}
 >
 Завершити та очистити
 </button>
 </div>
 </div>
 ) : cartItems.length === 0 ? (
 /* Retro Empty Cart Display */
 <div style={{ background: '#fef2f2', border: '2px dashed #ef4444', padding: '40px', textAlign: 'center' }}>
 <h3 style={{ fontFamily: 'Arial, sans-serif', color: '#991b1b', fontSize: '20px', marginBottom: '10px' }}>
 ВАШ КОШИК НАРАЗІ ПОРОЖНІЙ!
 </h3>
 <p style={{ fontSize: '14px', color: '#7f1d1d', marginBottom: '20px' }}>
 Ви ще не додали жодного десерту до бланка замовлення.
 </p>
 <button
 onClick={onGoToCatalog}
 style={{
 background: '#0b172a',
 color: '#ffffff',
 padding: '10px 24px',
 fontSize: '14px',
 fontFamily: 'Arial, sans-serif',
 fontWeight: 'bold',
 cursor: 'pointer',
 border: '2px outset #1e293b'
 }}
 >
 &laquo; Перейти до вибору тортів у каталозі
 </button>
 </div>
 ) : (
 /* Retro Cart Table & Order Form */
 <div>
 <p style={{ fontSize: '14px', color: '#3f3f46', marginBottom: '14px' }}>
 Нижче наведено перелік вибраних вами позицій з нашого прейскуранту. Перевірте кількість та підтвердіть бланк замовлення:
 </p>

 {/* Retro HTML Table */}
 <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderColor: '#71717a', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '14px' }}>
 <thead>
 <tr style={{ background: '#d4d4d8', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
 <th style={{ textAlign: 'center', width: '40px' }}>№</th>
 <th style={{ textAlign: 'left' }}>Найменування товару / Начинка</th>
 <th style={{ textAlign: 'center' }}>Вага / Порція</th>
 <th style={{ textAlign: 'right' }}>Вартість</th>
 <th style={{ textAlign: 'center', width: '80px' }}>Дія</th>
 </tr>
 </thead>
 <tbody>
 {cartItems.map((item, idx) => (
 <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
 <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{idx + 1}</td>
 <td>
 <strong style={{ fontFamily: 'Arial, sans-serif', color: '#0b172a' }}>{item.name}</strong>
 </td>
 <td style={{ textAlign: 'center', fontFamily: 'Courier New, monospace' }}>{item.weight}</td>
 <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#cc0000', fontFamily: 'Courier New, monospace' }}>
 {item.price.toLocaleString()} ₴
 </td>
 <td style={{ textAlign: 'center' }}>
 <button
 onClick={() => onRemoveItem(idx)}
 style={{
 background: '#fee2e2',
 color: '#dc2626',
 border: '1px solid #fca5a5',
 padding: '2px 8px',
 fontSize: '12px',
 cursor: 'pointer',
 fontFamily: 'Arial, sans-serif'
 }}
 >
 Видалити
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 <tfoot>
 <tr style={{ background: '#f4f4f5', fontWeight: 'bold', fontSize: '16px' }}>
 <td colSpan="3" style={{ textAlign: 'right', fontFamily: 'Arial, sans-serif' }}>ВСЬОГО ДО СПЛАТИ:</td>
 <td style={{ textAlign: 'right', color: '#cc0000', fontFamily: 'Courier New, monospace', fontSize: '18px' }}>
 {totalPrice.toLocaleString()} ₴
 </td>
 <td></td>
 </tr>
 </tfoot>
 </table>

 {/* Retro Order Form Container */}
 <div style={{ background: '#f4f4f5', border: '2px inset #a1a1aa', padding: '20px', marginTop: '24px' }}>
 <h3 style={{ fontFamily: 'Arial, sans-serif', color: '#0b172a', fontSize: '18px', fontWeight: 'bold', marginBottom: '14px', borderBottom: '1px solid #d4d4d8', paddingBottom: '6px' }}>
 ОФОРМЛЕННЯ БЛАНКУ ЗАМОВЛЕННЯ ТА ДОСТАВКИ
 </h3>

 <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
 <div>
 <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginBottom: '4px', color: '#27272a' }}>
 П.І.Б. Замовника *
 </label>
 <input
 type="text"
 required
 placeholder="Олена Ковальчук"
 value={form.name}
 onChange={e => setForm({ ...form, name: e.target.value })}
 style={{
 width: '100%',
 padding: '8px',
 border: '2px inset #94a3b8',
 background: '#ffffff',
 fontSize: '14px',
 fontFamily: 'Arial, sans-serif'
 }}
 />
 </div>

 <div>
 <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginBottom: '4px', color: '#27272a' }}>
 Контактний телефон (Україна) *
 </label>
 <input
 type="tel"
 required
 placeholder="+380 (XX) XXX-XX-XX"
 value={form.phone}
 onChange={handlePhoneChange}
 style={{
 width: '100%',
 padding: '8px',
 border: '2px inset #94a3b8',
 background: '#ffffff',
 fontSize: '14px',
 fontFamily: 'Courier New, monospace',
 fontWeight: 'bold'
 }}
 />
 </div>
 </div>

 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
 <div>
 <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginBottom: '4px', color: '#27272a' }}>
 Адреса доставки / Пункт отримання *
 </label>
 <input
 type="text"
 required
 placeholder="м. Київ, вул. Хрещатик, 15"
 value={form.address}
 onChange={e => setForm({ ...form, address: e.target.value })}
 style={{
 width: '100%',
 padding: '8px',
 border: '2px inset #94a3b8',
 background: '#ffffff',
 fontSize: '14px',
 fontFamily: 'Arial, sans-serif'
 }}
 />
 </div>

 <div>
 <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginBottom: '4px', color: '#27272a' }}>
 Бажана дата готовності *
 </label>
 <input
 type="date"
 required
 value={form.date}
 onChange={e => setForm({ ...form, date: e.target.value })}
 style={{
 width: '100%',
 padding: '8px',
 border: '2px inset #94a3b8',
 background: '#ffffff',
 fontSize: '14px',
 fontFamily: 'Arial, sans-serif'
 }}
 />
 </div>
 </div>

 <div>
 <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', marginBottom: '4px', color: '#27272a' }}>
 Додаткові примітки / Текст для напису на торті:
 </label>
 <textarea
 rows="3"
 placeholder="Вкажіть бажаний напис на тортику або нюанси декору..."
 value={form.comment}
 onChange={e => setForm({ ...form, comment: e.target.value })}
 style={{
 width: '100%',
 padding: '8px',
 border: '2px inset #94a3b8',
 background: '#ffffff',
 fontSize: '14px',
 fontFamily: 'Arial, sans-serif'
 }}
 />
 </div>

 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #d4d4d8', paddingTop: '14px' }}>
 <button
 type="button"
 onClick={onGoToCatalog}
 style={{
 background: '#e4e4e7',
 color: '#000000',
 padding: '10px 20px',
 fontSize: '14px',
 fontFamily: 'Arial, sans-serif',
 cursor: 'pointer',
 border: '2px outset #d4d4d8'
 }}
 >
 &laquo; Повернутися до вибору
 </button>

 <button
 type="submit"
 disabled={sending}
 style={{
 background: '#0b172a',
 color: '#ffffff',
 padding: '12px 28px',
 fontSize: '15px',
 fontFamily: 'Arial, sans-serif',
 fontWeight: 'bold',
 cursor: sending ? 'wait' : 'pointer',
 border: '3px outset #1e293b',
 opacity: sending ? 0.7 : 1
 }}
 >
 {sending ? 'Надсилання замовлення...' : 'Підтвердити та відправити бланк »'}
 </button>
 </div>
 </form>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
