import { useState } from 'react';
import './Navbar.css';

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const avatarUrl =
    'https://api.dicebear.com/9.x/lorelei/svg?seed=Sara&glassesProbability=100&backgroundColor=7c3aed&hairColor=000000';

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education & Skills', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <img
          src={avatarUrl}
          alt="Avatar of Loza"
          className="navbar-avatar"
        />

        <div className="logo">LYA.</div>
      </div>

      <nav
        id="mobile-navigation"
        className={`navbar-navigation ${isMenuOpen ? 'menu-open' : ''}`}
        aria-label="Main navigation"
      >
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar-actions">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="theme-toggle-circle">
            {isDarkMode ? '🌙' : '☀️'}
          </div>
        </button>

        <button
          type="button"
          className={`hamburger-btn ${isMenuOpen ? 'hamburger-active' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}