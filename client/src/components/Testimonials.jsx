import { useState, useEffect, useRef } from 'react';
import useInView from '../hooks/useInView.js';
import './Testimonials.css';

const fallbackReviews = [
  {
    _id: 'g1',
    name: 'Sara Mohamed',
    role: 'Google Review · Local Guide',
    text: 'The salted date caramel latte is unlike anything else downtown. Cozy green interior, friendly staff and genuinely great coffee — a true neighbourhood gem.',
    initials: 'SM',
  },
  {
    _id: 'g2',
    name: 'Daniel Reyes',
    role: 'Google Review',
    text: 'Came for the matcha, stayed for the cardamom loaf. Great spot to work in the morning with plenty of light and outlets.',
    initials: 'DR',
  },
  {
    _id: 'g3',
    name: 'Amina Warsame',
    role: 'Google Review · Local Guide',
    text: 'Love that the menu reflects so many cultures — the Somali shaah and Vietnamese egg coffee were both fantastic.',
    initials: 'AW',
  },
  {
    _id: 'g4',
    name: 'Jordan Blake',
    role: 'Google Review',
    text: 'Nice outdoor seating by the Commons. Croissants were warm and flaky. Will be back.',
    initials: 'JB',
  },
  {
    _id: 'g5',
    name: 'Mei Chen',
    role: 'Google Review · Local Guide',
    text: 'Triple berry matcha is a must-try. Staff were attentive and the space feels calm even when it is busy.',
    initials: 'MC',
  },
  {
    _id: 'g6',
    name: 'Ahmed Nur',
    role: 'Google Review',
    text: 'Beautiful spot across from the stadium. The bakes are fresh and the coffee is top notch.',
    initials: 'AN',
  },
];

const RING = 2 * Math.PI * 15;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function initialsOf(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Stars({ rating = 5 }) {
  const n = Math.round(Number(rating) || 5);
  return (
    <div className="stars" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= n ? 'star-on' : 'star-off'}>
          ★
        </span>
      ))}
    </div>
  );
}

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4.5" width="4" height="15" rx="1.2" />
      <rect x="14" y="4.5" width="4" height="15" rx="1.2" />
    </svg>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reviews, setReviews] = useState(fallbackReviews);
  const [fromApi, setFromApi] = useState(false);
  const [headRef, headIn] = useInView();
  const [viewRef, viewIn] = useInView();
  const viewportRef = useRef(null);
  const startX = useRef(null);
  const count = reviews.length;

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reviews?limit=8')
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => [])
      .then((list) => {
        if (cancelled || !Array.isArray(list) || list.length === 0) return;
        const mapped = list
          .filter((r) => r && r.name)
          .map((r) => ({
            _id: r._id,
            name: r.name,
            role: 'Verified guest',
            text: String(r.comment || '').trim() || 'Loved the coffee here.',
            rating: Number(r.rating) || 5,
            initials: initialsOf(r.name),
            photo: '',
          }));
        if (mapped.length > 0) {
          setReviews(mapped);
          setFromApi(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setIndex((i) => (i >= count ? 0 : i));
  }, [count]);

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    if (paused || count < 2 || !viewIn) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count, viewIn]);

  useEffect(() => {
    if (!viewIn || count < 2) return undefined;
    const onKey = (e) => {
      const el = document.activeElement;
      if (el && /input|textarea|select/i.test(el.tagName)) return;
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewIn, count]);

  const onPointerDown = (e) => {
    startX.current = e.clientX;
  };

  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx < -45) next();
    else if (dx > 45) prev();
  };

  const onMove = (e) => {
    if (prefersReducedMotion()) return;
    const vp = viewportRef.current;
    if (!vp) return;
    const r = vp.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    vp.style.setProperty('--gx', `${px * 100}%`);
    vp.style.setProperty('--gy', `${py * 100}%`);
    vp.style.setProperty('--ry', `${(px - 0.5) * 6}deg`);
    vp.style.setProperty('--rx', `${(0.5 - py) * 6}deg`);
  };

  const onLeaveViewport = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.style.setProperty('--rx', '0deg');
    vp.style.setProperty('--ry', '0deg');
    vp.style.setProperty('--gx', '50%');
    vp.style.setProperty('--gy', '50%');
  };

  return (
    <section className="section-pad testi">
      <span className="testi-fx" aria-hidden="true">
        <span className="testi-fx-quote">”</span>
        <span className="testi-fx-dot"></span>
        <span className="testi-fx-dot"></span>
        <span className="testi-fx-dot"></span>
      </span>

      <div className="testi-ambient" aria-hidden="true">
        <span className="testi-float-quote">”</span>
        <span className="testi-float-quote testi-fq-2">”</span>
        <span className="testi-stain"></span>
        <span className="testi-stain testi-stain-2"></span>
        <span className="testi-glow"></span>
        <span className="testi-glow testi-glow-2"></span>
        <span className="testi-wisp"></span>
        <span className="testi-wisp"></span>
        <span className="testi-wisp"></span>
        <span className="testi-wisp"></span>
        <span className="testi-spark"></span>
        <span className="testi-spark"></span>
        <span className="testi-spark"></span>
        <span className="testi-spark"></span>
        <span className="testi-spark"></span>
        <span className="testi-spark"></span>
      </div>

      <div className="container">
        <div className={`section-head reveal ${headIn ? 'in-view' : ''}`} ref={headRef}>
          <span className="kicker">kind words</span>
          <h2 className="section-title">Loved by Our Guests</h2>
          <div className="divider"></div>
        </div>

        <div className="testi-summary">
          <span className="testi-score">4.5</span>
          <span className="testi-summary-body">
            <Stars rating={4.5} />
            <span className="testi-summary-text">
              {fromApi ? `${count} verified guest ${count === 1 ? 'story' : 'stories'}` : '120+ Google reviews'}
            </span>
          </span>
          <span className="testi-verified">
            <VerifiedIcon />
            Verified guests
          </span>
        </div>

        <div
          className={`testi-slider ${viewIn ? 'testi-slider-in' : ''} ${paused ? 'is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="testi-viewport"
            ref={(el) => {
              viewportRef.current = el;
              viewRef.current = el;
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onMouseMove={onMove}
            onMouseLeave={onLeaveViewport}
          >
            <div className="testi-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {reviews.map((r, i) => (
                <figure className={`testi-card ${i === index ? 'is-active' : ''}`} key={r._id}>
                  <div className="testi-fade" key={`${r._id}-${index}`}>
                    <span className="testi-quote">“</span>
                    <Stars rating={r.rating} />
                    <blockquote>{r.text}</blockquote>
                    <figcaption>
                      <span className="testi-avatar">
                        {r.photo ? (
                          <img src={r.photo} alt="" loading="lazy" />
                        ) : (
                          <span className="testi-avatar-initials">{r.initials}</span>
                        )}
                        <span className="testi-avatar-ring" aria-hidden="true"></span>
                      </span>
                      <span className="testi-person">
                        <strong>{r.name}</strong>
                        <small>{r.role}</small>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>

          <div className="testi-controls">
            <button className="testi-arrow testi-prev" onClick={prev} aria-label="Previous review">
              ‹
            </button>

            <div className="testi-dots">
              {reviews.map((r, i) => (
                <button
                  key={r._id}
                  className={`testi-dot ${i === index ? 'testi-dot-active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === index}
                >
                  {i === index && count > 1 && (
                    <svg className="testi-ring" viewBox="0 0 36 36" aria-hidden="true">
                      <circle className="testi-ring-fill" cx="18" cy="18" r="15" style={{ strokeDasharray: RING, strokeDashoffset: RING }} key={index} />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {count > 1 && (
              <button
                type="button"
                className="testi-toggle"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Resume review rotation' : 'Pause review rotation'}
                aria-pressed={paused}
                title={paused ? 'Resume rotation' : 'Pause rotation'}
              >
                {paused ? <PlayIcon /> : <PauseIcon />}
              </button>
            )}

            <button className="testi-arrow testi-next" onClick={next} aria-label="Next review">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
