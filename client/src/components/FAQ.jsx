import { useState } from 'react';
import useInView from '../hooks/useInView.js';
import './FAQ.css';

const FAQS = [
  {
    q: 'Do you take reservations?',
    a: 'Yes — you can request a table through the Reserve form on this page. We hold your table for 15 minutes past your booking time, and walk-ins are always welcome when seats are free.',
  },
  {
    q: 'Where can I park near Nur House?',
    a: 'We are at 515 S 4th St, directly across from US Bank Stadium in downtown Minneapolis. Metered street parking and nearby ramps are available a short walk away.',
  },
  {
    q: 'Is there Wi-Fi and are laptops welcome?',
    a: 'Absolutely. We are a work-friendly, light-filled space with a calm morning crowd — perfect for a coffee and a few focused hours.',
  },
  {
    q: 'Can I book the space for a private event or catering?',
    a: 'For group events, catering or larger gatherings, give us a call at (952) 215-9181 or email hello@nurhousecafe.com and we will help you plan it.',
  },
  {
    q: 'Do you have vegan or dairy-free options?',
    a: 'Yes — oat and other plant-based milks are available for most drinks, alongside our matcha, cold brew and date lattes.',
  },
  {
    q: 'What are your opening hours?',
    a: 'We open early for the morning rush and stay open through the evening. Please check the live status in the header or the hours list in the Visit Us section for today’s times.',
  },
];

export default function FAQ() {
  const [headRef, headIn] = useInView();
  const [listRef, listIn] = useInView();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="section-pad faq">
      <div className="container faq-layout">
        <div className={`faq-intro section-head section-head-left reveal ${headIn ? 'in-view' : ''}`} ref={headRef}>
          <span className="kicker">good to know</span>
          <h2 className="section-title">Questions, Answered</h2>
          <div className="divider"></div>
          <p className="faq-lede">
            Planning a visit to Nur House? Here are the things guests ask us most —
            and if you need more, we are only a call away.
          </p>
          <a href="tel:+19522159181" className="btn btn-primary faq-btn">
            Call (952) 215-9181
          </a>
        </div>

        <div className={`faq-list ${listIn ? 'in-view' : ''}`} ref={listRef}>
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div className={`faq-item ${open ? 'is-open' : ''}`} key={f.q} style={{ '--d': `${i * 0.06}s` }}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                >
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-sign" aria-hidden="true"></span>
                </button>
                <div className="faq-a" id={`faq-panel-${i}`} role="region">
                  <div className="faq-a-inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
