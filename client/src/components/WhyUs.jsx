import { useRef } from 'react';
import './WhyUs.css';
import useInView from '../hooks/useInView.js';

const features = [
  {
    num: '01',
    title: 'Signature Drinks',
    desc: 'Somali shaah, date lattes and matcha — every cup poured with care.',
    more: 'Housemade syrups and global flavours, made to order.',
    badges: ['Housemade syrups', 'Date lattes', 'Matcha bar'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 26a16 16 0 0 1 32 0z" />
        <path d="M6 26h36" />
        <circle cx="24" cy="15" r="2" fill="currentColor" stroke="none" />
        <path d="M14 26v8M34 26v8M24 26v10" />
        <ellipse cx="24" cy="41" rx="14" ry="3" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Fresh Bakes',
    desc: 'Croissants, cardamom loaf and pastries, baked fresh every morning.',
    more: 'Golden, flaky and straight from our oven — daily.',
    badges: ['Baked daily', 'Butter croissant', 'Cardamom loaf'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 20h24v10a12 12 0 0 1-24 0z" />
        <path d="M34 23h4a5 5 0 0 1 0 10h-4" />
        <path d="M17 15c0-4-3-5-2-9M26 15c1-4-2-5-1-9" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Community Space',
    desc: 'A welcoming room where everyone belongs — near the Commons and US Bank Stadium.',
    more: 'A light-filled spot for work, catch-ups and quiet mornings.',
    badges: ['All welcome', 'Work friendly', 'Neighbourhood'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="17" cy="15" r="5" />
        <circle cx="32" cy="18" r="4" />
        <path d="M8 38c0-6 4-10 9-10s9 4 9 10" />
        <path d="M27 38c0-5 3-8 7-8 4 0 7 3 7 8" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Cozy Ambience',
    desc: 'Green walls, natural light and a mood made for lingering.',
    more: 'Warm interiors that make every visit feel a little special.',
    badges: ['Green walls', 'Natural light', 'Stay a while'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 40l3-14h18l3 14H12z" />
        <path d="M17 26l7-14 7 14" />
        <path d="M24 12V7M14 16h4M30 16h4" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  const [listRef, listIn] = useInView();

  return (
    <section className="section-pad why">
      <div className="container">
        <div className="why-layout">
          <div className="why-intro">
            <div className="section-head section-head-left">
              <span className="kicker">why nur house</span>
              <h2 className="section-title why-title">More Than Just Coffee</h2>
              <div className="divider"></div>
            </div>

            <p className="why-lede">
              Four things we never cut corners on — poured, baked and hosted
              fresh at 515 S 4th St, Minneapolis.
            </p>

            <figure className="why-photo">
              <img src="/photos/ig-02.jpg" alt="Nur House cafe" loading="lazy" />
              <figcaption>hello, nur house — 515 s 4th st</figcaption>
            </figure>
          </div>

          <ol className="why-list" ref={listRef}>
            {features.map((f, i) => (
              <li
                className={`why-row${listIn ? ' in-view' : ''}`}
                key={f.title}
                style={{ '--d': `${i * 0.09}s` }}
              >
                <div className="why-row-mark" aria-hidden="true">
                  <span className="why-row-num">{f.num}</span>
                  <span className="why-row-icon">{f.icon}</span>
                </div>

                <div className="why-row-body">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <p className="why-row-more">{f.more}</p>
                  <span className="why-row-badges">
                    {f.badges.map((b) => (
                      <span className="why-badge" key={b}>
                        {b}
                      </span>
                    ))}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
