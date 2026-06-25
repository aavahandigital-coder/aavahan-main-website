import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ChevronDown } from "lucide-react";

const LETTERS = "AAVAHAN".split("");

/* ============================= */
/* Petal Canvas                  */
/* ============================= */

function PetalCanvas() {
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

    const petals = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 11 + 5,
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
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
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

function TypewriterWord({ onComplete }) {
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
      {LETTERS.map((letter, index) => (
        <AnimatePresence key={index}>
          {index < visibleCount && (
            <motion.span
              initial={{ opacity: 0, y: 60, rotateX: -90, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 600,
                fontSize: "clamp(4rem,11vw,8.5rem)",
                color: "var(--deep-rose)",
                position: "relative",
                display: "inline-block",
                marginRight: index !== LETTERS.length - 1 ? "0.03em" : "0",
                textShadow: "0 8px 40px rgba(200,149,108,.18)",
                overflow: "hidden",
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
                animate={floatActive ? { y: [0, -(6 + index * 1.2), 0] } : {}}
                transition={floatActive ? {
                  duration: 2.8 + index * 0.35, repeat: Infinity,
                  ease: "easeInOut", delay: index * 0.18,
                } : {}}
                whileHover={done ? { y: -12, color: "#D4AF6A", transition: { duration: 0.25 } } : {}}
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
            fontSize: "clamp(4rem,11vw,8.5rem)",
            color: "var(--soft-gold)",
            marginLeft: "0.05em",
            lineHeight: 1,
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
/* Uses raw px scroll so it works*/
/* regardless of page height or  */
/* overflow clipping             */
/* ============================= */

function ScrollBlock() {
  // Track raw scroll in pixels
  const [scrollPx, setScrollPx] = useState(0);

  useEffect(() => {
    function onScroll() {
      setScrollPx(window.scrollY);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Thresholds in pixels — tune these to taste
  // Spread starts at 0px, max at 180px scroll
  // Letters dissolve between 120px–240px
  // Tagline appears between 200px–320px

  const SPREAD_START = 0;
  const SPREAD_END = 180;
  const FADE_START = 120;
  const FADE_END = 240;
  const TAG_START = 200;
  const TAG_END = 320;

  function lerp(px, start, end, from, to) {
    if (px <= start) return from;
    if (px >= end) return to;
    const t = (px - start) / (end - start);
    return from + t * (to - from);
  }

  const spacingValue = lerp(scrollPx, SPREAD_START, SPREAD_END, 0.03, 0.38);
  const letterSpacing = `${spacingValue}em`;

  const scaleValue = lerp(scrollPx, SPREAD_START, FADE_END, 1, 1.14);

  const lettersOpacity = lerp(scrollPx, FADE_START, FADE_END, 1, 0);
  const lettersY = lerp(scrollPx, FADE_START, FADE_END, 0, -80);

  const tagOpacity = lerp(scrollPx, TAG_START, TAG_END, 0, 1);
  const tagY = lerp(scrollPx, TAG_START, TAG_END, 40, 0);

  return (
    <>
      {/* AAVAHAN letters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: lettersOpacity,
          transform: `translateY(${lettersY}px) scale(${scaleValue})`,
          marginBottom: 22,
          transition: "none",
        }}
      >
        {LETTERS.map((letter, index) => (
          <motion.span
            key={index}
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 600,
              fontSize: "clamp(4rem,11vw,8.5rem)",
              color: "var(--deep-rose)",
              letterSpacing,
              position: "relative",
              display: "inline-block",
              textShadow: "0 8px 40px rgba(200,149,108,.18)",
              overflow: "hidden",
            }}
            animate={{ y: [0, -(4 + index * 1.0), 0] }}
            transition={{
              duration: 3 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.18,
            }}
            whileHover={{ y: -12, color: "#D4AF6A", transition: { duration: 0.25 } }}
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

      {/* Tagline — driven by raw scroll px */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          marginBottom: 24,
          pointerEvents: tagOpacity > 0.1 ? "auto" : "none",
        }}
      >
        <div
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "clamp(1.4rem,3vw,2rem)",
            fontWeight: 400,
            letterSpacing: ".08em",
            color: "var(--rose-gold)",
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

  // Hero zoom — safe to use scrollYProgress here since it's on the section itself
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(2px)"]);

  const uiReady = typewriterDone;

  useEffect(() => {
    if (typewriterDone) {
      const t = setTimeout(() => setShowScrollVersion(true), 800);
      return () => clearTimeout(t);
    }
  }, [typewriterDone]);

  return (
    <motion.section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--ivory)",
        scale: heroScale,
        filter: heroBlur,
      }}
    >
      <PetalCanvas />

      <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: 420, height: 420,
        background: "rgba(248,231,231,.45)",
        borderRadius: "50%", filter: "blur(90px)",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "15%",
        width: 340, height: 340,
        background: "rgba(237,224,212,.5)",
        borderRadius: "50%", filter: "blur(80px)",
      }} />
      <div style={{
        position: "absolute", top: "15%", left: "50%",
        transform: "translateX(-50%)",
        width: 520, height: 520,
        background: "rgba(200,149,108,.08)",
        borderRadius: "50%", filter: "blur(120px)",
      }} />

      <Ornament style={{ width: 150, top: 60, left: 30, opacity: 0.6 }} />
      <Ornament style={{ width: 110, bottom: 60, right: 30, opacity: 0.4 }} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 900,
          margin: "0 auto",
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
            gap: 10,
            marginBottom: 30,
          }}
        >
          <div style={{ width: 40, height: 1, background: "rgba(212,175,106,.55)" }} />
          <span style={{
            fontFamily: "DM Sans",
            fontSize: 12,
            letterSpacing: "4px",
            color: "var(--soft-gold)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            <Sparkles size={12} />
            CRAFTING ELEGANT CELEBRATION EXPERIENCES
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(212,175,106,.55)" }} />
        </motion.div>

        {/* AAVAHAN — typewriter phase, then scroll phase */}
        {!showScrollVersion ? (
          <div style={{ marginBottom: 22, minHeight: "clamp(4rem,11vw,8.5rem)" }}>
            <TypewriterWord onComplete={() => setTypewriterDone(true)} />
          </div>
        ) : (
          <ScrollBlock />
        )}

        {/* Gold Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: uiReady ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            width: 140,
            height: 2,
            background: "linear-gradient(to right,transparent,#D4AF6A,transparent)",
            margin: "0 auto 28px",
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
            fontSize: "clamp(.95rem,2vw,1.08rem)",
            color: "var(--text-mid)",
            lineHeight: 1.9,
            maxWidth: 760,
            margin: "0 auto 42px",
            padding: "0 20px",
          }}
        >
          Beautiful invitation websites, digital cards and cinematic celebration
          experiences crafted with timeless elegance.
          <br />
          <span className="hero-line-2">Designed to capture emotions, preserve memories</span>
          <br />
          <span className="hero-line-3">and bring hearts together beautifully.</span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: uiReady ? 1 : 0, y: uiReady ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <Link to="/portfolio" className="btn-primary"
            style={{ padding: "15px 34px", borderRadius: 999, textDecoration: "none" }}>
            View Portfolio
          </Link>
          <a href="#services" className="btn-secondary"
            style={{ padding: "15px 34px", borderRadius: 999, textDecoration: "none" }}>
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
          bottom: 35,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} color="rgba(200,149,108,.65)" />
        </motion.div>
      </motion.div>

      {/* Floating gold particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
            y: [-20, -220],
            x: [Math.random() * 40, Math.random() * 140 - 70],
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
            width: 4, height: 4,
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
          width: 700, height: 700,
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,106,.08), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </motion.section>
  );
}