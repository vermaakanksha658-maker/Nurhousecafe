import { useEffect, useState } from 'react';
import './Hero.css';

function HeroCup() {
  return (
    <svg className="hero-cup-svg" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="hGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#b08d4c" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#b08d4c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hCoffee" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#d4a050" />
          <stop offset="40%" stopColor="#a06828" />
          <stop offset="100%" stopColor="#5c3a1e" />
        </radialGradient>
        <linearGradient id="hCup" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#f5f0e8" />
          <stop offset="100%" stopColor="#d8ccb4" />
        </linearGradient>
        <linearGradient id="hSaucer" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5e8c8" />
          <stop offset="100%" stopColor="#d4b878" />
        </linearGradient>
        <linearGradient id="hSteam" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#b08d4c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#b08d4c" stopOpacity="0" />
        </linearGradient>
        <filter id="hShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0a1f14" floodOpacity="0.35" />
        </filter>
      </defs>

      <circle cx="240" cy="230" r="210" fill="url(#hGlow)" />

      <g opacity="0.8">
        <ellipse cx="100" cy="140" rx="14" ry="9.5" fill="#5c3a1e" transform="rotate(-35 100 140)" />
        <path d="M91 137 Q96 139 109 143" stroke="#2a1508" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-35 100 140)" />
        <ellipse cx="370" cy="100" rx="13" ry="9" fill="#6b3f1d" transform="rotate(25 370 100)" />
        <path d="M361 97 Q366 99 379 103" stroke="#2a1508" strokeWidth="1.4" strokeLinecap="round" transform="rotate(25 370 100)" />
        <ellipse cx="400" cy="180" rx="11" ry="7.5" fill="#5c3a1e" transform="rotate(-20 400 180)" />
        <ellipse cx="80" cy="250" rx="10" ry="7" fill="#7a4a22" transform="rotate(40 80 250)" />
        <ellipse cx="420" cy="280" rx="12" ry="8" fill="#6b3f1d" transform="rotate(-45 420 280)" />
      </g>

      <ellipse cx="240" cy="390" rx="155" ry="32" fill="#c4a868" filter="url(#hShadow)" />
      <ellipse cx="240" cy="385" rx="150" ry="29" fill="url(#hSaucer)" />
      <ellipse cx="240" cy="382" rx="135" ry="25" fill="#f5e8c8" />

      <path d="M155 250 Q148 360 175 390 L305 390 Q332 360 325 250 Z" fill="url(#hCup)" filter="url(#hShadow)" />
      <path d="M155 250 Q148 360 175 390 L240 390 L240 250 Z" fill="#ffffff" opacity="0.4" />

      <ellipse cx="240" cy="250" rx="88" ry="26" fill="#e8e0d0" />
      <ellipse cx="240" cy="248" rx="82" ry="23" fill="#d8ccb4" />
      <ellipse cx="240" cy="246" rx="76" ry="20" fill="url(#hCoffee)" />

      <ellipse cx="222" cy="242" rx="24" ry="8" fill="#d4a050" opacity="0.35" />
      <ellipse cx="215" cy="240" rx="10" ry="4" fill="#e8c07a" opacity="0.3" />

      <path d="M325 278 Q375 278 378 320 Q381 360 330 368" stroke="#e8e0d0" strokeWidth="16" fill="none" strokeLinecap="round" filter="url(#hShadow)" />
      <path d="M325 278 Q372 278 375 320 Q378 356 330 363" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round" />

      <path d="M210 200 Q206 175 214 155 Q222 135 216 115" stroke="url(#hSteam)" strokeWidth="3" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M210 200 Q206 175 214 155 Q222 135 216 115;M210 200 Q214 172 206 152 Q198 132 208 112;M210 200 Q206 175 214 155 Q222 135 216 115" dur="4s" repeatCount="indefinite" />
      </path>
      <path d="M240 195 Q244 170 236 150 Q228 130 238 110" stroke="url(#hSteam)" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M240 195 Q244 170 236 150 Q228 130 238 110;M240 195 Q236 167 244 147 Q252 127 242 107;M240 195 Q244 170 236 150 Q228 130 238 110" dur="5s" repeatCount="indefinite" />
      </path>
      <path d="M268 202 Q272 178 264 158 Q256 138 264 118" stroke="url(#hSteam)" strokeWidth="2" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M268 202 Q272 178 264 158 Q256 138 264 118;M268 202 Q264 175 272 155 Q280 135 270 115;M268 202 Q272 178 264 158 Q256 138 264 118" dur="4.5s" repeatCount="indefinite" />
      </path>

      <ellipse cx="165" cy="395" rx="13" ry="8.5" fill="#5c3a1e" transform="rotate(-25 165 395)" />
      <path d="M156 392 Q161 394 174 398" stroke="#2a1508" strokeWidth="1.4" strokeLinecap="round" transform="rotate(-25 165 395)" />
      <ellipse cx="320" cy="392" rx="12" ry="8" fill="#6b3f1d" transform="rotate(20 320 392)" />
      <path d="M312 389 Q317 391 328 395" stroke="#2a1508" strokeWidth="1.3" strokeLinecap="round" transform="rotate(20 320 392)" />
    </svg>
  );
}

export default function Hero() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const strength = 8;
    const onMove = (e) => {
      const btn = e.target.closest?.('.hero-btn');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      btn.style.setProperty('--mag-x', `${(dx * strength).toFixed(1)}px`);
      btn.style.setProperty('--mag-y', `${(dy * 6).toFixed(1)}px`);
    };
    const onLeave = (e) => {
      const btn = e.target.closest?.('.hero-btn');
      if (!btn) return;
      btn.style.setProperty('--mag-x', '0px');
      btn.style.setProperty('--mag-y', '0px');
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <header id="home" className="hero">
      <div className="hero-bg-deco" aria-hidden="true">
        <span className="hbean hbean-1"></span>
        <span className="hbean hbean-2"></span>
        <span className="hbean hbean-3"></span>
        <span className="hbean hbean-4"></span>
        <span className="hbean hbean-5"></span>
        <span className="hbean hbean-6"></span>
      </div>

      <div className="hero-cup-wrap" aria-hidden="true">
        <HeroCup />
      </div>

      <div className="hero-inner container">
        <div className="hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden="true"></span>
            SOMALI COFFEE HOUSE · MINNEAPOLIS
          </span>

          <h1 className="hero-title">
            Rich flavours,
            <br />
            <em>warm</em> moments.
          </h1>

          <p className="hero-sub">
            Good coffee. Good mood. Great memories. — Somali-inspired drinks and
            fresh housemade bakes at <strong>Nur House Cafe</strong>.
          </p>

          <div className="hero-cta">
            <a href="#reserve" className="hero-btn hero-btn-explore">
              Reserve a Table
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </a>
            <a href="#menu" className="hero-btn hero-btn-outline">
              Explore Menu
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>

          <div className="hero-rating">
            <span className="hero-rating-stars" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </span>
            <span className="hero-rating-text">4.5 · 150+ Google Reviews</span>
            <span className="hero-rating-sep" aria-hidden="true">·</span>
            <span className="hero-rating-text">Dine-in &amp; Takeaway</span>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">01</span>
            <span className="hero-stat-label">FIND US</span>
            <span className="hero-stat-value">515 S 4th St</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">02</span>
            <span className="hero-stat-label">TODAY</span>
            <span className="hero-stat-value">6:30 AM – 8:00 PM</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">03</span>
            <span className="hero-stat-label">RATED</span>
            <span className="hero-stat-value">4.5 ★ · 155+</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">04</span>
            <span className="hero-stat-label">PROUDLY</span>
            <span className="hero-stat-value">Somali-owned</span>
          </div>
        </div>
      </div>

      <a href="#story" className={`hero-scroll ${atTop ? 'is-shown' : ''}`} aria-label="Scroll down">
        <span></span>
      </a>
    </header>
  );
}
