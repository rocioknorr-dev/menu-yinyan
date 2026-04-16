import { useState, useEffect } from "react";

const LOGO_URL = "";

const menuData = {
  entradas: [
    {
      name: "Palta Rellena",
      desc: "Palta reina con pollo o rellena de atún con mayonesa.",
      nutrient: "Grasas Saludables",
      nutrientColor: "#E67E22",
      detail: "Rica en ácidos grasos monoinsaturados (omega-9) que favorecen la salud cardiovascular y ayudan a absorber vitaminas liposolubles (A, D, E, K).",
      emoji: "🥑"
    },
    {
      name: "Pescado Huevón",
      desc: "Huevo relleno con atún, mayonesa casera y alcaparra.",
      nutrient: "Grasas Saludables",
      nutrientColor: "#E67E22",
      detail: "Combina proteínas de alto valor biológico del huevo con omega-3 del atún, esenciales para la función cerebral y la visión.",
      emoji: "🥚"
    },
    {
      name: "Ensalada de Poroto",
      desc: "Poroto cocido con tomate, pepino, aceite de oliva, jugo de limón y perejil.",
      nutrient: "Carbohidratos",
      nutrientColor: "#2980B9",
      detail: "Las legumbres son ricas en almidón (carbohidrato complejo), fibra dietaria y vitaminas del grupo B. Aportan energía sostenida.",
      emoji: "🥗"
    },
    {
      name: "Superensalada",
      desc: "Láminas de pepino y zanahorias con semillas de calabaza o maní, tostadas y vinagreta.",
      nutrient: "Proteínas",
      nutrientColor: "#27AE60",
      detail: "Las semillas aportan proteínas vegetales, zinc, magnesio y ácidos grasos esenciales. Ideal como entrada ligera y nutritiva.",
      emoji: "🥒"
    }
  ],
  principales: [
    {
      name: "Aquaman",
      desc: "Pescados y mariscos + huevo, lentejas, garbanzos y acompañamientos.",
      nutrient: "Proteínas",
      nutrientColor: "#27AE60",
      detail: "Alto contenido en proteínas completas, hierro hemo, omega-3 (DHA y EPA) y vitamina B12. Ideal para la regeneración muscular.",
      emoji: "🐟"
    },
    {
      name: "Super Pasta Bros",
      desc: "Pasta integral con verduras salteadas y queso fresco. Rico pero simple.",
      nutrient: "Carbohidratos",
      nutrientColor: "#2980B9",
      detail: "Los carbohidratos complejos de la pasta integral liberan energía de forma sostenida. La fibra mejora la digestión y la saciedad.",
      emoji: "🍝"
    },
    {
      name: "Pechuga a la Plancha",
      desc: "Pechuga de pollo con arroz (integral/común), ensalada, palta y aceite de oliva.",
      nutrient: "Proteínas",
      nutrientColor: "#27AE60",
      detail: "Plato equilibrado: proteínas magras + carbohidratos + grasas insaturadas. Combinación ideal de los tres macronutrientes.",
      emoji: "🍗"
    },
    {
      name: "El Coliseo",
      desc: "Carne de res con yogur griego, nueces, almendras y aceite de oliva.",
      nutrient: "Grasas Saludables",
      nutrientColor: "#E67E22",
      detail: "Las nueces aportan omega-3 (ALA) y el yogur griego probióticos beneficiosos para la microbiota intestinal.",
      emoji: "🥩"
    }
  ],
  postres: [
    {
      name: "Bombón Asesino",
      desc: "Bombones de mantequilla de maní y chocolate. Dátiles rellenos bañados en chocolate negro.",
      nutrient: "Grasas Saludables",
      nutrientColor: "#E67E22",
      detail: "Las grasas del maní son monoinsaturadas y el chocolate negro (>70% cacao) aporta flavonoides con poder antioxidante.",
      emoji: "🍫"
    },
    {
      name: "Frozen",
      desc: "Helados en base a frutas, yogur griego o leche proteica.",
      nutrient: "Proteínas",
      nutrientColor: "#27AE60",
      detail: "Postre con alto valor proteico (caseína y suero), calcio y probióticos. Bajo en azúcares añadidos comparado con helados convencionales.",
      emoji: "🍨"
    }
  ],
  bebidas: [
    {
      name: "Café con Crema / Batidos",
      desc: "Preparados con helado artesanal.",
      nutrient: "Grasas",
      nutrientColor: "#E67E22",
      detail: "Aportan lípidos para la absorción de vitaminas liposolubles y energía rápida.",
      emoji: "☕"
    },
    {
      name: "Leche de Soja / Caldos de Huevos",
      desc: '"Huevo de soja". Bebidas proteicas.',
      nutrient: "Proteínas",
      nutrientColor: "#27AE60",
      detail: "Ricas en proteínas vegetales y aminoácidos esenciales. Alternativa a la proteína animal.",
      emoji: "🥛"
    },
    {
      name: "Coca / Cerveza",
      desc: "Bebidas con carbohidratos simples.",
      nutrient: "Carbohidratos",
      nutrientColor: "#2980B9",
      detail: "Aportan energía rápida por su alto contenido de azúcares. Consumir con moderación.",
      emoji: "🍺"
    }
  ]
};

const macroInfo = [
  { name: "Proteínas", kcal: "4 kcal/g", pct: "30%", func: "Construcción y reparación de tejidos, enzimas y anticuerpos", color: "#27AE60", icon: "💪" },
  { name: "Grasas", kcal: "9 kcal/g", pct: "30%", func: "Reserva energética, protección de órganos, absorción de vitaminas", color: "#E67E22", icon: "🫒" },
  { name: "Carbohidratos", kcal: "4 kcal/g", pct: "40%", func: "Fuente principal de energía para cerebro y músculos", color: "#2980B9", icon: "⚡" },
];

function MenuCard({ item, index, isExpanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        borderRadius: 16,
        padding: "18px 20px",
        cursor: "pointer",
        border: `1.5px solid ${isExpanded ? item.nutrientColor : "rgba(44,24,16,0.08)"}`,
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: isExpanded ? "scale(1.01)" : "scale(1)",
        boxShadow: isExpanded
          ? `0 8px 32px ${item.nutrientColor}22, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 1px 4px rgba(0,0,0,0.04)",
        animationDelay: `${index * 80}ms`,
        animation: "fadeSlideUp 0.5s ease both",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          fontSize: 32,
          lineHeight: 1,
          minWidth: 40,
          textAlign: "center",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
        }}>
          {item.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: 20,
              background: item.nutrientColor,
              color: "#fff",
              fontSize: 10,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase"
            }}>
              {item.nutrient}
            </span>
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 19,
            fontWeight: 800,
            color: "#2C1810",
            margin: "6px 0 4px",
            lineHeight: 1.2
          }}>
            {item.name}
          </h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13.5,
            color: "#5A4A42",
            margin: 0,
            lineHeight: 1.5
          }}>
            {item.desc}
          </p>
          <div style={{
            maxHeight: isExpanded ? 120 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
            opacity: isExpanded ? 1 : 0,
          }}>
            <div style={{
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: 10,
              background: `${item.nutrientColor}0D`,
              borderLeft: `3px solid ${item.nutrientColor}`,
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12.5,
                color: "#2C1810",
                margin: 0,
                lineHeight: 1.6,
                fontStyle: "italic"
              }}>
                🔬 {item.detail}
              </p>
            </div>
          </div>
        </div>
        <div style={{
          fontSize: 14,
          color: "#8B7D75",
          transition: "transform 0.3s ease",
          transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
          marginTop: 8
        }}>▼</div>
      </div>
    </div>
  );
}

function SectionTitle({ children, icon }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
      marginTop: 8
    }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 26,
        fontWeight: 900,
        color: "#2C1810",
        margin: 0,
        letterSpacing: "-0.5px"
      }}>
        {children}
      </h2>
      <div style={{
        flex: 1,
        height: 2,
        background: "linear-gradient(90deg, #C0392B, transparent)",
        borderRadius: 2,
        marginLeft: 8
      }} />
    </div>
  );
}

export default function YinYanMenu() {
  const [expanded, setExpanded] = useState({});
  const [showMacros, setShowMacros] = useState(false);

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const timer = setTimeout(() => setShowMacros(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: `
        radial-gradient(ellipse at 20% 0%, rgba(192,57,43,0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 100%, rgba(41,128,185,0.05) 0%, transparent 60%),
        linear-gradient(180deg, #FFFBF5 0%, #FFF8F0 40%, #FFF5EB 100%)
      `,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #C0392B44; border-radius: 3px; }
      `}</style>

      {/* HERO HEADER */}
      <div style={{
        textAlign: "center",
        padding: "48px 24px 36px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 4,
          background: "linear-gradient(90deg, #C0392B, #E67E22, #27AE60, #2980B9, #C0392B)"
        }} />

        {/* Yin Yang Symbol */}
        <div style={{
          width: 80, height: 80,
          margin: "0 auto 16px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2C1810 50%, #C0392B 50%)",
          position: "relative",
          boxShadow: "0 8px 32px rgba(44,24,16,0.2)",
          animation: "fadeSlideUp 0.6s ease both",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: "10%", left: "25%",
            width: 20, height: 20,
            borderRadius: "50%",
            background: "#C0392B",
          }} />
          <div style={{
            position: "absolute",
            bottom: "10%", right: "25%",
            width: 20, height: 20,
            borderRadius: "50%",
            background: "#2C1810",
          }} />
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 48,
          fontWeight: 900,
          color: "#2C1810",
          margin: "0 0 4px",
          letterSpacing: "6px",
          animation: "fadeSlideUp 0.6s ease 0.1s both",
        }}>
          YIN YAN
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "#C0392B",
          letterSpacing: "4px",
          textTransform: "uppercase",
          fontWeight: 600,
          margin: "0 0 6px",
          animation: "fadeSlideUp 0.6s ease 0.2s both",
        }}>
          Equilibrio Nutricional
        </p>
        <p style={{
          fontSize: 12,
          color: "#8B7D75",
          fontStyle: "italic",
          animation: "fadeSlideUp 0.6s ease 0.3s both",
          margin: 0,
        }}>
          Tocá cada plato para ver su información nutricional
        </p>
      </div>

      {/* MACRO LEGEND BAR */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 12,
        padding: "0 16px 28px",
        flexWrap: "wrap",
        animation: "fadeSlideUp 0.5s ease 0.35s both",
      }}>
        {macroInfo.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 20,
            background: `${m.color}12`,
            border: `1px solid ${m.color}30`,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: m.color }}>{m.name}</span>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px 32px" }}>

        <SectionTitle icon="🥗">Entradas</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {menuData.entradas.map((item, i) => (
            <MenuCard key={i} item={item} index={i} isExpanded={expanded[`e${i}`]} onToggle={() => toggle(`e${i}`)} />
          ))}
        </div>

        <SectionTitle icon="🍽️">Platos Principales</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {menuData.principales.map((item, i) => (
            <MenuCard key={i} item={item} index={i+4} isExpanded={expanded[`p${i}`]} onToggle={() => toggle(`p${i}`)} />
          ))}
        </div>

        <SectionTitle icon="🍫">Postres</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {menuData.postres.map((item, i) => (
            <MenuCard key={i} item={item} index={i+8} isExpanded={expanded[`d${i}`]} onToggle={() => toggle(`d${i}`)} />
          ))}
        </div>

        <SectionTitle icon="🥤">Bebidas</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
          {menuData.bebidas.map((item, i) => (
            <MenuCard key={i} item={item} index={i+10} isExpanded={expanded[`b${i}`]} onToggle={() => toggle(`b${i}`)} />
          ))}
        </div>

        {/* MACRO INFO SECTION */}
        <div style={{
          background: "linear-gradient(135deg, #2C1810, #3D2518)",
          borderRadius: 20,
          padding: "28px 22px",
          marginBottom: 32,
          opacity: showMacros ? 1 : 0,
          transform: showMacros ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 800,
            color: "#FFF8F0",
            margin: "0 0 6px",
            textAlign: "center"
          }}>
            Macronutrientes Esenciales
          </h2>
          <p style={{ fontSize: 12, color: "#C0A08A", textAlign: "center", margin: "0 0 20px" }}>
            Los tres pilares de una alimentación equilibrada
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {macroInfo.map((m, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px",
                borderRadius: 12,
                background: "rgba(255,248,240,0.07)",
                border: `1px solid ${m.color}40`,
              }}>
                <span style={{ fontSize: 28, minWidth: 36, textAlign: "center" }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                    <span style={{ color: m.color, fontWeight: 700, fontSize: 14 }}>{m.name}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "#C0A08A", fontSize: 11 }}>{m.kcal}</span>
                      <span style={{
                        background: m.color, color: "#fff",
                        fontSize: 10, fontWeight: 700,
                        padding: "1px 8px", borderRadius: 10
                      }}>{m.pct}</span>
                    </div>
                  </div>
                  <p style={{ color: "#D4B8A0", fontSize: 11.5, margin: 0, lineHeight: 1.4 }}>{m.func}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Distribution Bar */}
          <div style={{ marginTop: 20 }}>
            <p style={{ color: "#C0A08A", fontSize: 10, textAlign: "center", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>
              Distribución ideal por comida
            </p>
            <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 24 }}>
              {macroInfo.map((m, i) => (
                <div key={i} style={{
                  flex: m.name === "Carbohidratos" ? 4 : 3,
                  background: m.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 11, fontWeight: 700,
                }}>
                  {m.pct}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{
          textAlign: "center",
          padding: "20px 0 40px",
          borderTop: "1px solid rgba(192,57,43,0.15)",
        }}>
          <p style={{ color: "#C0392B", fontSize: 11, fontWeight: 600, margin: "0 0 4px", letterSpacing: 2 }}>
            YIN YAN
          </p>
          <p style={{ color: "#8B7D75", fontSize: 10, margin: 0, fontStyle: "italic" }}>
            Trabajo Práctico de Biología · Enfoque Nutricional
          </p>
          <p style={{ color: "#B0A098", fontSize: 9, margin: "8px 0 0" }}>
            Los macronutrientes son esenciales para una dieta equilibrada
          </p>
        </div>
      </div>
    </div>
  );
}
