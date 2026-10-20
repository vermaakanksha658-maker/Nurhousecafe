import { useState, useEffect } from 'react';
import './Preloader.css';

const KEY = 'cocoa-preloader-shown';

if (typeof window !== 'undefined' && location.pathname !== '/' && sessionStorage.getItem(KEY) !== '1') {
  sessionStorage.setItem(KEY, '1');
}

export default function Preloader() {
  const [ran] = useState(() => sessionStorage.getItem(KEY) === '1');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (ran) return;
    sessionStorage.setItem(KEY, '1');
    const timer = setTimeout(() => setHidden(true), 1400);
    return () => clearTimeout(timer);
  }, [ran]);

  if (ran) return null;

  return (
    <div className={`preloader ${hidden ? 'preloader-done' : ''}`} aria-hidden={hidden}>
      <div className="pre-img">
        <svg className="pre-crown" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M14 22h28v16a10 10 0 0 1-10 10h-8a10 10 0 0 1-10-10V22z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M42 25h4a6 6 0 0 1 0 12h-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 54h36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 6c0 3-2.4 3.8-2.4 6.6M34 5.4c0 3-2.4 3.8-2.4 6.6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <p className="pre-logo">
        <span className="pre-script">Nur</span> House Cafe
      </p>
      <span className="pre-progress"><span></span></span>
    </div>
  );
}