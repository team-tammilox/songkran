import { useEffect, useRef, useState } from "react";
import { Poster_1, Poster_2, Poster_3, photo_section, galah, sack } from "./assets";
import SongkranSEO from "./components/SEO";

// Photo imports — 10 event images
import Photo_WaterDance from "./assets/20260305_1501_Image Generation_simple_compose_01kjyg82k1fe3smdrnyennabnj.png";
import Photo_DrumParade from "./assets/long.png";
import Photo_RiceWrap from "./assets/kao.jpg";
import Photo_Garland from "./assets/malaiii.jpg";
import Photo_Costume from "./assets/thai.jpg";
import Photo_Somtam from "./assets/somtam.jpg";
import Photo_Market from "./assets/20260306_1922_Image Generation_remix_01kk1hg4p7ft2aqc4kcx0e0tmn.png";
import Photo_Food from "./assets/kanom.jpg";
import Photo_MorLam from "./assets/messageImage_1772800884529.jpg";
import Photo_Lotus from "./assets/lotus.jpg";
import Photo_WaterFight from "./assets/20260305_1453_Image Generation_simple_compose_01kjyfqwwbe7dvsb0c2zs5bg3n.png";
import Photo_Flag from "./assets/flag.jpg";

// ─── THEME TOKENS ───────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#0A0A0A",
    bgHero: "#0A0A0A",
    bgSection: "rgba(245,200,0,0.04)",
    bgCard: "rgba(245,200,0,0.04)",
    bgCardHover: "rgba(245,200,0,0.08)",
    bgFooter: "#050505",
    text: "#F5F0E8",
    textMuted: "rgba(245,240,232,0.5)",
    textSub: "rgba(245,240,232,0.6)",
    border: "rgba(245,200,0,0.12)",
    borderSection: "rgba(245,200,0,0.1)",
    borderTopBar: "rgba(245,200,0,0.2)",
    tagBorder: "rgba(245,240,232,0.2)",
    tagColor: "rgba(245,240,232,0.7)",
    heroGlow1: "rgba(245,200,0,0.12)",
    heroGlow2: "rgba(212,160,23,0.08)",
    heroTextShadow: "8px 8px 0px rgba(0,0,0,0.5), 0 0 80px rgba(245,200,0,0.3)",
    grainOpacity: "0.4",
    showCardBg: "linear-gradient(135deg,rgba(245,200,0,0.08),rgba(245,200,0,0.02))",
    showCardBorder: "rgba(245,200,0,0.15)",
    sukhumvitBg: "rgba(21,101,192,0.15)",
    scrollHintClr: "rgba(245,240,232,0.4)",
    ctaBtnBg: "#F5C800",
    ctaBtnClr: "#0A0A0A",
    cardShadow: "none",
    themeBtnBg: "rgba(245,200,0,0.1)",
    themeBtnBorder: "rgba(245,200,0,0.4)",
    themeBtnClr: "#F5C800",
  },
  light: {
    bg: "#FFFBF0",
    bgHero: "#FFF8E1",
    bgSection: "rgba(245,200,0,0.06)",
    bgCard: "#FFFFFF",
    bgCardHover: "#FFFDE7",
    bgFooter: "#1A1200",
    text: "#1A1200",
    textMuted: "rgba(26,18,0,0.5)",
    textSub: "rgba(26,18,0,0.65)",
    border: "rgba(180,130,0,0.2)",
    borderSection: "rgba(180,130,0,0.15)",
    borderTopBar: "rgba(180,130,0,0.2)",
    tagBorder: "rgba(26,18,0,0.18)",
    tagColor: "rgba(26,18,0,0.65)",
    heroGlow1: "rgba(245,200,0,0.3)",
    heroGlow2: "rgba(212,160,23,0.18)",
    heroTextShadow: "4px 4px 0px rgba(180,130,0,0.2), 0 0 50px rgba(245,200,0,0.2)",
    grainOpacity: "0.12",
    showCardBg: "linear-gradient(135deg,rgba(245,200,0,0.1),rgba(212,160,23,0.04))",
    showCardBorder: "rgba(180,130,0,0.2)",
    sukhumvitBg: "rgba(21,101,192,0.06)",
    scrollHintClr: "rgba(26,18,0,0.35)",
    ctaBtnBg: "#0A0A0A",
    ctaBtnClr: "#F5C800",
    cardShadow: "0 2px 16px rgba(0,0,0,0.07)",
    themeBtnBg: "rgba(26,18,0,0.06)",
    themeBtnBorder: "rgba(26,18,0,0.2)",
    themeBtnClr: "#1A1200",
  },
};

type Theme = {
  bg: string; bgHero: string; bgSection: string; bgCard: string; bgCardHover: string;
  bgFooter: string; text: string; textMuted: string; textSub: string;
  border: string; borderSection: string; borderTopBar: string;
  tagBorder: string; tagColor: string;
  heroGlow1: string; heroGlow2: string; heroTextShadow: string; grainOpacity: string;
  showCardBg: string; showCardBorder: string; sukhumvitBg: string; scrollHintClr: string;
  ctaBtnBg: string; ctaBtnClr: string; cardShadow: string;
  themeBtnBg: string; themeBtnBorder: string; themeBtnClr: string;
};

// ─── DATA ───────────────────────────────────────────────────────
type Workshop = { num: string; title: string; sub: string; photo: string; icon?: string };
type Game = { name: string; desc: string; photo: string; emoji?: string };
type Show = { name: string; desc: string; photo: string; emoji?: string };
type Highlight = { name: string; desc: string; photo: string; icon?: string };

const workshops: Workshop[] = [
  { num: "01", title: "Khao Tom Mud", sub: "Sticky Rice & Banana Wrap", photo: Photo_RiceWrap },
  { num: "02", title: "Som Tam", sub: "Thai Papaya Salad Workshop", photo: Photo_Somtam },
  { num: "03", title: "Thai Flower Garland", sub: "Traditional Phuang Malai Making", photo: Photo_Garland },
  { num: "04", title: "Water Blessing Ritual", sub: "Song Nam Phra — Songkran Tradition", photo: Photo_WaterFight },
  { num: "05", title: "Lotus Petal Folding", sub: "Crafting Lotus Flowers for Songkran", photo: Photo_Lotus },
];

const shows: Show[] = [
  { name: "Mor Lam Performance", desc: "Join in and dance · Traditional northeastern Thai music & performance", photo: Photo_MorLam },
  { name: "Long Drum Dance", desc: "Witness the ancient Glong Yao drum performance · Cultural spectacle", photo: Photo_DrumParade },
  { name: "Flag Parade Folding", desc: "Experience the vibrant Thai flag parade · A colorful procession", photo: Photo_Flag },
];

const thaigames: Game[] = [
  { name: "Galah", desc: "Traditional Thai tag game · Fast-paced and fun", photo: galah },
  { name: "Sack Race", desc: "Hop your way to victory · Classic sack racing game", photo: sack },
]

const highlights: Highlight[] = [
  { name: "Thai Costume", desc: "Dress up in traditional Thai attire for stunning photos", photo: Photo_Costume },
  { name: "Thai Local Market", desc: "Browse vendors in authentic local market style", photo: Photo_Market },
  { name: "Local Food & Fun", desc: "Taste authentic Thai street food & flavors", photo: Photo_Food },
  { name: "Water Fight Zone", desc: "Classic Songkran water battle — come ready to get wet!", photo: Photo_WaterDance },
];

const marqueeItems = [
  "SONGKRAN",
  "BANGKOK",
  "สงกรานต์",
  "13–15 APRIL",
  "CHAPTER MARKET",
  "SUKHUMVIT 26"
];

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
  }
  .hero-poster-bg {
    position:absolute; inset:0; z-index:0;
    background-image: url(${Poster_1});
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    transform: scale(1.04);
    animation: heroZoom 18s ease-in-out infinite alternate;
  }
  .hero-poster-overlay {
    position:absolute; inset:0; z-index:1;
    background: ${isDark
      ? "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.72) 100%)"
      : "linear-gradient(to bottom, rgba(255,248,220,0.6) 0%, rgba(255,248,220,0.25) 40%, rgba(255,248,220,0.78) 100%)"
    };
    transition: background 0.45s;
  }
  .hero-poster-overlay::after {
    content:''; position:absolute; inset:0;
    background: ${isDark
      ? "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(245,200,0,0.08) 0%, transparent 70%)"
      : "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(245,200,0,0.18) 0%, transparent 70%)"
    };
  }
  @keyframes heroZoom { from { transform:scale(1.04) } to { transform:scale(1.12) } }
  .hero-bg {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 60% 50% at 50% 30%, ${t.heroGlow1} 0%, transparent 70%),
      radial-gradient(ellipse 80% 80% at 50% 100%, ${t.heroGlow2} 0%, transparent 70%);
    z-index:0; transition:background 0.45s;
  }
  .stripe { position:absolute; width:200%; height:6px; background:#F5C800; top:88px; left:-50%; transform:rotate(-2deg); opacity:0.9; z-index:2; }
  .stripe-2 { top:96px; opacity:0.3; }

  .top-bar {
    position:absolute; top:0; left:0; right:0;
    padding:20px 40px; display:flex; justify-content:space-between;
    align-items:center; z-index:10;
    border-bottom:1px solid rgba(245,200,0,0.25);
    backdrop-filter: blur(4px);
    background: rgba(0,0,0,0.15);
    transition:border-color 0.45s;
  }
  .top-bar-left  { font-size:11px; letter-spacing:3px; text-transform:uppercase; color:rgba(255,255,255,0.7); font-weight:300; }
  .top-bar-brand { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:4px; color:#F5C800; }
  .top-bar-right { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.7); font-weight:300; }

  .hero-content { position:relative; z-index:5; padding:420px 20px 60px; }
  .thai-sub { font-size:clamp(18px,3vw,28px); font-weight:300; color:#F5C800; letter-spacing:4px; margin-bottom:10px; opacity:0; animation:fadeUp 0.8s 0.2s forwards; text-shadow: 0 2px 12px rgba(0,0,0,0.6); }
  .hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(90px,20vw,240px); line-height:0.85; letter-spacing:-2px; color:#F5C800; text-shadow: 6px 6px 0px rgba(0,0,0,0.45), 0 0 80px rgba(245,200,0,0.4), 0 0 160px rgba(245,200,0,0.15); opacity:0; animation:fadeUp 0.8s 0.4s forwards; }
  .hero-title span { color:#ffffff; -webkit-text-stroke:2px #F5C800; }
  .hero-sub-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(40px,10vw,100px); letter-spacing:10px; color:#ffffff; text-shadow: 0 2px 20px rgba(0,0,0,0.7); margin-top:-10px; opacity:0; animation:fadeUp 0.8s 0.6s forwards; }
  .hero-year { font-family:'Bebas Neue',sans-serif; font-size:clamp(28px,5vw,56px); color:#F5C800; letter-spacing:8px; margin-top:20px; opacity:0; animation:fadeUp 0.8s 0.8s forwards; text-shadow: 0 2px 12px rgba(0,0,0,0.5); }
  .hero-date-badge { display:inline-block; margin-top:30px; padding:14px 40px; border:2px solid #F5C800; font-size:16px; letter-spacing:5px; text-transform:uppercase; color:#F5C800; font-weight:600; opacity:0; animation:fadeUp 0.8s 1.0s forwards; backdrop-filter:blur(8px); background:rgba(0,0,0,0.5); }
  .hero-date-badge::before,.hero-date-badge::after { content:'✦'; margin:0 12px; font-size:10px; }
  .hero-tags { display:flex; gap:20px; justify-content:center; flex-wrap:wrap; margin-top:40px; opacity:0; animation:fadeUp 0.8s 1.2s forwards; }
  .hero-tag { font-size:14px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.85); font-weight:300; padding:12px 24px; border:1px solid rgba(255,255,255,0.3); border-radius:2px; backdrop-filter:blur(6px); background:rgba(0,0,0,0.35); }

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

  /* ── POSTER2 DETAILS SECTION ── */
  .poster2-section {
    position: relative;
    min-height: 90vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }
  .poster2-bg-col {
    position: relative;
    overflow: hidden;
    height: 930px;
  }
  .poster2-bg-img {
    position: absolute;
    inset: 0;
    background-image: url(${Poster_2});
    background-size: cover;
    background-position: center top;
    transition: transform 0.6s ease;
  }
  .poster2-bg-overlay {
    position: absolute;
    inset: 0;
    background: ${isDark
      ? "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(10,10,10,0.85) 100%)"
      : "linear-gradient(to right, rgba(255,248,220,0) 0%, rgba(255,248,220,0.9) 100%)"
    };
    transition: background 0.45s;
  }
  .poster2-content-col {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 60px 80px 40px;
    background: ${isDark ? "rgba(10,10,10,0.9)" : "rgba(255,248,220,0.92)"};
    transition: background 0.45s;
  }
  .poster2-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(245,200,0,0.35);
    color: #F5C800;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    padding: 8px 18px;
    border-radius: 40px;
    margin-bottom: 32px;
    width: fit-content;
    font-weight: 600;
    backdrop-filter: blur(6px);
  }
  .poster2-pill::before { content:'✦'; font-size:9px; }
  .poster2-list-group { margin-bottom: 36px; }
  .poster2-list-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 4px;
    color: #F5C800;
    margin-bottom: 14px;
    border-bottom: 1px solid rgba(245,200,0,0.2);
    padding-bottom: 8px;
  }
  .poster2-list-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid ${t.border};
    font-size: 14px;
    color: ${t.text};
    font-weight: 300;
    letter-spacing: 0.5px;
    line-height: 1.5;
    transition: color 0.45s, border-color 0.45s;
  }
  .poster2-list-item::before {
    content: '▸';
    color: #F5C800;
    flex-shrink: 0;
    margin-top: 1px;
    font-size: 11px;
  }
  .poster2-ticket-strip {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 24px;
    background: #F5C800;
    padding: 20px 28px;
    border-radius: 4px;
  }
  .poster2-price-big {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    color: #0A0A0A;
    line-height: 1;
    letter-spacing: -1px;
  }
  .poster2-price-meta {
    flex: 1;
  }
  .poster2-price-label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin-bottom: 4px;
    font-weight: 600;
  }
  .poster2-price-dates {
    font-size: 14px;
    font-weight: 700;
    color: #0A0A0A;
    letter-spacing: 1px;
  }
  @media(max-width:768px) {
    .poster2-section { grid-template-columns: 1fr; min-height: auto; }
    .poster2-bg-col { height: 500px; }
    .poster2-bg-overlay { background: none; }
    .poster2-content-col { padding: 40px 24px; }
    .poster-grid { grid-template-columns: 1fr; }
    .poster-section { padding: 50px 20px; }
    .hero-date-badge { padding: 8px 28px; font-size: 14px; }
    .poster2-ticket-strip { flex-direction: column; align-items: stretch; }
  }

  /* ── TICKET ── */
  .ticket-section { background:#F5C800; padding:60px 40px; display:flex; justify-content:center; align-items:center; gap:60px; flex-wrap:wrap; position:relative; overflow:hidden; }
  .ticket-section::before { content:'EARLY BIRD'; position:absolute; font-family:'Bebas Neue',sans-serif; font-size:200px; color:rgba(0,0,0,0.06); white-space:nowrap; top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
  .ticket-photo { width:320px; }
  .ticket-price-block { text-align:center; color:#0A0A0A; }
  .ticket-orig { font-family:'Bebas Neue',sans-serif; font-size:clamp(28px,5vw,42px); color:#cc2200; letter-spacing:2px; text-decoration:line-through; text-decoration-color:#cc2200; text-decoration-thickness:3px; opacity:0.85; margin-bottom:2px; }
  .ticket-label { font-size:16px; letter-spacing:4px; text-transform:uppercase; font-weight:600; opacity:0.6; }
  .ticket-amount { font-family:'Bebas Neue',sans-serif; font-size:clamp(60px,12vw,120px); line-height:1; letter-spacing:-2px; color:#0A0A0A; }
  .ticket-currency { font-size:24px; font-weight:300; letter-spacing:3px; }
  .ticket-note { font-size:16px; opacity:0.6; letter-spacing:1px; color:#0A0A0A; }
  .ticket-divider { width:1px; height:100px; background:rgba(0,0,0,0.2); }
  .ticket-location { color:#0A0A0A; max-width:300px; }
  .ticket-location-label { font-size:11px; letter-spacing:4px; text-transform:uppercase; opacity:0.5; margin-bottom:8px; }
  .ticket-location-name { font-family:'Playfair Display',serif; font-size:28px; font-style:italic; line-height:1.2; margin-bottom:8px; }
  .ticket-location-addr { font-size:13px; opacity:0.6; letter-spacing:1px; line-height:1.6; }

  .cta-btn { display:inline-block; background:${t.ctaBtnBg}; color:${t.ctaBtnClr}; font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:5px; padding:18px 50px; text-decoration:none; position:relative; overflow:hidden; cursor:pointer; border:none; transition:color 0.3s; }
  .cta-btn::after { content:''; position:absolute; inset:0; background:#fff; transform:translateX(-100%); transition:transform 0.3s; }
  .cta-btn:hover { color:#0A0A0A; }
  .cta-btn:hover::after { transform:translateX(0); }
  .cta-btn span { position:relative; z-index:1; }

  .cta-btn_contact { display:inline-block; background:${t.ctaBtnBg};  color:${t.ctaBtnClr}; font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:5px; padding:18px 50px; text-decoration:none; position:relative; overflow:hidden; cursor:pointer; border:none; transition:all 0.3s; }
  .cta-btn_contact::after { content:''; position:absolute; inset:0;  background:#fff; transform:translateX(-100%); transition:transform 0.3s; }
  .cta-btn_contact:hover { color:#0A0A0A; border:2px solid #000; }
  .cta-btn_contact:hover::after { transform:translateX(0); }
  .cta-btn_contact span { position:relative; z-index:1; }

  .cta-btn_footer { display:inline-block; background: #fff; color:#000; border-radius:12px; font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:5px; padding:18px 50px; text-decoration:none; position:relative; overflow:hidden; cursor:pointer; border:none; transition:color 0.3s; }
  .cta-btn_footer::after { content:''; position:absolute; inset:0; background:#F5C800; transform:translateX(-100%); transition:transform 0.3s; }
  .cta-btn_footer:hover { color:#0A0A0A; }
  .cta-btn_footer:hover::after { transform:translateX(0); }
  .cta-btn_footer span { position:relative; z-index:1; }
  /* ── PROGRAM ── */
  .program-section { padding:100px 40px; max-width:1500px; margin:0 auto; }
  .section-eyebrow { font-size:11px; letter-spacing:5px; text-transform:uppercase; color:#F5C800; margin-bottom:16px; display:flex; align-items:center; gap:16px; }
  .section-eyebrow::after { content:''; flex:1; max-width:60px; height:1px; background:#F5C800; opacity:0.4; }
  .section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(48px,8vw,96px); line-height:0.9; color:${t.text}; margin-bottom:60px; transition:color 0.45s; }

  /* ── WORKSHOPS ── */
  .workshops-grid { display:grid; grid-template-columns:repeat(5,minmax(260px,1fr)); gap:2px; }
  .workshop-card { background:${t.bgCard}; border:1px solid ${t.border}; position:relative; overflow:hidden; transition:all 0.4s; cursor:default; box-shadow:${t.cardShadow}; }
  .workshop-card-photo {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
  }
  
  @media(max-width:768px) {
    .workshops-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
  }

  .workshop-card-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.6s ease;
    display: block;
  }
  .workshop-card:hover .workshop-card-photo img { transform: scale(1.07); }
  .workshop-card-photo-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%);
    z-index: 1;
  }
  .workshop-card-body { padding: 28px 32px 32px; position: relative; }
  .workshop-card::before { content:''; position:absolute; top:0; left:0; width:3px; height:0; background:#F5C800; transition:height 0.4s; z-index:2; }
  .workshop-card:hover { background:${t.bgCardHover}; transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.18); }
  .workshop-card:hover::before { height:100%; }
  .workshop-num { font-family:'Bebas Neue',sans-serif; font-size:72px; color:rgba(245,200,0,0.12); line-height:1; position:absolute; top:10px; right:20px; }
  .workshop-icon { font-size:32px; margin-bottom:16px; }
  .workshop-title { font-size:20px; font-weight:600; color:#F5C800; margin-bottom:6px; }
  .workshop-sub { font-size:14px; color:${t.textMuted}; font-weight:300; transition:color 0.45s; }

  /* ── GAMES ── */
  .games-section { padding:100px 40px; max-width:1500px; margin:0 auto; }
  .games-row { display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-top:0; }
  .game-card {
    position:relative; overflow:hidden;
    background:${t.bgCard}; border:1px solid ${t.border};
    transition:all 0.4s; box-shadow:${t.cardShadow};
    display:flex; flex-direction:column;
  }
  .game-card:hover { border-color:#F5C800; transform:translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(245,200,0,0.25); }
  .game-card-photo { width:100%; height:320px; overflow:hidden; position:relative; flex-shrink:0; }
  .game-card-photo img { width:100%; height:100%; object-fit:cover; object-position:center 25%; transition:transform 0.6s ease; display:block; }
  .game-card:hover .game-card-photo img { transform:scale(1.06); }
  .game-card-photo-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%); z-index:1; }
  .game-card-body { padding:32px 36px 40px; display:flex; flex-direction:column; gap:10px; position:relative; z-index:1; flex:1; }
  .game-card-icon { font-size:36px; margin-bottom:4px; }
  .game-card-name { font-family:'Bebas Neue',sans-serif; font-size:36px; letter-spacing:2px; color:${t.text}; line-height:1; transition:color 0.45s; }
  .game-card-name-th { font-family:'Kanit',sans-serif; font-size:15px; font-weight:300; color:#F5C800; letter-spacing:2px; margin-bottom:4px; }
  .game-card-desc { font-size:13px; color:${t.textMuted}; font-weight:300; letter-spacing:0.5px; line-height:1.7; transition:color 0.45s; }
  .game-card-tag { display:inline-flex; align-items:center; gap:6px; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:rgba(245,200,0,0.8); border:1px solid rgba(245,200,0,0.25); padding:5px 12px; border-radius:2px; width:fit-content; margin-top:8px; font-weight:600; }
  .game-card-tag::before { content:'✦'; font-size:8px; }
  @media(max-width:768px) { .games-row { grid-template-columns:1fr; } .game-card-photo { height:240px; } }

  /* ── SHOWS ── */
  .shows-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:40px; }
  .show-card { background:${t.showCardBg}; border:1px solid ${t.showCardBorder}; overflow:hidden; display:flex; flex-direction:column; position:relative; transition:all 0.4s; box-shadow:${t.cardShadow}; }
  .show-card:hover { border-color:#F5C800; }
  .show-card::after { content:''; position:absolute; bottom:-40px; right:-40px; width:120px; height:120px; border-radius:50%; background:radial-gradient(circle,rgba(245,200,0,0.1),transparent); transition:all 0.4s; z-index:0; }
  .show-card:hover::after { width:200px; height:200px; bottom:-60px; right:-60px; }
  .show-card-photo {
    width: 100%;
    height: 260px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
  }
  .show-card-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    transition: transform 0.6s ease;
    display: block;
  }
  .show-card:hover .show-card-photo img { transform: scale(1.06); }
  .show-card-body { padding: 40px 40px 48px; position: relative; z-index: 1; display: flex; flex-direction: column; gap: 12px; }
  .show-emoji { font-size:40px; }
  .show-name { font-family:'Bebas Neue',sans-serif; font-size:32px; letter-spacing:2px; color:${t.text}; transition:color 0.45s; }
  .show-desc { font-size:13px; color:${t.textMuted}; font-weight:300; letter-spacing:1px; transition:color 0.45s; }

  /* ── HIGHLIGHTS ── */
  .highlights-section { background:${t.bgSection}; border-top:1px solid ${t.borderSection}; border-bottom:1px solid ${t.borderSection}; padding:80px 40px; transition:background 0.45s, border-color 0.45s; }
  .highlights-inner { max-width:1200px; margin:0 auto; }
  .highlights-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:24px; margin-top:60px; }
  .highlight-item { text-align:center; overflow:hidden; background:${t.bgCard}; border:1px solid ${t.border}; transition:all 0.4s; box-shadow:${t.cardShadow}; }
  .highlight-item:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(245,200,0,0.3); border-color: rgba(245,200,0,0.4); }
  .highlight-photo {
    width: 100%;
    height: 180px;
    overflow: hidden;
    position: relative;
  }
  .highlight-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    transition: transform 0.6s ease;
    display: block;
  }
  .highlight-item:hover .highlight-photo img { transform: scale(1.08); }
  .highlight-photo-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%);
  }
  .highlight-body { padding: 24px 20px 28px; }
  .highlight-icon { font-size:36px; margin-bottom:12px; display:block; }
  .highlight-name { font-size:17px; font-weight:600; color:#F5C800; margin-bottom:6px; }
  .highlight-desc { font-size:13px; color:${t.textMuted}; font-weight:300; line-height:1.5; transition:color 0.45s; }

  /* ── MARQUEE ── */
  .marquee-bar { background:#F5C800; padding:16px 0; overflow:hidden; white-space:nowrap; }
  .marquee-inner { display:inline-flex; animation:marquee 20s linear infinite; }
  .marquee-inner span { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:4px; color:#0A0A0A; padding:0 40px; }

  /* ── WATER FIGHT BANNER ── */
  .waterfight-section {
    position: relative;
    height: 80vh;
    min-height: 500px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .waterfight-img {
    position: absolute;
    inset: -10%;
    background-image: url(${Poster_3});
    background-size: cover;
    background-position: center 30%;
    will-change: transform;
    transition: transform 0.1s linear;
  }
  .waterfight-overlay {
    position: absolute;
    inset: 0;
    background: ${isDark
      ? "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.65) 100%)"
      : "linear-gradient(135deg, rgba(10,8,0,0.6) 0%, rgba(10,8,0,0.15) 50%, rgba(10,8,0,0.55) 100%)"
    };
  }
  .waterfight-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,200,0,0.06) 0%, transparent 70%);
  }
  .waterfight-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 40px 20px;
  }
  .waterfight-eyebrow {
    font-size: 14px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #F5C800;
    font-weight: 600;
    margin-bottom: 20px;
    opacity: 0;
    animation: fadeUp 0.8s 0.1s forwards;
  }
  .waterfight-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 14vw, 160px);
    line-height: 0.88;
    color: #ffffff;
    text-shadow: 4px 4px 0px rgba(0,0,0,0.4), 0 0 80px rgba(245,200,0,0.2);
    letter-spacing: -1px;
    opacity: 0;
    animation: fadeUp 0.9s 0.25s forwards;
  }
  .waterfight-title em {
    color: #F5C800;
    font-style: normal;
    -webkit-text-stroke: 0;
  }
  .waterfight-sub {
    font-size: clamp(14px, 2vw, 18px);
    color: #fff;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 300;
    margin-top: 24px;
    opacity: 0;
    animation: fadeUp 0.9s 0.45s forwards;
  }
  .waterfight-divider {
    width: 60px;
    height: 3px;
    background: #F5C800;
    margin: 28px auto 0;
    opacity: 0;
    animation: fadeUp 0.9s 0.6s forwards;
  }
  .waterfight-edge-top {
    position: absolute;
    top: 0; left: 0; right: 0; height: 120px;
    background: linear-gradient(to bottom, ${t.bgSection}, transparent);
    z-index: 1;
    pointer-events: none;
    transition: background 0.45s;
  }
  .waterfight-edge-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0; height: 120px;
    background: linear-gradient(to top, ${t.bg}, transparent);
    z-index: 1;
    pointer-events: none;
    transition: background 0.45s;
  }

  /* ── LOCATION ── */
  .location-section {
    position: relative;
    overflow: hidden;
    background: ${t.bgSection};
    border-top: 1px solid ${t.borderSection};
    transition: background 0.45s, border-color 0.45s;
  }
  .location-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  /* giant decorative "26" watermark */
  .location-section::before {
    content: '26';
    position: absolute;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(300px, 40vw, 520px);
    line-height: 1;
    color: rgba(245,200,0,0.04);
    right: -2%;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 1;
    transition: color 0.45s;
  }

  /* left — info column */
  .location-info { display: flex; flex-direction: column; gap: 0; }
  .location-eyebrow {
    font-size: 11px; letter-spacing: 5px; text-transform: uppercase;
    color: #F5C800; font-weight: 600; margin-bottom: 18px;
    display: flex; align-items: center; gap: 14px;
  }
  .location-eyebrow::after { content: ''; flex: 1; max-width: 50px; height: 1px; background: #F5C800; opacity: 0.4; }

  .location-headline {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 7vw, 96px);
    line-height: 0.9;
    color: ${t.text};
    margin-bottom: 40px;
    transition: color 0.45s;
  }
  .location-headline em {
    color: #F5C800;
    font-style: normal;
    display: block;
  }

  .location-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid ${t.border};
    transition: border-color 0.45s;
  }
  .location-detail-cell {
    padding: 24px 28px;
    border-right: 1px solid ${t.border};
    border-bottom: 1px solid ${t.border};
    transition: border-color 0.45s, background 0.3s;
  }
  .location-detail-cell:nth-child(even) { border-right: none; }
  .location-detail-cell:nth-last-child(-n+2) { border-bottom: none; }
  .location-detail-cell:hover { background: ${t.bgCardHover}; }
  .location-detail-label {
    font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
    color: #F5C800; font-weight: 700; margin-bottom: 8px; opacity: 0.8;
  }
  .location-detail-value {
    font-size: 15px; font-weight: 600; color: ${t.text};
    line-height: 1.4; transition: color 0.45s;
  }
  .location-detail-sub {
    font-size: 12px; color: ${t.textMuted}; font-weight: 300;
    margin-top: 4px; letter-spacing: 0.5px; transition: color 0.45s;
  }

  /* right — map card */
  .location-map-card {
    position: relative;
    background: ${t.bgCard};
    border: 1px solid ${t.border};
    overflow: hidden;
    transition: background 0.45s, border-color 0.45s;
  }
  .location-map-card:hover { border-color: rgba(245,200,0,0.4); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
  .location-map-accent {
    height: 5px;
    background: linear-gradient(90deg, #F5C800, #D4A017, #F5C800);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  .location-map-body {
    padding: 44px 40px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .location-venue-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    letter-spacing: 4px;
    color: ${t.text};
    line-height: 1;
    transition: color 0.45s;
  }
  .location-venue-name span { color: #F5C800; }
  .location-address-block { display: flex; flex-direction: column; gap: 6px; }
  .location-address-line {
    font-size: 14px; color: ${t.textSub}; font-weight: 300;
    letter-spacing: 1px; line-height: 1.6; transition: color 0.45s;
    display: flex; align-items: flex-start; gap: 10px;
  }
  .location-address-line-icon { color: #F5C800; font-size: 13px; flex-shrink: 0; margin-top: 2px; }
  .location-divider {
    height: 1px;
    background: ${t.border};
    transition: background 0.45s;
  }
  .bts-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .bts-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #1565C0; color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px; letter-spacing: 3px;
    padding: 7px 18px; border-radius: 2px;
  }
  .bts-badge::before { content: '🚇'; font-size: 14px; }
  .bts-walk {
    font-size: 12px; color: ${t.textMuted}; letter-spacing: 1px;
    font-weight: 300; transition: color 0.45s;
  }
  .location-dates-strip {
    background: #F5C800;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .location-dates-label {
    font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
    color: rgba(0,0,0,0.5); font-weight: 700;
  }
  .location-dates-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 3px; color: #0A0A0A;
  }
  @media(max-width:768px) {
    .location-inner { grid-template-columns: 1fr; gap: 48px; padding: 60px 24px; }
    .location-detail-grid { grid-template-columns: 1fr; }
    .location-detail-cell:nth-child(even) { border-right: 1px solid ${t.border}; }
    .location-detail-cell:nth-last-child(-n+2) { border-bottom: 1px solid ${t.border}; }
    .location-detail-cell:last-child { border-bottom: none; }
  }

  /* ── SPONSORS ── */
  .sponsors-section {
    padding: 80px 40px 90px;
    background: ${t.bgSection};
    border-top: 1px solid ${t.borderSection};
    text-align: center;
    transition: background 0.45s, border-color 0.45s;
  }
  .sponsors-eyebrow {
    font-size: 10px; letter-spacing: 6px; text-transform: uppercase;
    color: ${t.textMuted}; font-weight: 600; margin-bottom: 14px;
    transition: color 0.45s;
  }
  .sponsors-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 5vw, 48px);
    letter-spacing: 6px;
    color: ${t.text};
    margin-bottom: 8px;
    transition: color 0.45s;
  }
  .sponsors-sub {
    font-size: 12px; letter-spacing: 2px; color: ${t.textMuted};
    font-weight: 300; margin-bottom: 56px; transition: color 0.45s;
  }

  /* tier rows */
  .sponsors-tier { margin-bottom: 48px; }
  .sponsors-tier-label {
    font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
    color: ${t.textMuted}; margin-bottom: 24px; display: flex;
    align-items: center; justify-content: center; gap: 16px;
    transition: color 0.45s;
  }
  .sponsors-tier-label::before,
  .sponsors-tier-label::after {
    content: ''; flex: 1; max-width: 80px; height: 1px;
    background: ${t.border}; transition: background 0.45s;
  }
  .sponsors-logos {
    display: flex; flex-wrap: wrap;
    align-items: center; justify-content: center;
    gap: 16px;
  }

  /* logo pill */
  .sponsor-pill {
    display: flex; align-items: center; justify-content: center;
    border: 1px solid ${t.border};
    background: ${t.bgCard};
    transition: all 0.35s;
    cursor: default;
    box-shadow: ${t.cardShadow};
  }
  .sponsor-pill:hover {
    border-color: #F5C800;
    background: ${t.bgCardHover};
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(245,200,0,0.12);
  }

  /* size variants */
  .sponsor-pill.tier-main  { width: 200px; height: 80px; }
  .sponsor-pill.tier-gold  { width: 160px; height: 66px; }
  .sponsor-pill.tier-silver{ width: 130px; height: 54px; }

  .sponsor-pill-name {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 3px;
    color: ${t.text};
    transition: color 0.45s;
    text-align: center;
    line-height: 1.1;
  }
  .tier-main  .sponsor-pill-name { font-size: 20px; }
  .tier-gold  .sponsor-pill-name { font-size: 16px; }
  .tier-silver .sponsor-pill-name{ font-size: 13px; }

  .sponsor-pill-sub {
    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
    color: ${t.textMuted}; margin-top: 4px; transition: color 0.45s;
  }

  /* become sponsor CTA */
  .sponsors-cta {
    margin-top: 52px;
    display: flex; align-items: center; justify-content: center; gap: 20px;
    flex-wrap: wrap;
  }
  .sponsors-cta-text {
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
    color: ${t.textMuted}; font-weight: 300; transition: color 0.45s;
  }
  .sponsor-join-btn {
    display: inline-block;
    border: 1.5px solid rgba(245,200,0,0.5);
    color: #F5C800;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px; letter-spacing: 4px;
    padding: 10px 30px;
    text-decoration: none;
    transition: all 0.3s;
    background: transparent;
    cursor: pointer;
  }
  .sponsor-join-btn:hover {
    background: #F5C800; color: #0A0A0A; border-color: #F5C800;
  }

  @media(max-width:600px) {
    .sponsor-pill.tier-main  { width: 160px; height: 66px; }
    .sponsor-pill.tier-gold  { width: 130px; height: 54px; }
    .sponsor-pill.tier-silver{ width: 110px; height: 46px; }
  }

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

  .img-test { display:flex; justify-content:center; align-items:center;  }
  .img-box { width:auto; height:800px; overflow:hidden; }

  @media(max-width:600px){
    .top-bar-right { display:none; }
    .ticket-divider { display:none; }
    .ticket-section { gap:30px; }
    .hero-title { letter-spacing:-1px; }
    .shows-row { grid-template-columns:1fr; }
    .toggle-label { display:none; }
    .img-box { height: auto; }
  }
  `;
}

// ─── COMPONENT ──────────────────────────────────────────────────
export default function SongkranLanding() {
  const [isDark, setIsDark] = useState(false);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("wf-bg");
      if (!el) return;
      const section = el.closest(".waterfight-section") as HTMLElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = -rect.top / (window.innerHeight + rect.height);
      const translateY = progress * 120;
      el.style.transform = `translateY(${translateY}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <SongkranSEO />
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
          <div className="hero-poster-bg" />
          <div className="hero-poster-overlay" />
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
            <div className="hero-sub-title">@Chapter</div>
            <div className="hero-year">2026</div>
            <div className="hero-date-badge">13 – 15 April 2026</div>
            <div className="hero-tags">
              {["Hands-on Thai Workshops", "Thai Traditional Games", "Live Cultural Shows", "Local Market Vibes", "Water Fight Zone"].map((tag) => (
                <span key={tag} className="hero-tag">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── POSTER 2 — EVENT DETAILS SPLIT ── */}
        <section className="poster2-section">
          <div className="poster2-bg-col">
            <div className="poster2-bg-img" />
            <div className="poster2-bg-overlay" />
          </div>
          <div className="poster2-content-col reveal" ref={addRevealRef}>
            <div className="poster2-pill">Event Details</div>

            <div className="poster2-list-group">
              <div className="poster2-list-label">Workshops</div>
              {["Khao Tom Mud (Sticky Rice & Banana Wrap)", "Som Tam (Thai Green Papaya Salad)", "Thai Flower Garland Making (Phuang Malai)", "Water Blessing Ritual (Song Nam Phra)", "Lotus Petal Folding for Temple Offerings"].map(item => (
                <div key={item} className="poster2-list-item">{item}</div>
              ))}
            </div>

            <div className="poster2-list-group">
              <div className="poster2-list-label">THAI TRANDITIONAL GAMES</div>
              {thaigames.map((game) => (
                <div key={game.name} className="poster2-list-item">{game.name}</div>
              ))}
            </div>

            <div className="poster2-list-group">
              <div className="poster2-list-label">Shows</div>
              {["Mor Lam Performance Join & Dance", "Long Drum Dance (Glong Yao)", "Hae Thong Procession"].map(item => (
                <div key={item} className="poster2-list-item">{item}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TICKET ── */}
        <section className="ticket-section">
          <div className="ticket-price-block">
            <div className="ticket-label">Early Bird Ticket Price</div>
            <div className="ticket-orig">2,500 THB</div>
            <div className="ticket-amount">2,000<span className="ticket-currency"> THB</span></div>
            <div className="ticket-note">From 2,500 THB</div>
          </div>
          <div className="ticket-divider" />
          <div className="ticket-location">
            <div className="ticket-location-label">Venue</div>
            <div className="ticket-location-name">Chapter Market<br />Sukhumvit 26</div>
            <div className="ticket-location-addr">BTS Phrom Phong Station Exit 4<br />approx. 450 m walk</div>
          </div>
          <div className="ticket-contact">
            <a href="https://www.instagram.com/chapter_market/" target="_blank" className="cta-btn_contact"><span>Contact us</span></a>
          </div>
          <div className="ticket-divider" />
          <a href="https://stripe.com/en-th" className="cta-btn"><span>Book Now →</span></a>
        </section>

        {/* ── WORKSHOPS ── */}
        <section className="program-section">
          <div className="reveal" ref={addRevealRef}>
            <div className="section-eyebrow">Hands-on Experience</div>
            <h2 className="section-title">WORKSHOPS</h2>
          </div>
          <div className="workshops-grid reveal" ref={addRevealRef}>
            {workshops.map((w) => (
              <div key={w.num} className="workshop-card">
                <div className="workshop-card-photo">
                  <img src={w.photo} alt={w.title} loading="lazy" />
                  <div className="workshop-card-photo-overlay" />
                </div>
                <div className="workshop-card-body">
                  <div className="workshop-num">{w.num}</div>
                  {w.icon && <div className="workshop-icon">{w.icon}</div>}
                  <div className="workshop-title">{w.title}</div>
                  <div className="workshop-sub">{w.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GAMES ── */}
        <section className="games-section">
          <div className="reveal" ref={addRevealRef}>
            <div className="section-eyebrow">Thai Traditional Games</div>
            <h2 className="section-title">THAI TRADITIONAL GAMES & FUN    </h2>
          </div>
          <div className="games-row reveal" ref={addRevealRef}>

            {/* วิ่งกระสอบ */}
            <div className="game-card">
              <div className="game-card-photo">
                <img src={sack} alt="Sack Race" loading="lazy" />
                <div className="game-card-photo-overlay" />
              </div>
              <div className="game-card-body">
                <div className="game-card-name">SACK RACE</div>
                <div className="game-card-desc">
                  Jump into a sack race! Run as fast as you can. The first to reach the finish line wins. A classic game for all ages.
                </div>
                <div className="game-card-tag">Jump &amp; Race to the Finish</div>
              </div>
            </div>

            {/* เดินกะลา */}
            <div className="game-card">
              <div className="game-card-photo">
                <img src={galah} alt="Coconut Shell Walk" loading="lazy" />
                <div className="game-card-photo-overlay" />
              </div>
              <div className="game-card-body">
                <div className="game-card-name">COCONUT WALK</div>
                <div className="game-card-desc">
                  Stand on a coconut shell and try to walk! Practice your balance and perseverance. An ancient game that's as fun as any other!
                </div>
                <div className="game-card-tag">Balance &amp; Walk Your Way</div>
              </div>
            </div>

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
                <div className="show-card-photo">
                  <img src={s.photo} alt={s.name} loading="lazy" />
                </div>
                <div className="show-card-body">
                  {s.emoji && <div className="show-emoji">{s.emoji}</div>}
                  <div className="show-name">{s.name}</div>
                  <div className="show-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="waterfight-section">
          <div className="waterfight-img" id="wf-bg" />
          <div className="waterfight-overlay" />
          <div className="waterfight-edge-top" />
          <div className="waterfight-edge-bottom" />
          <div className="waterfight-content">
            <div className="waterfight-eyebrow">The Highlight of Songkran</div>
            <div className="waterfight-title">WATER<br /><em>FIGHT</em><br />ZONE</div>
            <div className="waterfight-sub">Come ready to get soaked · Songkran 2026</div>
            <div className="waterfight-divider" />
          </div>
        </section>

        {/* ── HIGHLIGHTS ── */}
        <section className="highlights-section">
          <div className="highlights-inner">
            <div className="reveal" ref={addRevealRef}>
              <div className="section-eyebrow">Other Highlights</div>
              <h2 className="section-title">MORE TO EXPLORE</h2>
            </div>
            <div className="highlights-grid reveal" ref={addRevealRef}>
              {highlights.map((h) => (
                <div key={h.name} className="highlight-item">
                  <div className="highlight-photo">
                    <img src={h.photo} alt={h.name} loading="lazy" />
                    <div className="highlight-photo-overlay" />
                  </div>
                  <div className="highlight-body">
                    {h.icon && <span className="highlight-icon">{h.icon}</span>}
                    <div className="highlight-name">{h.name}</div>
                    <div className="highlight-desc">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="highlights-section reveal" ref={addRevealRef}>
          <div className="img-test">
            <img className="img-box" src={photo_section} alt="Photo Section" />
          </div>
        </section>

        {/* ── SPONSORS ── */}
        <section className="sponsors-section">
          <div className="reveal" ref={addRevealRef}>
            <div className="sponsors-eyebrow">Proudly Supported By</div>
            <h2 className="sponsors-title">SPONSORS &amp; PARTNERS</h2>
            <p className="sponsors-sub">This event was made possible with the support of these partners.</p>
          </div>

          {/* Main Sponsor */}
          <div className="sponsors-tier reveal" ref={addRevealRef}>
            <div className="sponsors-tier-label">Main Sponsor</div>
            <div className="sponsors-logos">
              {[
                { name: "CHAPTER MARKET", sub: "Host Venue" },
                { name: "YOUR BRAND",     sub: "Title Sponsor" },
              ].map(s => (
                <div key={s.name} className="sponsor-pill tier-main">
                  <div>
                    <div className="sponsor-pill-name">{s.name}</div>
                    <div className="sponsor-pill-sub">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gold Sponsors */}
          <div className="sponsors-tier reveal" ref={addRevealRef}>
            <div className="sponsors-tier-label">Gold Sponsors</div>
            <div className="sponsors-logos">
              {["YOUR BRAND","YOUR BRAND","YOUR BRAND"].map((name, i) => (
                <div key={i} className="sponsor-pill tier-gold">
                  <div className="sponsor-pill-name">{name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Silver Sponsors */}
          <div className="sponsors-tier reveal" ref={addRevealRef}>
            <div className="sponsors-tier-label">Silver Sponsors</div>
            <div className="sponsors-logos">
              {["YOUR BRAND","YOUR BRAND","YOUR BRAND","YOUR BRAND","YOUR BRAND"].map((name, i) => (
                <div key={i} className="sponsor-pill tier-silver">
                  <div className="sponsor-pill-name">{name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Become a sponsor */}
          <div className="sponsors-cta reveal" ref={addRevealRef}>
            <span className="sponsors-cta-text">Interested in sponsoring?</span>
            <a href="mailto:hello@chaptermarket.co" className="sponsor-join-btn">
              BECOME A SPONSOR →
            </a>
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="location-section">
          <div className="location-inner">

            {/* Left — info */}
            <div className="location-info reveal" ref={addRevealRef}>
              <div className="location-eyebrow">Getting Here</div>
              <h2 className="location-headline">
                FIND US<em>HERE!</em>
              </h2>
              <div className="location-detail-grid">
                <div className="location-detail-cell">
                  <div className="location-detail-label">Venue</div>
                  <div className="location-detail-value">Chapter Market</div>
                  <div className="location-detail-sub">Sukhumvit Soi 26</div>
                </div>
                <div className="location-detail-cell">
                  <div className="location-detail-label">Dates</div>
                  <div className="location-detail-value">13 – 15 April</div>
                  <div className="location-detail-sub">2026 · 3 days only</div>
                </div>
                <div className="location-detail-cell">
                  <div className="location-detail-label">BTS Station</div>
                  <div className="location-detail-value">Phrom Phong</div>
                  <div className="location-detail-sub">Exit 4 · ~450 m walk</div>
                </div>
                <div className="location-detail-cell">
                  <div className="location-detail-label">District</div>
                  <div className="location-detail-value">Wattana</div>
                  <div className="location-detail-sub">Bangkok, Thailand</div>
                </div>
              </div>
            </div>

            {/* Right — venue card */}
            <div className="location-map-card reveal" ref={addRevealRef}>
              <div className="location-map-accent" />
              <div className="location-map-body">
                <div className="location-venue-name">
                  CHAPTER<br /><span>MARKET</span>
                </div>
                <div className="location-address-block">
                  <div className="location-address-line">
                    <span className="location-address-line-icon">✦</span>
                    Sukhumvit Soi 26, Khlong Toei Nuea
                  </div>
                  <div className="location-address-line">
                    <span className="location-address-line-icon">✦</span>
                    Wattana, Bangkok 10110
                  </div>
                  <div className="location-address-line">
                    <span className="location-address-line-icon">✦</span>
                    Thailand
                  </div>
                </div>
                <div className="location-divider" />
                <div className="bts-row">
                  <div className="bts-badge">BTS Phrom Phong</div>
                  <div className="bts-walk">Exit 4 · approx. 450 m walk</div>
                </div>
              </div>
              <div className="location-dates-strip">
                <div className="location-dates-label">Event Dates</div>
                <div className="location-dates-value">13 – 15 APRIL 2026</div>
              </div>
            </div>

          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="book" className="site-footer">
          <div className="footer-logo">CHAPTER MARKET</div>
          <div className="footer-tagline">Songkran of Culture Community & Fun</div>
          <div className="footer-cta">
            <a href="https://stripe.com/en-th" className="cta-btn_footer">
              <span>Book Now — 2,000 THB</span>
            </a>
          </div>
          <div className="footer-copy">© 2026 Chapter Market · Sukhumvit Soi 26, Bangkok, Thailand</div>
        </footer>

      </div>
    </>
  );
}
