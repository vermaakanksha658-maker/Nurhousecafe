import { useEffect, useState } from 'react';
import './Hero.css';

const DESKTOP_IMAGE = '/photos/hero-2.jpg';
const MOBILE_IMAGE = '/photos/ig-06.jpg';

export default function Hero() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="home" className="hero">
      <div className="hero-bg-wrap" aria-hidden="true">
        <div
          className="hero-bg hero-bg-desktop is-active"
          style={{ backgroundImage: `url(${DESKTOP_IMAGE})` }}
        ></div>
        <div
          className="hero-bg hero-bg-mobile is-active"
          style={{ backgroundImage: `url(${MOBILE_IMAGE})` }}
        ></div>
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content container">
        <span className="hero-script">Somali coffee house &middot; Minneapolis</span>
        <h1 className="hero-title">
          Rich flavours,
          <br />
          <em>warm</em> moments.
        </h1>
        <p className="hero-sub">
          Good coffee. Good mood. Great memories. — Somali-inspired drinks and fresh
          housemade bakes at <strong>Nur House Cafe</strong>.
        </p>
        <div className="hero-cta">
          <a href="#reserve" className="btn btn-primary">
            Reserve a Table
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </a>
          <a href="#menu" className="hero-link">
            Explore Menu
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        <div className="hero-trust">
          <span className="hero-stars" aria-hidden="true">★★★★★</span>
          <span>4.5 &middot; 120+ Google Reviews</span>
          <span className="hero-trust-dot">&middot;</span>
          <span>Dine-in &amp; Takeaway</span>
        </div>
      </div>

      <a href="#story" className={`hero-scroll ${atTop ? 'is-shown' : ''}`} aria-label="Scroll down">
        <span></span>
      </a>
    </header>
  );
}
