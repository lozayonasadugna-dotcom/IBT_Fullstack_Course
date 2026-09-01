export default function Navbar({ isDarkMode, toggleTheme }) {
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
      
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education & Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme} 
          title="Toggle Dark Mode"
        >
          <div className="theme-toggle-circle">
            {isDarkMode ? '🌙' : '☀️'}
          </div>
        </button>
      </nav>
    </header>
  );
}