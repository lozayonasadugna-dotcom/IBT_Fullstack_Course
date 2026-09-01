import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      const tag = e.target.tagName.toLowerCase();
      // If we hover over a link, button, or card, enlarge the cursor
      if (tag === 'a' || tag === 'button' || e.target.closest('.info-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div>
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`} 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
      
      {/* All sections render on one page for scrolling */}
      <Home />
      <About />
      <Education />
      <Projects />
      <Contact />
      
      <Footer />
    </div>
  );
}