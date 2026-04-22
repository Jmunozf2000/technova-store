import { useState, useEffect } from "react";

const PRODUCTS = [
  { id: 1, name: "Phantom Buds Pro", category: "Audio", price: 129, rating: 4.8, badge: "BESTSELLER", desc: "Cancelación de ruido activa de 40dB, 32h de batería, resistencia al agua IPX5. Conectividad Bluetooth 5.3 con latencia ultra-baja de 20ms.", specs: ["ANC 40dB", "32h batería", "IPX5", "BT 5.3"], emoji: "🎧", color: "#00d4ff" },
  { id: 2, name: "Orbit Watch X2", category: "Wearables", price: 299, rating: 4.9, badge: "NUEVO", desc: "Pantalla AMOLED 1.4\", GPS integrado, 150 modos deportivos, SpO2 y ECG. Autonomía de 14 días.", specs: ["AMOLED 1.4\"", "GPS integrado", "SpO2 + ECG", "14 días batería"], emoji: "⌚", color: "#a78bfa" },
  { id: 3, name: "KeyForce TKL", category: "Periféricos", price: 189, rating: 4.7, badge: "GAMING", desc: "Switches mecánicos Red lineales, RGB por tecla, polling rate 8000Hz. Estructura de aluminio CNC.", specs: ["Switches Red", "RGB por tecla", "8000Hz polling", "Aluminio CNC"], emoji: "⌨️", color: "#f59e0b" },
  { id: 4, name: "LensMax 4K Ultra", category: "Video", price: 149, rating: 4.6, badge: null, desc: "Sensor Sony 1/2.8\", apertura f/2.0, HDR, autofoco AI. Grabación 4K@60fps para streamers.", specs: ["Sensor Sony", "f/2.0 apertura", "HDR + AI AF", "4K@60fps"], emoji: "📷", color: "#34d399" },
  { id: 5, name: "VaultDrive 2TB", category: "Almacenamiento", price: 89, rating: 4.8, badge: "OFERTA", desc: "Lectura 2000MB/s, escritura 1800MB/s. USB 3.2 Gen 2x2, resistente a caídas 3m, IP55.", specs: ["2000MB/s lectura", "USB 3.2 Gen2", "IP55", "Resistente caídas"], emoji: "💾", color: "#fb7185" },
  { id: 6, name: "AuraLight Studio", category: "Streaming", price: 59, rating: 4.5, badge: null, desc: "Anillo LED 12\", temperatura 3000K-6500K, soporte móvil y cámara. App Bluetooth incluida.", specs: ["12\" diámetro", "3000K-6500K", "App Bluetooth", "Soporte flexible"], emoji: "💡", color: "#fbbf24" },
  { id: 7, name: "SoundVeil NC950", category: "Audio", price: 249, rating: 4.9, badge: "TOP RATED", desc: "Drivers 40mm, ANC híbrido 3 micrófonos, modo transparencia, 30h batería + carga rápida.", specs: ["Drivers 40mm", "ANC híbrido", "Modo transparencia", "30h + carga rápida"], emoji: "🎵", color: "#818cf8" },
  { id: 8, name: "NexHub Pro 12", category: "Conectividad", price: 79, rating: 4.7, badge: null, desc: "12 puertos: HDMI 4K@60Hz, 3x USB-A 3.0, 2x USB-C 100W PD, SD, RJ45 Gigabit, audio 3.5mm.", specs: ["12 puertos", "HDMI 4K@60Hz", "100W Power Delivery", "RJ45 Gigabit"], emoji: "🔌", color: "#06b6d4" },
];

const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#f59e0b" : "#1e293b"}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="#f59e0b" strokeWidth="1.5"/>
      </svg>
    ))}
    <span style={{ color: "#94a3b8", fontSize: 11, marginLeft: 4 }}>{rating}</span>
  </div>
);

export default function TechStore() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [addedMap, setAddedMap] = useState({});
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const categories = ["Todos", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = activeCategory === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedMap(m => ({ ...m, [product.id]: true }));
    setTimeout(() => setAddedMap(m => ({ ...m, [product.id]: false })), 1500);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Barlow:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06090f; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        .product-card { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .product-card:hover { transform: translateY(-6px); border-color: rgba(0,212,255,0.25) !important; box-shadow: 0 20px 60px rgba(0,212,255,0.08); }
        .btn-action:hover { opacity: 0.85; transform: scale(0.97); }
      `}</style>

      <div style={{ fontFamily: "'Barlow', sans-serif", background: "#06090f", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden" }}>

        {/* NAV */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(6,9,15,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 20, fontWeight: 700, letterSpacing: 3 }}>TECH<span style={{ color: "#00d4ff" }}>NOVA</span></span>
          <button className="btn-action" onClick={() => setCartOpen(true)} style={{ position: "relative", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 12, padding: "10px 20px", cursor: "pointer", color: "#00d4ff", fontFamily: "'Barlow',sans-serif", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
            🛒 Carrito
            {cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#00d4ff", color: "#06090f", borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
          </button>
        </nav>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "0 32px", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>
          <div style={{ position: "relative", zIndex: 2, maxWidth: 800, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 100, padding: "6px 16px", fontSize: 12, color: "#00d4ff", letterSpacing: 2, fontWeight: 600, marginBottom: 24, textTransform: "uppercase" }}>⚡ NUEVA COLECCIÓN 2025</div>
            <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}>
              <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tecnología</span>
              <br /><span style={{ color: "#fff" }}>que redefine</span>
              <br /><span style={{ color: "#475569" }}>lo posible.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#64748b", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>Descubre los gadgets más avanzados del mercado. Rendimiento extremo, diseño sin compromisos.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-action" onClick={() => document.getElementById("catalog").scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(135deg, #00d4ff, #0088ff)", color: "#06090f", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Barlow',sans-serif" }}>Explorar productos →</button>
              <button className="btn-action" style={{ background: "transparent", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'Barlow',sans-serif" }}>Ver novedades</button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "32px", display: "flex", justifyContent: "center", gap: "clamp(32px,6vw,80px)", flexWrap: "wrap" }}>
          {[["12K+","Clientes activos"],["4.9","Valoración media"],["48h","Envío express"],["30 días","Devolución gratuita"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 26, fontWeight: 700, color: "#00d4ff", marginBottom: 4 }}>{n}</div>
              <div style={{ fontSize: 13, color: "#475569" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* CATALOG */}
        <section id="catalog" style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Catálogo</h2>
          <p style={{ color: "#64748b", marginBottom: 40, fontSize: 15 }}>Haz clic en un producto para ver todos los detalles</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
            {categories.map(cat => (
              <button key={cat} className="btn-action" onClick={() => setActiveCategory(cat)} style={{ background: activeCategory === cat ? "linear-gradient(135deg,#00d4ff,#0088ff)" : "rgba(255,255,255,0.03)", border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: activeCategory === cat ? "#06090f" : "#94a3b8", fontFamily: "'Barlow',sans-serif" }}>{cat}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {filtered.map(product => (
              <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)} style={{ background: "linear-gradient(145deg,#0d1421,#0a1018)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, background: `linear-gradient(135deg, ${product.color}15, ${product.color}05)`, borderBottom: `1px solid ${product.color}20`, position: "relative" }}>
                  {product.emoji}
                  {product.badge && <div style={{ position: "absolute", top: 12, right: 12, background: product.color, color: "#06090f", borderRadius: 6, padding: "3px 10px", fontSize: 10, fontWeight: 800, letterSpacing: 1 }}>{product.badge}</div>}
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6, fontWeight: 600 }}>{product.category}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: "#f1f5f9" }}>{product.name}</div>
                  <StarRating rating={product.rating} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: "#00d4ff", fontFamily: "'Orbitron',monospace" }}>${product.price}</span>
                    <button className="btn-action" onClick={e => addToCart(product, e)} style={{ background: addedMap[product.id] ? "#10b981" : `linear-gradient(135deg,${product.color},${product.color}aa)`, border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#06090f", fontFamily: "'Barlow',sans-serif", minWidth: 90, transition: "all 0.3s" }}>
                      {addedMap[product.id] ? "✓ Añadido" : "+ Añadir"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODAL */}
        {selectedProduct && (
          <div onClick={() => setSelectedProduct(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(8px)" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(145deg,#0d1421,#0a1018)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, maxWidth: 720, width: "100%", maxHeight: "90vh", overflow: "auto", position: "relative" }}>
              <button onClick={() => setSelectedProduct(null)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, width: 36, height: 36, cursor: "pointer", color: "#94a3b8", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>✕</button>
              <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100, background: `linear-gradient(135deg,${selectedProduct.color}20,${selectedProduct.color}05)`, borderBottom: `1px solid ${selectedProduct.color}20` }}>{selectedProduct.emoji}</div>
              <div style={{ padding: 36 }}>
                <div style={{ fontSize: 12, color: "#475569", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, fontWeight: 600 }}>{selectedProduct.category}</div>
                <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 26, fontWeight: 700, marginBottom: 12 }}>{selectedProduct.name}</h2>
                <StarRating rating={selectedProduct.rating} />
                <p style={{ color: "#64748b", marginTop: 20, lineHeight: 1.7, fontSize: 15 }}>{selectedProduct.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "24px 0" }}>
                  {selectedProduct.specs.map(spec => <div key={spec} style={{ background: `${selectedProduct.color}10`, border: `1px solid ${selectedProduct.color}25`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#94a3b8" }}>✓ {spec}</div>)}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 34, fontWeight: 900, color: "#00d4ff" }}>${selectedProduct.price}</div>
                  <button className="btn-action" onClick={e => addToCart(selectedProduct, e)} style={{ background: addedMap[selectedProduct.id] ? "#10b981" : `linear-gradient(135deg,${selectedProduct.color},${selectedProduct.color}aa)`, border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", color: "#06090f", fontFamily: "'Barlow',sans-serif", transition: "all 0.3s" }}>
                    {addedMap[selectedProduct.id] ? "✓ Añadido" : "🛒 Añadir al carrito"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CART */}
        {cartOpen && <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 299 }} />}
        <div style={{ position: "fixed", top: 0, right: 0, height: "100%", width: 420, maxWidth: "100vw", background: "#0a1018", borderLeft: "1px solid rgba(255,255,255,0.08)", zIndex: 300, transform: cartOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 18, fontWeight: 700 }}>🛒 Tu Carrito</span>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "#64748b", fontSize: 20, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "20px 28px" }}>
            {cart.length === 0
              ? <div style={{ textAlign: "center", color: "#475569", padding: "60px 20px" }}><div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div><div style={{ fontWeight: 600, marginBottom: 8 }}>Tu carrito está vacío</div></div>
              : cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ color: "#00d4ff", fontWeight: 700, fontFamily: "'Orbitron',monospace", fontSize: 13 }}>${item.price}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 28, height: 28, cursor: "pointer", color: "#e2e8f0", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 28, height: 28, cursor: "pointer", color: "#e2e8f0", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 14, fontWeight: 700 }}>${item.price * item.qty}</div>
                </div>
              ))
            }
          </div>
          {cart.length > 0 && (
            <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 16, fontWeight: 600 }}>
                <span style={{ color: "#64748b" }}>Subtotal</span>
                <span style={{ fontFamily: "'Orbitron',monospace", color: "#00d4ff" }}>${cartTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: 13, color: "#475569" }}>
                <span>Envío express</span><span style={{ color: "#10b981", fontWeight: 600 }}>GRATIS</span>
              </div>
              <button className="btn-action" style={{ width: "100%", background: "linear-gradient(135deg,#00d4ff,#0088ff)", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", color: "#06090f", fontFamily: "'Barlow',sans-serif" }}>
                Finalizar compra · ${cartTotal}
              </button>
            </div>
          )}
        </div>

        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "40px 32px", textAlign: "center", color: "#334155", fontSize: 13 }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 16, color: "#1e293b", marginBottom: 12 }}>TECH<span style={{ color: "#164e63" }}>NOVA</span></div>
          <p>© 2025 TechNova — Beta v0.1</p>
        </footer>
      </div>
    </>
  );
}
