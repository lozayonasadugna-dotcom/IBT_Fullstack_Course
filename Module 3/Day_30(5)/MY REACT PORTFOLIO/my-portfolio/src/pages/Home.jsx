import { useState, useEffect } from 'react';

const titles = [
  'Full Stack Developer Trainee', 
  'Medical Radiology Technologist', 
  'Graphic Designer'
];

export default function Home() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <main id="home">
      <section className="hero">
        <div className="hero-text-content">
          <span className="availability-badge">🟢 Hybrid or Freelance (Onsite / Offsite)</span>
          <p className="hero-subtitle">Welcome to my official space</p>
          <h1 className="hero-title">LOZA YONAS</h1>

          <div className="typing-container">
            <span>{text}</span>
            <span className="cursor-blink">&nbsp;</span>
          </div>

          <p className="hero-description">
            Licensed Medical Radiology Technologist bridging healthcare diagnostic precision with modern software development and graphic design.
          </p>

          <div className="social-links">
            {/* Email Icon */}
            <a 
              href="mailto:lozayonasadugna@gmail.com" 
              className="social-icon" 
              title="Email Me"
              target="_blank" 
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>

            {/* Telegram Icon */}
            <a 
              href="https://t.me/dirkoshfirfir" 
              className="social-icon" 
              title="Telegram"
              target="_blank" 
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.05-.75 4.12-1.79 6.87-2.97 8.25-3.55 3.93-1.64 4.74-1.93 5.28-1.93.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.16-.04.29z"/>
              </svg>
            </a>

            {/* GitHub Icon */}
            <a 
              href="https://github.com/lozayonasadugna-dotcom" 
              className="social-icon" 
              title="GitHub"
              target="_blank" 
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a 
              href="https://www.linkedin.com/in/loza-yonas-1613652a1" 
              className="social-icon" 
              title="LinkedIn"
              target="_blank" 
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
          </div>

          <a href="#contact" style={{ 
            display: 'inline-block',
            padding: '0.8rem 1.8rem', 
            background: 'var(--primary-color)', 
            color: '#fff', 
            textDecoration: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold' 
          }}>
            Hire Me ↓
          </a>
        </div>

        <div className="hero-image-wrapper">
          <img src="/profile1.jpg" alt="Profile photo of Loza Yonas Adugna" />
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">20+</span><span className="stat-label">Projects Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">6+</span><span className="stat-label">Certificates Earned</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">1</span><span className="stat-label">Active Medical License</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">3.84</span><span className="stat-label">Graduation CGPA</span>
        </div>
      </section>
    </main>
  );
}