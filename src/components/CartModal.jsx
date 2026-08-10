import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ShoppingBag, Send } from 'lucide-react';

export default function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }) {
 const [submitted, setSubmitted] = useState(false);
 const [form, setForm] = useState({ name: '', phone: '+380 ', address: '', date: '' });

 if (!isOpen) return null;

 const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

 const handlePhoneChange = (e) => {
 let val = e.target.value;
 if (!val.startsWith('+380')) {
 val = '+380 ' + val.replace(/^\+?3?8?0?\s?/, '');
 }
 setForm({ ...form, phone: val });
 };

 const handleSubmitOrder = (e) => {
 e.preventDefault();
 setSubmitted(true);
 };

 const handleCloseAll = () => {
 setSubmitted(false);
 onClearCart();
 onClose();
 };

 return (
 <div className="modal-overlay" onClick={onClose}>
 <div className="modal-card" onClick={e => e.stopPropagation()}>
 <button id="close-cart-btn" className="close-btn" onClick={onClose}>
 <X size={20} />
 </button>

 {submitted ? (
 <div style={{ textAlign: 'center', padding: '20px 0' }}>
 <CheckCircle2 size={64} style={{ color: 'var(--accent-gold)', margin: '0 auto 16px' }} />
 <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: 'var(--bg-navy)' }}>
 Замовлення успішно оформлено!
 </h3>
 <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px', lineHeight: 1.6 }}>
 Дякуємо! Наш менеджер <strong>BELLA CRÈME</strong> зв'яжеться з вами протягом 10 хвилин за номером <strong>{form.phone}</strong> або ви можете особисто написати нам у Telegram для швидкого підтвердження декору:
 </p>

 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
 <a
 href="https://t.me/BELLA_CREME_Meneger"
 target="_blank"
 rel="noreferrer"
 className="btn-primary"
 style={{ background: '#0284c7', textDecoration: 'none', width: '100%' }}
 >
 <Send size={18} /> Перейти в Telegram (@BELLA_CREME_Meneger)
 </a>

 <button
 className="btn-primary"
 onClick={handleCloseAll}
 style={{ width: '100%', background: 'var(--bg-navy-light)' }}
 >
 Чудово, повернутися на сайт
 </button>
 </div>
 </div>
 ) : (
 <>
 <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--bg-navy)' }}>
 <ShoppingBag size={22} style={{ color: 'var(--accent-gold)' }} /> Ваше Замовлення ({cartItems.length})
 </h3>

 {cartItems.length === 0 ? (
 <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
 <p style={{ fontSize: '16px', fontWeight: 600 }}>Ваш кошик поки порожній </p>
 <p style={{ fontSize: '13px', marginTop: '6px' }}>Оберіть авторський десерт або бенто-торт у нашому каталозі!</p>
 </div>
 ) : (
 <>
 <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '20px', paddingRight: '8px' }}>
 {cartItems.map((item, idx) => (
 <div
 key={idx}
 style={{
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'space-between',
 padding: '12px 0',
 borderBottom: '1px solid var(--border-light)'
 }}
 >
 <div>
 <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--bg-navy)' }}>{item.name}</div>
 <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.weight}</div>
 </div>
 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
 <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{item.price.toLocaleString()} ₴</span>
 <button
 onClick={() => onRemoveItem(idx)}
 style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
 >
 <Trash2 size={16} />
 </button>
 </div>
 </div>
 ))}
 </div>

 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, marginBottom: '24px', color: 'var(--bg-navy)' }}>
 <span>Разом до сплати:</span>
 <span style={{ color: 'var(--accent-gold)' }}>{totalPrice.toLocaleString()} ₴</span>
 </div>

 {/* Form Inputs */}
 <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
 <div>
 <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
 Ваше Ім'я *
 </label>
 <input
 type="text"
 required
 placeholder="Олена Ковальчук"
 className="input-field"
 value={form.name}
 onChange={e => setForm({ ...form, name: e.target.value })}
 />
 </div>

 <div>
 <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
 Номер телефону (Україна) *
 </label>
 <input
 type="tel"
 required
 placeholder="+380 (XX) XXX-XX-XX"
 className="input-field"
 value={form.phone}
 onChange={handlePhoneChange}
 />
 </div>

 <div>
 <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
 Адреса доставки / Місто *
 </label>
 <input
 type="text"
 required
 placeholder="м. Київ, вул. Хрещатик, 15"
 className="input-field"
 value={form.address}
 onChange={e => setForm({ ...form, address: e.target.value })}
 />
 </div>

 <div>
 <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
 Бажана дата отримання *
 </label>
 <input
 type="date"
 required
 min={new Date().toISOString().split('T')[0]}
 className="input-field"
 value={form.date}
 onChange={e => {
 const todayStr = new Date().toISOString().split('T')[0];
 const val = e.target.value;
 if (val && val < todayStr) {
 setForm({ ...form, date: todayStr });
 } else {
 setForm({ ...form, date: val });
 }
 }}
 />
 </div>

 <button id="submit-order-btn" type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%', height: '46px' }}>
 <Send size={18} /> Підтвердити та Замовити в Telegram
 </button>
 </form>
 </>
 )}
 </>
 )}
 </div>
 </div>
 );
}
