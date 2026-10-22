import { useEffect, useState } from 'react';
import useOpenStatus from '../hooks/useOpenStatus.js';
import './Hero.css';

export default function Hero() {
  const [atTop, setAtTop] = useState(true);
  const status = useOpenStatus();

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="home" className="hero">
      <div className="hero-inner container">
        <div className="hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden="true"></span>
            COFFEE · CULTURE · COMMUNITY
            <span className="hero-eyebrow-line" aria-hidden="true"></span>
          </span>

          <h1 className="hero-title">
            Rich flavours,
            <br />
            <em>warm moments.</em>
          </h1>

          <p className="hero-sub">Good coffee. Good mood. Great memories.</p>

          <div className="hero-cta">
            <a href="#menu" className="hero-btn hero-btn-solid">
              Explore Menu
            </a>
            <a href="#reserve" className="hero-btn hero-btn-outline">
              Reserve a table
            </a>
          </div>
        </div>

        <div className="hero-foot">
          <div className="hero-foot-item hero-foot-status">
            <span className={`hero-foot-dot ${status.open ? 'is-open' : ''}`} aria-hidden="true"></span>
            {status.open ? 'OPEN NOW' : 'CLOSED'}
          </div>
          <div className="hero-foot-item">DOWNTOWN MINNEAPOLIS</div>
          <div className="hero-foot-item">12 YEARS OF BREWING</div>
        </div>
      </div>

      <a href="#story" className={`hero-scroll ${atTop ? 'is-shown' : ''}`} aria-label="Scroll down">
        <span></span>
      </a>
    </header>
  );
}
