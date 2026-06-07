import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import photo1 from "../imports/Ch_o_-_PB.png";
import photo2 from "../imports/Corredor_01_PB_-_2.0__1_.png";
import photo3 from "../imports/Escadas_01_-_PB_2.0.png";
import photo4 from "../imports/P_s_03_-_PB.png";
import photo5 from "../imports/Sombra_02_-_PB.png";
import photo6 from "../imports/TV_02_-_02_-_PB.png";

const exhibitionPhotos = [
  {
    id: 1,
    title: "Colo",
    caption:
      "Uma boneca de pano cor-de-rosa sobre o contorno desenhado a giz de uma figura infantil no asfalto.",
    accent: "#E8B4A0",
    image: photo1,
  },
  {
    id: 2,
    title: "Mais um dia",
    caption:
      "Um bichinho de pelúcia sentado sozinho em cadeiras de espera diante da placa 'Sala de Cirurgia 121-A'.",
    accent: "#A0B4C8",
    image: photo2,
  },
  {
    id: 3,
    title: "Antes tarde, do que nunca",
    caption:
      "Criança sentada em degraus de uma escada, segurando um boneco de pelúcia enquanto pessoas passam ao redor.",
    accent: "#C8A090",
    image: photo3,
  },
  {
    id: 4,
    title: "Laços rompidos",
    caption:
      "Um bicho-preguiça de pelúcia cor-de-rosa ao lado de tênis Converse pretos — infância e adolescência sobrepostas.",
    accent: "#D4B8A8",
    image: photo4,
  },
  {
    id: 5,
    title: "Pesar",
    caption:
      "Menina de costas projeta uma sombra gigante na parede; brinquedos e um cartaz ao chão.",
    accent: "#B0A0C0",
    image: photo5,
  },
  {
    id: 6,
    title: "Babá",
    caption:
      "Figura de costas diante de uma TV ligada no escuro; um bicho-preguiça lilás e embalagens descartadas ao redor.",
    accent: "#9090C0",
    image: photo6,
  },
];

// ── Thumbnail strip ──────────────────────────────────────────────────────────
function ThumbnailStrip({
  photos,
  activeIndex,
  onSelect,
}: {
  photos: typeof exhibitionPhotos;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the strip so the active thumb is always visible
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumb = strip.children[activeIndex] as
      | HTMLElement
      | undefined;
    if (!thumb) return;
    const stripLeft = strip.scrollLeft;
    const stripWidth = strip.offsetWidth;
    const thumbLeft = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;
    const targetScroll =
      thumbLeft - stripWidth / 2 + thumbWidth / 2;
    strip.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div
      style={{
        backgroundColor: "#F0EDE6",
        paddingTop: "16px",
        paddingBottom: "16px",
        borderBottom: "1px solid rgba(27,43,75,0.12)",
        position: "sticky",
        top: "53px" /* height of the nav bar */,
        zIndex: 40,
      }}
    >
      {/* Label */}
      <div className="flex items-center gap-3 px-6 mb-4">
        <div
          style={{
            width: "24px",
            height: "1px",
            backgroundColor: "#1B2B4B",
          }}
        />
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#1B2B4B",
          }}
        >
          Galeria · {activeIndex + 1} / {photos.length}
        </p>
      </div>

      {/* Scrollable row of thumbnails */}
      <div
        ref={stripRef}
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
        {photos.map((photo, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={photo.id}
              onClick={() => onSelect(i)}
              aria-label={`Ver foto ${i + 1}: ${photo.title}`}
              style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                border: "none",
                padding: 0,
                cursor: "pointer",
                position: "relative",
                background: "#111",
                borderRadius: "2px",
                overflow: "hidden",
                // Active: full opacity + navy outline + slight scale
                // Inactive: dimmed
                opacity: isActive ? 1 : 0.38,
                transform: isActive
                  ? "scale(1.12)"
                  : "scale(1)",
                outline: isActive
                  ? `2px solid #1B2B4B`
                  : "2px solid transparent",
                outlineOffset: "2px",
                transition:
                  "opacity 0.25s ease, transform 0.25s ease, outline 0.25s ease",
              }}
            >
              {/* Thumbnail — real photo with blur or placeholder */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#151515",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {photo.image ? (
                  <ImageWithFallback
                    src={photo.image}
                    alt={`Miniatura ${photo.title}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "blur(2px) contrast(0.9)",
                      transform: "scale(1.1)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: photo.accent,
                      opacity: 0.7,
                    }}
                  />
                )}
                {/* Photo number */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "3px",
                    right: "4px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "rgba(240,237,230,0.7)",
                    letterSpacing: "0.05em",
                    textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                    zIndex: 10,
                  }}
                >
                  {i + 1}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Photo card ───────────────────────────────────────────────────────────────
function PhotoCard({
  photo,
  cardRef,
  isExpanded,
  onToggle,
}: {
  photo: (typeof exhibitionPhotos)[0];
  cardRef: (el: HTMLDivElement | null) => void;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        backgroundColor: "#F0EDE6",
        padding: "24px",
        borderBottom: "1px solid rgba(27,43,75,0.08)",
      }}
    >
      {/* Título acima da foto */}
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#0F0F0F",
          fontSize: "16px",
          fontStyle: "italic",
          marginBottom: "16px",
        }}
      >
        {photo.title}
      </p>

      {/* Moldura branca ao redor da foto */}
      <div
        style={{
          border: "8px solid #FFFFFF",
          backgroundColor: "#111",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="w-full flex items-center justify-center relative"
          style={{
            background: photo.image ? "transparent" : "#111",
            minHeight: photo.image ? "auto" : "400px",
            maxHeight: photo.image ? "none" : "400px",
          }}
        >
          {photo.image ? (
            <ImageWithFallback
              src={photo.image}
              alt={photo.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          ) : (
            <>
              <div
                className="absolute bottom-4 left-4 w-3 h-3 rounded-full opacity-80"
                style={{ backgroundColor: photo.accent }}
              />
              <div className="flex flex-col items-center gap-3 opacity-20 px-8 text-center">
                <div
                  className="w-12 h-12 rounded-full border border-white/30"
                  style={{
                    backgroundColor: photo.accent,
                    opacity: 0.4,
                  }}
                />
                <p
                  style={{
                    color: "#F0EDE6",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  foto {photo.id}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Botão expansivo preto */}
      <button
        onClick={onToggle}
        aria-label={
          isExpanded ? "Ocultar descrição" : "Ver descrição"
        }
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#0F0F0F",
          color: "#F0EDE6",
          border: "2px solid #F0EDE6",
          padding: "0",
          marginTop: "16px",
          marginLeft: "auto",
          marginRight: "auto",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          borderRadius: "2px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1B2B4B";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#0F0F0F";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <span
          style={{
            transform: isExpanded
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "transform 0.3s ease",
            display: "inline-block",
            lineHeight: 1,
          }}
        >
          {isExpanded ? "−" : "☰"}
        </span>
      </button>

      {/* Área expansível com descrição */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          overflow: "hidden",
          backgroundColor: "#E6E2DA",
          marginTop: isExpanded ? "8px" : "0",
        }}
      >
        <div style={{ padding: "20px" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#3A3A3A",
              fontSize: "14px",
              lineHeight: "1.7",
            }}
          >
            {photo.caption}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [expandedPhoto, setExpandedPhoto] = useState<
    number | null
  >(null);

  // Refs to each photo card DOM node
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    },
    [],
  );

  // IntersectionObserver — updates activePhoto as user scrolls gallery
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActivePhoto(i);
        },
        { threshold: 0.5 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll to a photo card when thumbnail is clicked
  const handleThumbnailSelect = (i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setActivePhoto(i);
  };

  return (
    /* MARKER-MAKE-KIT-INVOKED — no @make-kits package present in this project */
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "#F0EDE6",
        fontFamily: "'DM Sans', sans-serif",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-4"
        style={{
          backgroundColor: "#F0EDE6",
          borderBottom: "1px solid rgba(27,43,75,0.12)",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "15px",
              color: "#0F0F0F",
              letterSpacing: "-0.01em",
            }}
          >
            O Calor{" "}
            <em
              style={{ color: "#1B2B4B", fontStyle: "italic" }}
            >
              Ausente
            </em>
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            padding: "4px",
            cursor: "pointer",
          }}
        >
          <div
            className="flex flex-col gap-1.5"
            style={{ width: "22px" }}
          >
            <span
              style={{
                display: "block",
                height: "1px",
                backgroundColor: "#0F0F0F",
                transition: "transform 0.2s",
                transformOrigin: "center",
                transform: menuOpen
                  ? "translateY(5px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1px",
                backgroundColor: "#0F0F0F",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1px",
                backgroundColor: "#0F0F0F",
                transition: "transform 0.2s",
                transformOrigin: "center",
                transform: menuOpen
                  ? "translateY(-5px) rotate(-45deg)"
                  : "none",
              }}
            />
          </div>
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-16"
          style={{ backgroundColor: "#F0EDE6" }}
        >
          {[
            { label: "Conceito", href: "#conceito" },
            { label: "Galeria", href: "#galeria" },
            { label: "Exposição", href: "#exposicao" },
            { label: "Inspirações", href: "#inspiracoes" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                color: "#0F0F0F",
                padding: "20px 24px",
                borderBottom: "1px solid rgba(27,43,75,0.1)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section
        style={{
          backgroundColor: "#0F0F0F",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-20%",
            width: "160%",
            height: "100%",
            background:
              "linear-gradient(135deg, transparent 35%, rgba(240,237,230,0.04) 45%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-20%",
            width: "160%",
            height: "100%",
            background:
              "linear-gradient(135deg, transparent 48%, rgba(240,237,230,0.07) 53%, transparent 58%)",
            pointerEvents: "none",
          }}
        />

        <div className="px-6 pb-10 pt-10 relative z-10">
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#8A8A8A",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "32px",
            }}
          >
            FOTOGRAFIA NA INDUSTRIA CRIATIVA - PUCRS
          </p>

          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 0",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#F0EDE6",
                  fontSize: "clamp(52px, 18vw, 80px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                O Calor
              </h1>
            </div>
            <br />
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#F0EDE6",
                padding: "6px 12px 6px 0",
                marginLeft: "24px",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#0F0F0F",
                  fontSize: "clamp(52px, 18vw, 80px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Ausente
              </h1>
            </div>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#8A8A8A",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Bárbara · Carlos · Julia · Laura · Rafael
          </p>
        </div>
      </section>

      {/* ── CONCEITO ── */}
      <section
        id="conceito"
        style={{
          backgroundColor: "#F0EDE6",
          padding: "64px 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "#1B2B4B",
              }}
            />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1B2B4B",
              }}
            >
              Conceito
            </p>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 8vw, 40px)",
              color: "#0F0F0F",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: "28px",
            }}
          >
            A ausência que deixa{" "}
            <em style={{ color: "#1B2B4B" }}>marca</em>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#3A3A3A",
              fontSize: "15px",
              lineHeight: "1.8",
              marginBottom: "20px",
            }}
          >
            A proposta do trabalho é retratar a{" "}
            <strong>ausência parental na infância</strong> e os
            impactos emocionais que isso pode causar. As
            fotografias transmitem sentimentos como solidão,
            vazio e vulnerabilidade através de imagens sensíveis
            e simbólicas.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#3A3A3A",
              fontSize: "15px",
              lineHeight: "1.8",
              marginBottom: "20px",
            }}
          >
            O ensaio é feito em <strong>preto e branco</strong>,
            utilizando luz, sombra e expressão para intensificar
            as emoções. Cada foto contém apenas um ponto de cor
            — símbolo que destaca elementos importantes da
            narrativa.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#3A3A3A",
              fontSize: "15px",
              lineHeight: "1.8",
            }}
          >
            As imagens compõem uma exposição fotográfica de
            cunho social sobre{" "}
            <strong>vulnerabilidade infantil</strong>.
          </p>
        </motion.div>
      </section>

      {/* ── THUMBNAIL STRIP (positioned right after Conceito) ── */}
      {!menuOpen && (
        <ThumbnailStrip
          photos={exhibitionPhotos}
          activeIndex={activePhoto}
          onSelect={handleThumbnailSelect}
        />
      )}

      {/* ── GALERIA ── */}
      <section
        id="galeria"
        style={{ backgroundColor: "#F0EDE6", paddingTop: "0" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column" }}
        >
          {exhibitionPhotos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              cardRef={setCardRef(i)}
              isExpanded={expandedPhoto === i}
              onToggle={() =>
                setExpandedPhoto(expandedPhoto === i ? null : i)
              }
            />
          ))}
        </div>
      </section>

      {/* ── EXPOSIÇÃO PRESENCIAL ── */}
      <section
        id="exposicao"
        style={{
          backgroundColor: "#1B2B4B",
          padding: "64px 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "#F0EDE6",
                opacity: 0.4,
              }}
            />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#F0EDE6",
                opacity: 0.6,
              }}
            >
              Exposição Presencial
            </p>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 8vw, 38px)",
              color: "#F0EDE6",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: "28px",
            }}
          >
            Visite a nossa{" "}
            <em style={{ opacity: 0.7 }}>exposição</em>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#D0CCC4",
              fontSize: "15px",
              lineHeight: "1.8",
              marginBottom: "36px",
            }}
          >
            A exposição{" "}
            <strong style={{ color: "#F0EDE6" }}>
              O Calor Ausente
            </strong>{" "}
            pode ser vivenciada presencialmente. As seis
            fotografias em preto e branco, cada uma com seu
            ponto de cor simbólico, convidam o visitante a
            refletir sobre a vulnerabilidade infantil e a
            ausência parental.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: "📍",
                label: "Local",
                value: "FAMECOS, PUCRS",
              },
              {
                icon: "🕐",
                label: "Horário",
                value: "8h · 11 de junho",
              },
              {
                icon: "♿",
                label: "Acessibilidade",
                value: "Espaço acessível a todos os públicos",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: "rgba(240,237,230,0.07)",
                  border: "1px solid rgba(240,237,230,0.12)",
                  borderRadius: "4px",
                  padding: "16px 20px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{ fontSize: "16px", marginTop: "1px" }}
                >
                  {item.icon}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#F0EDE6",
                      opacity: 0.5,
                      marginBottom: "2px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "#F0EDE6",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── INSPIRAÇÕES ── */}
      <section
        id="inspiracoes"
        style={{
          backgroundColor: "#F0EDE6",
          padding: "64px 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "#1B2B4B",
              }}
            />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1B2B4B",
              }}
            >
              Em quem nos inspiramos
            </p>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px, 7vw, 36px)",
              color: "#0F0F0F",
              fontWeight: 400,
              marginBottom: "36px",
            }}
          >
            Duas visões,{" "}
            <em style={{ color: "#1B2B4B" }}>um ensaio</em>
          </h2>

          <div className="flex flex-col gap-6">
            {[
              {
                name: "Irene Santos",
                description:
                  "Fotografa de forma sensível e espontânea, valorizando emoções e momentos naturais. Seu olhar é delicado e frequentemente trabalha em preto e branco.",
                trait: "Sensível · Espontâneo · P&B",
              },
              {
                name: "Walter Firmo",
                description:
                  "Conhecido pelas fotos cheias de cores vibrantes e retratos marcantes. Seus trabalhos têm muita expressão e personalidade.",
                trait: "Expressivo · Vibrante · Marcante",
              },
            ].map((p) => (
              <div
                key={p.name}
                style={{
                  backgroundColor: "#E6E2DA",
                  borderLeft: "3px solid #1B2B4B",
                  padding: "24px 20px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "20px",
                    color: "#0F0F0F",
                    fontWeight: 400,
                    marginBottom: "10px",
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "#3A3A3A",
                    lineHeight: "1.7",
                    marginBottom: "12px",
                  }}
                >
                  {p.description}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "#1B2B4B",
                    textTransform: "uppercase",
                  }}
                >
                  {p.trait}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: "#0F0F0F",
          padding: "40px 24px 48px",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid rgba(240,237,230,0.1)",
            paddingBottom: "28px",
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              color: "#F0EDE6",
              fontWeight: 400,
            }}
          >
            O Calor{" "}
            <em style={{ color: "#8A9AB4" }}>Ausente</em>
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5A5A5A",
              marginTop: "6px",
            }}
          >
            FOTOGRAFIA NA INDUSTRIA CRIATIVA - PUCRS
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#5A5A5A",
            }}
          >
            Grupo
          </p>
          {[
            "Bárbara Valério Jardim",
            "Carlos Alberto Lemos Ott",
            "Júlia Bernardes Madruga",
            "Laura Rajchenberg",
            "Rafael de Oliveira Nogueira",
          ].map((name) => (
            <p
              key={name}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "#D0CCC4",
              }}
            >
              {name}
            </p>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: "#3A3A3A",
            marginTop: "40px",
          }}
        >
          © 2026 O Calor Ausente
        </p>
      </footer>

      {/* Hide native scrollbar from thumbnail strip */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        body { overflow-x: hidden; }
      `}</style>
    </div>
  );
}