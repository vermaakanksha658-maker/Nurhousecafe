import { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView.js';
import './Newsletter.css';

const perks = [
  {
    label: 'Weekly treats & updates',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="6.4" ry="9.4" transform="rotate(-18 12 12)" />
        <path d="M9.5 3.8c3.1 4.1 3.1 12.3 5.1 16.4" />
      </svg>
    ),
  },
  {
    label: 'Members-only offers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.6 12.2c0 4.1-3.8 7.4-8.6 7.4-1 0-2-.15-2.9-.43L4.4 21l1.3-3.7A7 7 0 0 1 3.4 12.2c0-4.1 3.8-7.4 8.6-7.4s8.6 3.3 8.6 7.4z" />
        <path d="M15 5.4 14.2 3.6M18.4 7.2l1.9-.5M9.6 5.4 8.8 3.6" />
      </svg>
    ),
  },
  {
    label: 'First dibs on new bakes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 15c1.5-3 4-4.6 7-4.6S16.5 12 18 15v3H3z" />
        <path d="M7 10.4c1-2 2.6-3.2 4.5-3.2M14.6 6.2c1.6.5 2.8 1.8 3.4 3.4" />
        <path d="M8 18v1.6M12 18v1.6M16 18v1.6" />
      </svg>
    ),
  },
];

const avatars = [
  '/photos/ig-02.jpg',
  '/photos/ig-04.jpg',
  '/photos/ig-05.jpg',
  '/photos/ig-06.jpg',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Envelope() {
  return (
    <div className="news-env-stage" aria-hidden="true">
      <svg className="news-env" viewBox="0 0 76 56" fill="none">
        <rect className="news-env-body" x="3" y="9" width="70" height="42" rx="7" stroke="currentColor" strokeWidth="2.4" />
        <path
          className="news-env-flap"
          d="M4 16 38 40 72 16"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path className="news-env-letter" d="M13 24h50v20a5 5 0 0 1-5 5H18a5 5 0 0 1-5-5z" fill="currentColor" opacity="0.16" />
        <path className="news-env-tick" d="M27 40l8 8 15-17" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="10" rx="2.4" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </svg>
  );
}

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [ref, inView] = useInView();
  const inputRef = useRef(null);
  const shakeTimer = useRef(null);

  useEffect(() => () => clearTimeout(shakeTimer.current), []);

  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address.');
      setShake(true);
      clearTimeout(shakeTimer.current);
      shakeTimer.current = setTimeout(() => setShake(false), 520);
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    setError('');
    setStatus('loading');
    window.setTimeout(() => {
      setSavedEmail(value);
      setStatus('done');
    }, 850);
  };

  return (
    <section id="newsletter" className="news">
      <div className={`container news-inner reveal ${inView ? 'in-view' : ''}`} ref={ref}>
        <div className="news-copy">
          <span className="kicker news-kicker">stay close</span>
          <h2 className="section-title news-title">Fresh Brew News, Straight to You</h2>
          <p className="news-sub">
            Drop your email &mdash; we&rsquo;ll share new dishes, combo offers and the
            occasional table-side surprise.
          </p>

          <ul className="news-perks">
            {perks.map((p) => (
              <li key={p.label}>
                <span className="news-perk-icon">{p.icon}</span>
                {p.label}
              </li>
            ))}
          </ul>

          <div className="news-proof">
            <span className="news-proof-avatars">
              {avatars.map((a) => (
                <img key={a} src={a} alt="" loading="lazy" />
              ))}
            </span>
            <span className="news-proof-text">
              Join our list for <strong>new dishes</strong>, combos &amp; offers
            </span>
          </div>
        </div>

        <div className="news-panel">
          <span className="news-panel-badge">Bean Club</span>
          <h3 className="news-panel-title">
            Free birthday brew <em>+</em> 10% off your first order
          </h3>

          {status === 'done' ? (
            <div className="news-done">
              <Envelope />
              <h4>You&rsquo;re on the list!</h4>
              <p>
                We&rsquo;ll send brew news and offers to <strong>{savedEmail}</strong>.
              </p>
              <a href="#reserve" className="news-done-btn">
                Reserve a table too
              </a>
            </div>
          ) : (
            <form className={`news-form ${shake ? 'is-shaking' : ''}`} onSubmit={submit} noValidate>
              <label className="news-field">
                <span>Email address</span>
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'news-error' : undefined}
                />
              </label>

              {error && (
                <p className="news-error" id="news-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="news-btn" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <span className="news-spinner" aria-hidden="true"></span>
                    Subscribing&hellip;
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>

              <p className="news-privacy">
                <LockIcon />
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
