import { useState } from 'react';

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Back to original working URL, only changed seed to Sara
  const avatarUrl = "https://api.dicebear.com/9.x/lorelei/svg?seed=Sara&glassesProbability=100&backgroundColor=7c3aed&hairColor=000000";

  return (
    <header>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src={avatarUrl} 
          alt="Avatar of Loza" 
          style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '50%',
            objectFit: 'cover',
            backgroundColor: '#7c3aed'
          }}
        />
        <div className="logo">LYA.</div>
      </div>
      
      <nav id="primary-navigation" className={isMenuOpen ? 'is-open' : ''}>
        <ul>
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="#education" onClick={() => setIsMenuOpen(false)}>Education & Skills</a></li>
          <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        </ul>
      </nav>

      <div className="header-actions">
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme} 
          type="button"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="theme-toggle-circle">
            {isDarkMode ? '🌙' : '☀️'}
          </div>
        </button>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-icon" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}