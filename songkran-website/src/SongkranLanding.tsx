import { useEffect, useRef, useState } from "react";
import { Poster_1, Poster_2 } from "./assets";

// ─── THEME TOKENS ───────────────────────────────────────────────
const themes = {
  dark: {
    bg:             "#0A0A0A",
    bgHero:         "#0A0A0A",
    bgSection:      "rgba(245,200,0,0.04)",
    bgCard:         "rgba(245,200,0,0.04)",
    bgCardHover:    "rgba(245,200,0,0.08)",
    bgFooter:       "#050505",
    text:           "#F5F0E8",
    textMuted:      "rgba(245,240,232,0.5)",
    textSub:        "rgba(245,240,232,0.6)",
    border:         "rgba(245,200,0,0.12)",
    borderSection:  "rgba(245,200,0,0.1)",
    borderTopBar:   "rgba(245,200,0,0.2)",
    tagBorder:      "rgba(245,240,232,0.2)",
    tagColor:       "rgba(245,240,232,0.7)",
    heroGlow1:      "rgba(245,200,0,0.12)",
    heroGlow2:      "rgba(212,160,23,0.08)",
    heroTextShadow: "8px 8px 0px rgba(0,0,0,0.5), 0 0 80px rgba(245,200,0,0.3)",
    grainOpacity:   "0.4",
    showCardBg:     "linear-gradient(135deg,rgba(245,200,0,0.08),rgba(245,200,0,0.02))",
    showCardBorder: "rgba(245,200,0,0.15)",
    sukhumvitBg:    "rgba(21,101,192,0.15)",
    scrollHintClr:  "rgba(245,240,232,0.4)",
    ctaBtnBg:       "#F5C800",
    ctaBtnClr:      "#0A0A0A",
    cardShadow:     "none",
    themeBtnBg:     "rgba(245,200,0,0.1)",
    themeBtnBorder: "rgba(245,200,0,0.4)",
    themeBtnClr:    "#F5C800",
  },
  light: {
    bg:             "#FFFBF0",
    bgHero:         "#FFF8E1",
    bgSection:      "rgba(245,200,0,0.06)",
    bgCard:         "#FFFFFF",
    bgCardHover:    "#FFFDE7",
    bgFooter:       "#1A1200",
    text:           "#1A1200",
    textMuted:      "rgba(26,18,0,0.5)",
    textSub:        "rgba(26,18,0,0.65)",
    border:         "rgba(180,130,0,0.2)",
    borderSection:  "rgba(180,130,0,0.15)",
    borderTopBar:   "rgba(180,130,0,0.2)",
    tagBorder:      "rgba(26,18,0,0.18)",
    tagColor:       "rgba(26,18,0,0.65)",
    heroGlow1:      "rgba(245,200,0,0.3)",
    heroGlow2:      "rgba(212,160,23,0.18)",
    heroTextShadow: "4px 4px 0px rgba(180,130,0,0.2), 0 0 50px rgba(245,200,0,0.2)",
    grainOpacity:   "0.12",
    showCardBg:     "linear-gradient(135deg,rgba(245,200,0,0.1),rgba(212,160,23,0.04))",
    showCardBorder: "rgba(180,130,0,0.2)",
    sukhumvitBg:    "rgba(21,101,192,0.06)",
    scrollHintClr:  "rgba(26,18,0,0.35)",
    ctaBtnBg:       "#0A0A0A",
    ctaBtnClr:      "#F5C800",
    cardShadow:     "0 2px 16px rgba(0,0,0,0.07)",
    themeBtnBg:     "rgba(26,18,0,0.06)",
    themeBtnBorder: "rgba(26,18,0,0.2)",
    themeBtnClr:    "#1A1200",
  },
} as const;

type Theme = typeof themes.dark;

// ─── DATA ───────────────────────────────────────────────────────
const workshops = [
  { num: "01", icon: "🍚", title: "Khao Tom Mud",         sub: "Sticky Rice & Banana Wrap" },
  { num: "02", icon: "🥗", title: "Som Tam",               sub: "Thai Papaya Salad Workshop" },
  { num: "03", icon: "🌸", title: "Flower Garland",        sub: "Traditional Phuang Malai Making" },
  { num: "04", icon: "💧", title: "Water Blessing Ritual", sub: "Song Nam Phra — Songkran Tradition" },
];
const shows = [
  { emoji: "🎶", name: "Mor Lam Performance", desc: "Join in and dance · Traditional northeastern Thai music & performance" },
  { emoji: "🥁", name: "Long Drum Dance",     desc: "Witness the ancient Glong Yao drum performance · Cultural spectacle" },
];
const highlights = [
  { icon: "👘", name: "Thai Costume",      desc: "Dress up in traditional Thai attire for stunning photos" },
  { icon: "🏪", name: "Thai Local Market", desc: "Browse vendors in authentic local market style" },
  { icon: "🍜", name: "Local Food & Fun",  desc: "Taste authentic Thai street food & flavors" },
  { icon: "💦", name: "Water Fight Zone",  desc: "Classic Songkran water battle — come ready to get wet!" },
];
const marqueeItems = ["SONGKRAN","BANGKOK","สงกรานต์","13–15 APRIL","CHAPTER MARKET","SUKHUMVIT 26"];

// ─── STYLES FACTORY ─────────────────────────────────────────────
function buildStyles(t: Theme, isDark: boolean): string {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:wght@300;400;600;700&family=Playfair+Display:ital@0;1&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }

  .songkran-root {
    background:${t.bg}; color:${t.text};
    font-family:'Kanit',sans-serif; overflow-x:hidden;
    transition:background 0.45s, color 0.45s;
  }

  /* ── THEME TOGGLE ── */
  .theme-toggle {
    position:fixed; top:890px; right:20px; z-index:1000;
    display:flex; align-items:center; gap:10px;
    padding:9px 18px;
    background:${t.themeBtnBg};
    border:1.5px solid ${t.themeBtnBorder};
    color:${t.themeBtnClr};
    font-family:'Kanit',sans-serif; font-size:12px;
    letter-spacing:2px; text-transform:uppercase;
    cursor:pointer; border-radius:40px;
    backdrop-filter:blur(14px);
    transition:all 0.3s; font-weight:600;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
  }
  .theme-toggle:hover {
    background:#F5C800; border-color:#F5C800;
    color:#0A0A0A; transform:scale(1.05);
    box-shadow:0 6px 28px rgba(245,200,0,0.35);
  }
  .toggle-track {
    width:38px; height:21px;
    background:${isDark ? "#F5C800" : "rgba(26,18,0,0.15)"};
    border-radius:11px; position:relative; transition:background 0.35s; flex-shrink:0;
  }
  .toggle-thumb {
    position:absolute; top:3.5px;
    left:${isDark ? "19px" : "3.5px"};
    width:14px; height:14px;
    background:${isDark ? "#0A0A0A" : "#F5C800"};
    border-radius:50%; transition:left 0.3s, background 0.3s;
  }
  .toggle-icon { font-size:14px; line-height:1; }

  /* ── HERO ── */
  .hero {
    position:relative; min-height:100vh;
    display:flex; flex-direction:column;
    justify-content:center; align-items:center;
    text-align:center; overflow:hidden;
    background:${t.bgHero}; transition:background 0.45s;
  }
  .hero-bg {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 60% 50% at 50% 30%, ${t.heroGlow1} 0%, transparent 70%),
      radial-gradient(ellipse 80% 80% at 50% 100%, ${t.heroGlow2} 0%, transparent 70%);
    z-index:0; transition:background 0.45s;
  }
  .hero-bg::after {
    content:''; position:absolute; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity:${t.grainOpacity};
  }
  .stripe { position:absolute; width:200%; height:6px; background:#F5C800; top:88px; left:-50%; transform:rotate(-2deg); opacity:0.9; z-index:1; }
  .stripe-2 { top:96px; opacity:0.3; }

  .top-bar {
    position:absolute; top:0; left:0; right:0;
    padding:20px 40px; display:flex; justify-content:space-between;
    align-items:center; z-index:10;
    border-bottom:1px solid ${t.borderTopBar}; transition:border-color 0.45s;
  }
  .top-bar-left  { font-size:11px; letter-spacing:3px; text-transform:uppercase; color:${t.textSub}; font-weight:300; }
  .top-bar-brand { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:4px; color:#F5C800; }
  .top-bar-right { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${t.textSub}; font-weight:300; }

  .hero-content { position:relative; z-index:5; padding:120px 20px 60px; }
  .thai-sub { font-size:clamp(18px,3vw,28px); font-weight:300; color:#F5C800; letter-spacing:4px; margin-bottom:10px; opacity:0; animation:fadeUp 0.8s 0.2s forwards; }
  .hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(90px,20vw,240px); line-height:0.85; letter-spacing:-2px; color:#F5C800; text-shadow:${t.heroTextShadow}; opacity:0; animation:fadeUp 0.8s 0.4s forwards; }
  .hero-title span { color:${t.text}; -webkit-text-stroke:2px #F5C800; transition:color 0.45s; }
  .hero-sub-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(40px,10vw,100px); letter-spacing:20px; color:${t.text}; margin-top:-10px; opacity:0; animation:fadeUp 0.8s 0.6s forwards; transition:color 0.45s; }
  .hero-year { font-family:'Bebas Neue',sans-serif; font-size:clamp(28px,5vw,56px); color:#F5C800; letter-spacing:8px; margin-top:20px; opacity:0; animation:fadeUp 0.8s 0.8s forwards; }
  .hero-date-badge { display:inline-block; margin-top:30px; padding:14px 40px; border:2px solid #F5C800; font-size:16px; letter-spacing:5px; text-transform:uppercase; color:#F5C800; font-weight:600; opacity:0; animation:fadeUp 0.8s 1.0s forwards; }
  .hero-date-badge::before,.hero-date-badge::after { content:'✦'; margin:0 12px; font-size:10px; }
  .hero-tags { display:flex; gap:20px; justify-content:center; flex-wrap:wrap; margin-top:40px; opacity:0; animation:fadeUp 0.8s 1.2s forwards; }
  .hero-tag { font-size:12px; letter-spacing:2px; text-transform:uppercase; color:${t.tagColor}; font-weight:300; padding:6px 16px; border:1px solid ${t.tagBorder}; border-radius:2px; transition:color 0.45s, border-color 0.45s; }

  .scroll-hint { position:absolute; bottom:30px; left:50%; transform:translateX(-50%); z-index:10; display:flex; flex-direction:column; align-items:center; gap:8px; opacity:0; animation:fadeIn 1s 2s forwards; }
  .scroll-hint span { font-size:10px; letter-spacing:3px; text-transform:uppercase; color:${t.scrollHintClr}; }
  .scroll-arrow { width:1px; height:50px; background:linear-gradient(to bottom,rgba(245,200,0,0.8),transparent); animation:scrollPulse 1.5s infinite; }

  /* ── POSTER SECTION ── */
  .poster-section {
    padding: 80px 40px;
    background: ${t.bg};
    max-width: 1200px;
    margin: 0 auto;
    transition: background 0.45s;
  }
  .poster-section-header {
    text-align: center;
    margin-bottom: 50px;
  }
  .poster-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }
  .poster-frame {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    transition: transform 0.45s, box-shadow 0.45s;
    cursor: pointer;
  }
  .poster-frame:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 32px 80px rgba(245,200,0,0.25), 0 20px 60px rgba(0,0,0,0.5);
  }
  .poster-frame img {
    width: 100%;
    height: auto;
    display: block;
  }
  .poster-frame::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid rgba(245,200,0,0.25);
    z-index: 1;
    pointer-events: none;
    transition: border-color 0.45s;
  }
  .poster-frame:hover::before {
    border-color: rgba(245,200,0,0.7);
  }
  .poster-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
    z-index: 2;
    transform: translateY(100%);
    transition: transform 0.4s;
  }
  .poster-frame:hover .poster-overlay {
    transform: translateY(0);
  }
  .poster-overlay-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 3px;
    color: #F5C800;
  }
  @media(max-width:600px) {
    .poster-grid { grid-template-columns: 1fr; }
    .poster-section { padding: 50px 20px; }
  }

  /* ── TICKET ── */
  .ticket-section { background:#F5C800; padding:60px 40px; display:flex; justify-content:center; align-items:center; gap:60px; flex-wrap:wrap; position:relative; overflow:hidden; }
  .ticket-section::before { content:'EARLY BIRD'; position:absolute; font-family:'Bebas Neue',sans-serif; font-size:200px; color:rgba(0,0,0,0.06); white-space:nowrap; top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
  .ticket-price-block { text-align:center; color:#0A0A0A; }
  .ticket-label { font-size:12px; letter-spacing:4px; text-transform:uppercase; font-weight:600; opacity:0.6; }
  .ticket-amount { font-family:'Bebas Neue',sans-serif; font-size:clamp(60px,12vw,120px); line-height:1; letter-spacing:-2px; color:#0A0A0A; }
  .ticket-currency { font-size:24px; font-weight:300; letter-spacing:3px; }
  .ticket-note { font-size:13px; opacity:0.6; letter-spacing:1px; color:#0A0A0A; }
  .ticket-divider { width:1px; height:100px; background:rgba(0,0,0,0.2); }
  .ticket-location { color:#0A0A0A; max-width:300px; }
  .ticket-location-label { font-size:11px; letter-spacing:4px; text-transform:uppercase; opacity:0.5; margin-bottom:8px; }
  .ticket-location-name { font-family:'Playfair Display',serif; font-size:28px; font-style:italic; line-height:1.2; margin-bottom:8px; }
  .ticket-location-addr { font-size:13px; opacity:0.6; letter-spacing:1px; line-height:1.6; }

  .cta-btn { display:inline-block; background:${t.ctaBtnBg}; color:${t.ctaBtnClr}; font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:5px; padding:18px 50px; text-decoration:none; position:relative; overflow:hidden; cursor:pointer; border:none; transition:color 0.3s; }
  .cta-btn::after { content:''; position:absolute; inset:0; background:#F5C800; transform:translateX(-100%); transition:transform 0.3s; }
  .cta-btn:hover { color:#0A0A0A; }
  .cta-btn:hover::after { transform:translateX(0); }
  .cta-btn span { position:relative; z-index:1; }

  /* ── PROGRAM ── */
  .program-section { padding:100px 40px; max-width:1200px; margin:0 auto; }
  .section-eyebrow { font-size:11px; letter-spacing:5px; text-transform:uppercase; color:#F5C800; margin-bottom:16px; display:flex; align-items:center; gap:16px; }
  .section-eyebrow::after { content:''; flex:1; max-width:60px; height:1px; background:#F5C800; opacity:0.4; }
  .section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(48px,8vw,96px); line-height:0.9; color:${t.text}; margin-bottom:60px; transition:color 0.45s; }

  /* ── WORKSHOPS ── */
  .workshops-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:2px; }
  .workshop-card { background:${t.bgCard}; border:1px solid ${t.border}; padding:36px 32px; position:relative; overflow:hidden; transition:all 0.4s; cursor:default; box-shadow:${t.cardShadow}; }
  .workshop-card::before { content:''; position:absolute; top:0; left:0; width:3px; height:0; background:#F5C800; transition:height 0.4s; }
  .workshop-card:hover { background:${t.bgCardHover}; transform:translateY(-4px); box-shadow:0 8px 30px rgba(0,0,0,0.1); }
  .workshop-card:hover::before { height:100%; }
  .workshop-num { font-family:'Bebas Neue',sans-serif; font-size:72px; color:rgba(245,200,0,0.12); line-height:1; position:absolute; top:10px; right:20px; }
  .workshop-icon { font-size:32px; margin-bottom:16px; }
  .workshop-title { font-size:20px; font-weight:600; color:#F5C800; margin-bottom:6px; }
  .workshop-sub { font-size:14px; color:${t.textMuted}; font-weight:300; transition:color 0.45s; }

  /* ── SHOWS ── */
  .shows-row { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
  .show-card { background:${t.showCardBg}; border:1px solid ${t.showCardBorder}; padding:48px 40px; display:flex; flex-direction:column; gap:12px; position:relative; overflow:hidden; transition:all 0.4s; box-shadow:${t.cardShadow}; }
  .show-card:hover { border-color:#F5C800; }
  .show-card::after { content:''; position:absolute; bottom:-40px; right:-40px; width:120px; height:120px; border-radius:50%; background:radial-gradient(circle,rgba(245,200,0,0.1),transparent); transition:all 0.4s; }
  .show-card:hover::after { width:200px; height:200px; bottom:-60px; right:-60px; }
  .show-emoji { font-size:40px; }
  .show-name { font-family:'Bebas Neue',sans-serif; font-size:32px; letter-spacing:2px; color:${t.text}; transition:color 0.45s; }
  .show-desc { font-size:13px; color:${t.textMuted}; font-weight:300; letter-spacing:1px; transition:color 0.45s; }

  /* ── HIGHLIGHTS ── */
  .highlights-section { background:${t.bgSection}; border-top:1px solid ${t.borderSection}; border-bottom:1px solid ${t.borderSection}; padding:80px 40px; transition:background 0.45s, border-color 0.45s; }
  .highlights-inner { max-width:1200px; margin:0 auto; }
  .highlights-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:40px; margin-top:60px; }
  .highlight-item { text-align:center; padding:30px 20px; }
  .highlight-icon { font-size:48px; margin-bottom:16px; display:block; }
  .highlight-name { font-size:17px; font-weight:600; color:#F5C800; margin-bottom:6px; }
  .highlight-desc { font-size:13px; color:${t.textMuted}; font-weight:300; line-height:1.5; transition:color 0.45s; }

  /* ── MARQUEE ── */
  .marquee-bar { background:#F5C800; padding:16px 0; overflow:hidden; white-space:nowrap; }
  .marquee-inner { display:inline-flex; animation:marquee 20s linear infinite; }
  .marquee-inner span { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:4px; color:#0A0A0A; padding:0 40px; }

  /* ── LOCATION ── */
  .location-section { padding:100px 40px; max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .bts-badge { display:inline-block; background:#1565C0; color:white; font-family:'Bebas Neue',sans-serif; font-size:14px; letter-spacing:3px; padding:6px 16px; margin-bottom:24px; border-radius:2px; }
  .location-address { font-size:15px; color:${t.textSub}; line-height:2; font-weight:300; transition:color 0.45s; }
  .location-address strong { color:${t.text}; font-weight:600; transition:color 0.45s; }
  .sukhumvit-sign { background:${t.sukhumvitBg}; border:2px solid #1565C0; border-radius:8px; padding:40px; display:flex; flex-direction:column; align-items:center; gap:8px; position:relative; transition:background 0.45s; }
  .sukhumvit-sign::before { content:'สุขุมวิท'; font-family:'Kanit',sans-serif; font-size:36px; font-weight:700; color:${t.text}; transition:color 0.45s; }
  .sukhumvit-sign::after  { content:'Sukhumvit'; font-family:'Kanit',sans-serif; font-size:14px; color:${t.textSub}; letter-spacing:3px; transition:color 0.45s; }
  .sukhumvit-number { font-family:'Bebas Neue',sans-serif; font-size:80px; color:#F5C800; line-height:1; }
  .sukhumvit-soi { font-size:12px; color:${t.textMuted}; letter-spacing:4px; text-transform:uppercase; transition:color 0.45s; }

  /* ── FOOTER ── */
  .site-footer { background:${t.bgFooter}; border-top:1px solid rgba(245,200,0,0.15); padding:60px 40px; text-align:center; transition:background 0.45s; }
  .footer-logo { font-family:'Bebas Neue',sans-serif; font-size:40px; letter-spacing:8px; color:#F5C800; margin-bottom:16px; }
  .footer-tagline { font-size:12px; letter-spacing:4px; text-transform:uppercase; color:rgba(245,200,0,0.4); font-weight:300; margin-bottom:40px; }
  .footer-cta { margin-bottom:50px; }
  .footer-copy { font-size:11px; color:rgba(245,200,0,0.25); letter-spacing:2px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes scrollPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  .reveal { opacity:0; transform:translateY(40px); transition:opacity 0.7s,transform 0.7s; }
  .reveal.visible { opacity:1; transform:none; }

  @media(max-width:600px){
    .top-bar-right { display:none; }
    .ticket-divider { display:none; }
    .ticket-section { gap:30px; }
    .hero-title { letter-spacing:-1px; }
    .shows-row { grid-template-columns:1fr; }
    .location-section { grid-template-columns:1fr; gap:40px; }
    .toggle-label { display:none; }
  }
  `;
}

// ─── COMPONENT ──────────────────────────────────────────────────
export default function SongkranLanding() {
  const [isDark, setIsDark] = useState(false);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      <style>{buildStyles(t, isDark)}</style>

      {/* THEME TOGGLE — fixed pill */}
      <button
        className="theme-toggle"
        onClick={() => setIsDark(!isDark)}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="toggle-label">{isDark ? "Light" : "Dark"}</span>
        <div className="toggle-track">
          <div className="toggle-thumb" />
        </div>
        <span className="toggle-icon">{isDark ? "☀️" : "🌙"}</span>
      </button>

      <div className="songkran-root">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="stripe" />
          <div className="stripe stripe-2" />
          <nav className="top-bar">
            <div className="top-bar-left">A Songkran of Culture Community & Fun</div>
            <div className="top-bar-brand">CHAPTER</div>
            <div className="top-bar-right">Sukhumvit Soi 26</div>
          </nav>
          <div className="hero-content">
            <p className="thai-sub">สงกรานต์</p>
            <h1 className="hero-title">SONG<span>KRAN</span></h1>
            <div className="hero-sub-title">BANGKOK</div>
            <div className="hero-year">2026</div>
            <div className="hero-date-badge">13 – 15 April 2026</div>
            <div className="hero-tags">
              {["Hands-on Thai Workshops","Live Cultural Shows","Local Market Vibes","Water Fight Zone"].map((tag) => (
                <span key={tag} className="hero-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="scroll-hint">
            <span>Scroll</span>
            <div className="scroll-arrow" />
          </div>
        </section>

        {/* ── POSTER GALLERY ── */}
        <section style={{ background: t.bg, transition: "background 0.45s" }}>
          <div className="poster-section">
            <div className="poster-section-header reveal" ref={addRevealRef}>
              <div className="section-eyebrow" style={{ justifyContent:"center" }}>Official Event Posters</div>
              <h2 className="section-title" style={{ textAlign:"center" }}>
                SONG<span style={{ color:t.text, WebkitTextStroke:"2px #F5C800" }}>KRAN</span> 2026
              </h2>
            </div>
            <div className="poster-grid reveal" ref={addRevealRef}>
              <div className="poster-frame">
                <img src={Poster_1} alt="Songkran Bangkok Festival 2026 — Main Poster" />
                <div className="poster-overlay">
                  <div className="poster-overlay-text">SONGKRAN BANGKOK FESTIVAL 2026</div>
                </div>
              </div>
              <div className="poster-frame">
                <img src={Poster_2} alt="Songkran 2026 — Workshops & Highlights" />
                <div className="poster-overlay">
                  <div className="poster-overlay-text">WORKSHOPS · SHOWS · HIGHLIGHTS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKET ── */}
        <section className="ticket-section">
          <div className="ticket-price-block">
            <div className="ticket-label">Early Bird Ticket Price</div>
            <div className="ticket-amount">2500<span className="ticket-currency"> THB</span></div>
            <div className="ticket-note">Limited availability · Price increases soon</div>
          </div>
          <div className="ticket-divider" />
          <div className="ticket-location">
            <div className="ticket-location-label">Venue</div>
            <div className="ticket-location-name">Chapter Market<br />Sukhumvit 26</div>
            <div className="ticket-location-addr">BTS Phrom Phong Station Exit 4<br />approx. 450 m walk</div>
          </div>
          <div className="ticket-divider" />
          <a href="#book" className="cta-btn"><span>Book Now →</span></a>
        </section>

        {/* ── WORKSHOPS ── */}
        <section className="program-section">
          <div className="reveal" ref={addRevealRef}>
            <div className="section-eyebrow">Hands-on Experience</div>
            <h2 className="section-title">WORK<br />SHOPS</h2>
          </div>
          <div className="workshops-grid reveal" ref={addRevealRef}>
            {workshops.map((w) => (
              <div key={w.num} className="workshop-card">
                <div className="workshop-num">{w.num}</div>
                <div className="workshop-icon">{w.icon}</div>
                <div className="workshop-title">{w.title}</div>
                <div className="workshop-sub">{w.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-bar">
          <div className="marquee-inner">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        {/* ── SHOWS ── */}
        <section className="program-section">
          <div className="reveal" ref={addRevealRef}>
            <div className="section-eyebrow">Live Performance</div>
            <h2 className="section-title">SHOWS</h2>
          </div>
          <div className="shows-row reveal" ref={addRevealRef}>
            {shows.map((s) => (
              <div key={s.name} className="show-card">
                <div className="show-emoji">{s.emoji}</div>
                <div className="show-name">{s.name}</div>
                <div className="show-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HIGHLIGHTS ── */}
        <section className="highlights-section">
          <div className="highlights-inner">
            <div className="reveal" ref={addRevealRef}>
              <div className="section-eyebrow">Other Highlights</div>
              <h2 className="section-title">MORE TO<br />EXPLORE</h2>
            </div>
            <div className="highlights-grid reveal" ref={addRevealRef}>
              {highlights.map((h) => (
                <div key={h.name} className="highlight-item">
                  <span className="highlight-icon">{h.icon}</span>
                  <div className="highlight-name">{h.name}</div>
                  <div className="highlight-desc">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="location-section">
          <div className="location-info reveal" ref={addRevealRef}>
            <div className="section-eyebrow">Getting Here</div>
            <h2 className="section-title" style={{ fontSize:"clamp(36px,6vw,72px)", marginBottom:30 }}>
              FIND<br />US HERE
            </h2>
            <div className="bts-badge">BTS Phrom Phong</div>
            <div className="location-address">
              <strong>Chapter Market</strong><br />
              Sukhumvit Soi 26<br />
              Bangkok, Thailand<br /><br />
              Exit 4 · approx. 450 m walk<br />
              13 – 15 April 2026
            </div>
          </div>
          <div className="sukhumvit-sign reveal" ref={addRevealRef}>
            <div className="sukhumvit-number">26</div>
            <div className="sukhumvit-soi">Soi Ari</div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="book" className="site-footer">
          <div className="footer-logo">CHAPTER</div>
          <div className="footer-tagline">Songkran of Culture Community & Fun</div>
          <div className="footer-cta">
            <a href="#" className="cta-btn">
              <span>🎟️ Book Now — 2,500 THB</span>
            </a>
          </div>
          <div className="footer-copy">© 2026 Chapter Market · Sukhumvit Soi 26, Bangkok, Thailand</div>
        </footer>

      </div>
    </>
  );
}
