import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ShoppingBag, Send } from 'lucide-react';

export default function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', date: '' });

  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

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
            <CheckCircle2 size={64} style={{ color: 'var(--accent-rose)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>Заказ успешно оформлен!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>
              Менеджер кондитерской Tortiks свяжется с вами в течение 10 минут по номеру {form.phone || 'указанному телефону'} для уточнения деталей.
            </p>
            <button className="btn-primary" onClick={handleCloseAll} style={{ width: '100%' }}>
              Отлично!
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={22} style={{ color: 'var(--accent-rose)' }} /> Ваш Заказ ({cartItems.length})
            </h3>

            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '16px' }}>Ваша корзина пока пуста 🍰</p>
                <p style={{ fontSize: '13px', marginTop: '6px' }}>Выберите торт в каталоге или воспользуйтесь 3D конструктором!</p>
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
                        borderBottom: '1px solid var(--border-color)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.weight}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{item.price.toLocaleString()} ₽</span>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>
                  <span>Итого к оплате:</span>
                  <span style={{ color: 'var(--accent-gold)' }}>{totalPrice.toLocaleString()} ₽</span>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    required
                    placeholder="Ваше Имя"
                    className="input-field"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Телефон (+7 999 000-00-00)"
                    className="input-field"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Адрес доставки"
                    className="input-field"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                  />
                  <input
                    type="date"
                    required
                    className="input-field"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                  />

                  <button id="submit-order-btn" type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%', height: '46px' }}>
                    <Send size={18} /> Подтвердить и Заказать
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
