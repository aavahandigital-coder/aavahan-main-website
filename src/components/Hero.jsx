import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ChevronDown } from "lucide-react";

const LETTERS = "AAVAHAN".split("");

/* ============================= */
/* Responsive hook               */
/* ============================= */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

/* ============================= */
/* Petal Canvas                  */
/* ============================= */
function PetalCanvas({ isMobile }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(212,175,106,.40)",
      "rgba(200,149,108,.40)",
      "rgba(248,231,231,.75)",
      "rgba(237,224,212,.55)",
    ];

    const count = isMobile ? 20 : 40;
    const petals = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 9 + 4,
      speed: Math.random() * 1 + 0.25,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      alpha: Math.random() * 0.4 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animation;
    function render() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 0.45;
        p.angle += p.spin;
        if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.42, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animation = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

/* ============================= */
/* Ornament                      */
/* ============================= */
function Ornament({ style }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      style={{ ...style, position: "absolute", pointerEvents: "none" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="100" cy="100" r="72" stroke="#D4AF6A" strokeWidth=".5"
        strokeDasharray="5 10" opacity=".35" fill="none" />
      <circle cx="100" cy="100" r="52" stroke="#C8956C" strokeWidth=".4"
        opacity=".25" fill="none" />
      {[0, 60, 120, 180, 240, 300].map((angle, index) => (
        <g key={index} transform={`rotate(${angle} 100 100)`}>
          <ellipse cx="100" cy="38" rx="7" ry="17" fill="#D4AF6A" opacity=".18" />
        </g>
      ))}
      <circle cx="100" cy="100" r="6" fill="#D4AF6A" opacity=".20" />
    </motion.svg>
  );
}

/* ============================= */
/* Typewriter Word               */
/* ============================= */
function TypewriterWord({ onComplete, fontSize }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [shineActive, setShineActive] = useState(false);
  const [floatActive, setFloatActive] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = [];
    LETTERS.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleCount(i + 1);
          if (i === LETTERS.length - 1) {
            timers.push(setTimeout(() => {
              setShineActive(true);
              timers.push(setTimeout(() => {
                setShineActive(false);
                setFloatActive(true);
                setDone(true);
                onComplete && onComplete();
              }, 1000));
            }, 300));
          }
        }, 600 + i * 150)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
    }}>
      {LETTERS.map((letter, index) => (
        <AnimatePresence key={index}>
          {index < visibleCount && (
            <motion.span
              initial={{ opacity: 0, y: 40, rotateX: -90, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 600,
                fontSize,
                color: "var(--deep-rose)",
                position: "relative",
                display: "inline-block",
                marginRight: index !== LETTERS.length - 1 ? "0.02em" : "0",
                textShadow: "0 6px 30px rgba(200,149,108,.18)",
                overflow: "hidden",
                lineHeight: 1.1,
              }}
            >
              {shineActive && (
                <motion.span
                  initial={{ x: "-180%", opacity: 0 }}
                  animate={{ x: "220%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, delay: index * 0.04, ease: "linear" }}
                  style={{
                    position: "absolute", left: 0, top: 0,
                    width: "100%", height: "100%",
                    background: "linear-gradient(90deg,transparent,rgba(255,255,255,.85),transparent)",
                    mixBlendMode: "screen",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />
              )}
              <motion.span
                style={{ display: "inline-block" }}
                animate={floatActive ? { y: [0, -(5 + index * 0.9), 0] } : {}}
                transition={floatActive ? {
                  duration: 2.8 + index * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.18,
                } : {}}
                whileHover={done ? { y: -10, color: "#D4AF6A", transition: { duration: 0.25 } } : {}}
              >
                {letter}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      ))}

      {visibleCount < LETTERS.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 300,
            fontSize,
            color: "var(--soft-gold)",
            marginLeft: "0.04em",
            lineHeight: 1.1,
          }}
        >
          |
        </motion.span>
      )}
    </div>
  );
}

/* ============================= */
/* Scroll Block                  */
/* ============================= */
function ScrollBlock({ fontSize, isMobile }) {
  const [scrollPx, setScrollPx] = useState(0);

  useEffect(() => {
    function onScroll() { setScrollPx(window.scrollY); }
    window.addEventListener("scroll", onScroll, { passive: true });
    // fire once on mount in case already scrolled
    setScrollPx(window.scrollY);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tighter thresholds on mobile (less scroll distance available)
  const SPREAD_END  = isMobile ? 120 : 180;
  const FADE_START  = isMobile ?  80 : 120;
  const FADE_END    = isMobile ? 160 : 240;
  const TAG_START   = isMobile ? 140 : 200;
  const TAG_END     = isMobile ? 230 : 320;

  function lerp(px, start, end, from, to) {
    if (px <= start) return from;
    if (px >= end) return to;
    return from + ((px - start) / (end - start)) * (to - from);
  }

  const spacingValue  = lerp(scrollPx, 0, SPREAD_END, 0.02, isMobile ? 0.22 : 0.38);
  const letterSpacing = `${spacingValue}em`;
  const scaleValue    = lerp(scrollPx, 0, FADE_END, 1, isMobile ? 1.06 : 1.14);
  const lettersOpacity = lerp(scrollPx, FADE_START, FADE_END, 1, 0);
  const lettersY       = lerp(scrollPx, FADE_START, FADE_END, 0, isMobile ? -50 : -80);
  const tagOpacity     = lerp(scrollPx, TAG_START, TAG_END, 0, 1);
  const tagY           = lerp(scrollPx, TAG_START, TAG_END, 30, 0);

  return (
    <>
      {/* AAVAHAN letters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          opacity: lettersOpacity,
          transform: `translateY(${lettersY}px) scale(${scaleValue})`,
          marginBottom: isMobile ? 16 : 22,
          willChange: "transform, opacity",
        }}
      >
        {LETTERS.map((letter, index) => (
          <motion.span
            key={index}
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 600,
              fontSize,
              color: "var(--deep-rose)",
              letterSpacing,
              position: "relative",
              display: "inline-block",
              textShadow: "0 6px 30px rgba(200,149,108,.18)",
              overflow: "hidden",
              lineHeight: 1.1,
            }}
            animate={{ y: [0, -(3 + index * 0.8), 0] }}
            transition={{
              duration: 3 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.18,
            }}
            whileHover={{ y: -10, color: "#D4AF6A", transition: { duration: 0.25 } }}
          >
            <motion.span
              style={{
                position: "absolute", left: 0, top: 0,
                width: "100%", height: "100%",
                background: "linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
              animate={{ x: ["-180%", "220%"] }}
              transition={{ duration: 5, delay: index * 0.3, repeat: Infinity, ease: "linear" }}
            />
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          marginBottom: isMobile ? 16 : 24,
          pointerEvents: tagOpacity > 0.05 ? "auto" : "none",
          willChange: "transform, opacity",
          minHeight: isMobile ? "2rem" : "2.5rem",
        }}
      >
        <div
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: isMobile ? "clamp(1.1rem,4.5vw,1.4rem)" : "clamp(1.4rem,3vw,2rem)",
            fontWeight: 400,
            letterSpacing: ".06em",
            color: "var(--rose-gold)",
            lineHeight: 1.4,
            padding: isMobile ? "0 12px" : "0",
          }}
        >
          Invitations That Bring Hearts Together
        </div>
      </div>
    </>
  );
}

/* ============================= */
/* Hero                          */
/* ============================= */
export default function Hero() {
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showScrollVersion, setShowScrollVersion] = useState(false);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1.04 : 1.08]);
  const heroBlur  = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(2px)"]);

  const uiReady = typewriterDone;

  useEffect(() => {
    if (typewriterDone) {
      const t = setTimeout(() => setShowScrollVersion(true), 800);
      return () => clearTimeout(t);
    }
  }, [typewriterDone]);

  // Font size: big on desktop, fits in one line on mobile
  // On a 390px screen: 7 letters × ~42px each = ~294px — safe with 2px margins
  const fontSize = isMobile
    ? "clamp(2.6rem,10.5vw,3.4rem)"
    : "clamp(4rem,9vw,8.5rem)";

  // Logo size
  const logoSize = isMobile ? 90 : 130;

  return (
    <motion.section
      style={{
        position: "relative",
        minHeight: "100vh",
        minHeight: "100dvh", // handles mobile browser chrome
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--ivory)",
        scale: heroScale,
        filter: heroBlur,
      }}
    >
      <PetalCanvas isMobile={isMobile} />

      {/* Ambient blobs — smaller on mobile */}
      <div style={{
        position: "absolute", top: "18%", left: isMobile ? "-10%" : "15%",
        width: isMobile ? 260 : 420, height: isMobile ? 260 : 420,
        background: "rgba(248,231,231,.45)",
        borderRadius: "50%", filter: "blur(70px)",
      }} />
      <div style={{
        position: "absolute", bottom: "18%", right: isMobile ? "-10%" : "15%",
        width: isMobile ? 220 : 340, height: isMobile ? 220 : 340,
        background: "rgba(237,224,212,.5)",
        borderRadius: "50%", filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", top: "12%", left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? 300 : 520, height: isMobile ? 300 : 520,
        background: "rgba(200,149,108,.08)",
        borderRadius: "50%", filter: "blur(90px)",
      }} />

      {/* Ornaments — hidden on very small screens, smaller on mobile */}
      {!isMobile && (
        <>
          <Ornament style={{ width: 150, top: 60, left: 30, opacity: 0.6 }} />
          <Ornament style={{ width: 110, bottom: 60, right: 30, opacity: 0.4 }} />
        </>
      )}
      {isMobile && (
        <>
          <Ornament style={{ width: 70, top: 20, right: 10, opacity: 0.35 }} />
        </>
      )}

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: isMobile ? "80px 16px 100px" : "0 24px",
          maxWidth: 900,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo */}
        <motion.img
          src="/logo.png"
          alt="logo"
          className="hero-logo"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: logoSize }}
        />

        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? 6 : 10,
            marginBottom: isMobile ? 20 : 30,
          }}
        >
          <div style={{ width: isMobile ? 24 : 40, height: 1, background: "rgba(212,175,106,.55)", flexShrink: 0 }} />
          <span style={{
            fontFamily: "DM Sans",
            fontSize: isMobile ? 9 : 12,
            letterSpacing: isMobile ? "2.5px" : "4px",
            color: "var(--soft-gold)",
            display: "flex",
            alignItems: "center",
            gap: 5,
            whiteSpace: isMobile ? "normal" : "nowrap",
            textAlign: "center",
            lineHeight: 1.5,
          }}>
            <Sparkles size={isMobile ? 9 : 12} style={{ flexShrink: 0 }} />
            {isMobile ? "ELEGANT CELEBRATION EXPERIENCES" : "CRAFTING ELEGANT CELEBRATION EXPERIENCES"}
          </span>
          <div style={{ width: isMobile ? 24 : 40, height: 1, background: "rgba(212,175,106,.55)", flexShrink: 0 }} />
        </motion.div>

        {/* AAVAHAN — typewriter → scroll phases */}
        {!showScrollVersion ? (
          <div style={{
            marginBottom: isMobile ? 16 : 22,
            minHeight: isMobile ? "3.4rem" : "clamp(4rem,9vw,8.5rem)",
          }}>
            <TypewriterWord
              onComplete={() => setTypewriterDone(true)}
              fontSize={fontSize}
            />
          </div>
        ) : (
          <ScrollBlock fontSize={fontSize} isMobile={isMobile} />
        )}

        {/* Gold Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: uiReady ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            width: isMobile ? 100 : 140,
            height: 2,
            background: "linear-gradient(to right,transparent,#D4AF6A,transparent)",
            margin: isMobile ? "0 auto 20px" : "0 auto 28px",
            transformOrigin: "center",
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: uiReady ? 1 : 0, y: uiReady ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "DM Sans",
            fontSize: isMobile ? "clamp(.85rem,3.5vw,.95rem)" : "clamp(.95rem,2vw,1.08rem)",
            color: "var(--text-mid)",
            lineHeight: 1.85,
            maxWidth: 760,
            margin: isMobile ? "0 auto 32px" : "0 auto 42px",
            padding: isMobile ? "0 8px" : "0 20px",
          }}
        >
          Beautiful invitation websites, digital cards and cinematic celebration
          experiences crafted with timeless elegance.
          {!isMobile && (
            <>
              <br />
              <span className="hero-line-2">Designed to capture emotions, preserve memories</span>
              <br />
              <span className="hero-line-3">and bring hearts together beautifully.</span>
            </>
          )}
          {isMobile && (
            <> Designed to capture emotions and bring hearts together beautifully.</>
          )}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: uiReady ? 1 : 0, y: uiReady ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? 12 : 18,
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/portfolio"
            className="btn-primary"
            style={{
              padding: isMobile ? "13px 26px" : "15px 34px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              minWidth: isMobile ? "140px" : "auto",
              textAlign: "center",
            }}
          >
            View Portfolio
          </Link>
          <a
            href="#services"
            className="btn-secondary"
            style={{
              padding: isMobile ? "13px 26px" : "15px 34px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              minWidth: isMobile ? "140px" : "auto",
              textAlign: "center",
            }}
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: uiReady ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: "absolute",
          bottom: isMobile ? 20 : 35,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={isMobile ? 18 : 22} color="rgba(200,149,108,.65)" />
        </motion.div>
      </motion.div>

      {/* Floating gold particles — fewer on mobile */}
      {Array.from({ length: isMobile ? 8 : 18 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
            y: [-20, isMobile ? -140 : -220],
            x: [Math.random() * 30, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            left: `${20 + Math.random() * 60}%`,
            bottom: "12%",
            width: isMobile ? 3 : 4,
            height: isMobile ? 3 : 4,
            borderRadius: "50%",
            background: "#D4AF6A",
            filter: "blur(.3px)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Decorative radial glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: "absolute",
          width: isMobile ? 380 : 700,
          height: isMobile ? 380 : 700,
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,106,.08), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </motion.section>
  );
}