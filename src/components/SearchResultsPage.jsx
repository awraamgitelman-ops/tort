import React from 'react';
import { Search, ChevronRight, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SearchResultsPage({ searchQuery, menuItems, onAddToCart, onGoToCatalog, onGoToGuide }) {
 const query = searchQuery.trim().toLowerCase();

 const matchingItems = menuItems.filter(item => {
 if (!query) return true;
 const nameMatch = item.name.toLowerCase().includes(query);
 const descMatch = item.desc && item.desc.toLowerCase().includes(query);
 const articleMatch = item.articleText && item.articleText.toLowerCase().includes(query);
 const catMatch = item.categoryName && item.categoryName.toLowerCase().includes(query);
 const flavorMatch = item.flavors && item.flavors.some(f => f.toLowerCase().includes(query));
 const ingMatch = item.ingredients && item.ingredients.some(i => i.toLowerCase().includes(query));
 return nameMatch || descMatch || articleMatch || catMatch || flavorMatch || ingMatch;
 });

 const isGuideMatch = 'правила зберігання рекомендації транспортування холодильник'.includes(query);

 return (
 <div style={{ minHeight: '80vh', padding: '36px 0 60px', background: 'var(--bg-main)' }}>
 <div className="container">
 {/* Header Block */}
 <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '28px', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold)', marginBottom: '8px' }}>
 <Search size={22} />
 <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Пошукова система BELLA CRÈME</span>
 </div>
 <h2 style={{ fontFamily: "'Georgia', serif", fontSize: '28px', color: 'var(--bg-navy)', fontWeight: 700 }}>
 Результати пошуку: <span style={{ color: 'var(--accent-gold)' }}>"{searchQuery}"</span>
 </h2>
 <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
 Розділи, товари та інформаційні картки, які містять інформацію, яку ви шукаєте:
 </p>
 </div>

 {/* Storage Guide Match Banner */}
 {isGuideMatch && (
 <div style={{ background: '#fdfbf7', border: '2px dashed #d4af37', borderRadius: 'var(--radius-md)', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
 <div>
 <h4 style={{ fontFamily: "'Georgia', serif", fontSize: '18px', color: '#8b6b1b', fontWeight: 700 }}>
 Розділ: Рекомендації та Правила зберігання тортика
 </h4>
 <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
 Знайдено збіг у розділі рекомендацій кондитера щодо транспортування та температурного режиму (+2...+6°C).
 </p>
 </div>
 <button
 className="btn-primary"
 onClick={onGoToGuide}
 style={{ padding: '8px 20px', fontSize: '13px', background: '#0b172a' }}
 >
 Переглянути правила &raquo;
 </button>
 </div>
 )}

 {/* Results Count & Items Column */}
 {matchingItems.length === 0 && !isGuideMatch ? (
 <div style={{ background: '#ffffff', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-md)', padding: '48px 24px', textAlign: 'center' }}>
 <AlertCircle size={48} style={{ color: 'var(--accent-rose)', margin: '0 auto 12px' }} />
 <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>
 На жаль, за вашим запитом нічого не знайдено
 </h3>
 <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px' }}>
 Спробуйте ввести іншу назву десерту (наприклад: <em>Бенто, Снікерс, Капкейки, Ваніль, Полуниця</em>) або перегляньте весь наш каталог.
 </p>
 <button className="btn-primary" onClick={onGoToCatalog}>
 &laquo; повернутися до повного прейскуранту
 </button>
 </div>
 ) : (
 <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
 <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>
 Знайдено матеріалів та позицій: {matchingItems.length}
 </div>

 {matchingItems.map(item => (
 <article
 key={item.id}
 style={{
 background: '#ffffff',
 border: '1px solid var(--border-light)',
 borderRadius: 'var(--radius-md)',
 padding: '24px',
 boxShadow: 'var(--shadow-sm)',
 display: 'flex',
 flexDirection: 'column',
 gap: '16px'
 }}
 >
 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
 <div>
 <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
 Знайдено в розділі: {item.categoryName}
 </span>
 <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '20px', color: 'var(--bg-navy)', fontWeight: 700, marginTop: '2px' }}>
 {item.name}
 </h3>
 </div>
 <div style={{ textAlign: 'right' }}>
 <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-gold)' }}>{item.price} {item.unit || 'грн'}</span>
 </div>
 </div>

 <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '20px' }}>
 <img src={item.img} alt={item.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
 <div>
 <p style={{ fontFamily: "'Georgia', serif", fontSize: '14px', color: '#334155', lineHeight: 1.5, marginBottom: '8px' }}>
 {item.articleText || item.desc}
 </p>
 {item.ingredients && (
 <div style={{ fontSize: '12px', color: '#475569', display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '6px' }}>
 {item.ingredients.map((ing, idx) => (
 <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
 <CheckCircle2 size={12} style={{ color: '#c59b27' }} /> {ing}
 </span>
 ))}
 </div>
 )}
 </div>
 </div>

 <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px dashed #f1f5f9', paddingTop: '12px' }}>
 <button
 className="btn-primary"
 onClick={() => onAddToCart({
 id: item.id,
 name: item.name,
 price: item.price,
 weight: item.weights
 })}
 style={{ padding: '8px 20px', fontSize: '13px' }}
 >
 <span>Додати в кошик та Замовити &raquo;</span>
 </button>
 </div>
 </article>
 ))}
 </div>
 )}
 </div>
 </div>
 );
}
