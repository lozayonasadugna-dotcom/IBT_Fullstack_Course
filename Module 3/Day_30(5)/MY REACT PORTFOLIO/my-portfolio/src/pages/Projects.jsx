export default function Projects() {
  return (
    <main id="projects">
      <section>
        <h2 style={{ fontFamily: 'var(--heading-font)', marginBottom: '2rem' }}>Featured Projects</h2>

        <div className="cards-grid">
          {/* Project 1: Sheger Transit */}
          <article className="info-card">
            <img 
              src="/sheger-transit.png" 
              alt="Sheger Transit App Screenshot" 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} 
            />
            <h3>1. Sheger Transit Web App</h3>
            <p>A web application built to assist commuters in navigating transit routes and local public transportation in Addis Ababa.</p>
            <p style={{ marginTop: '0.5rem' }}><strong>Technologies:</strong> HTML5, CSS3, JavaScript, Git</p>
            <p style={{ marginTop: '0.5rem' }}>
              <a 
                href="https://github.com/lozayonasadugna-dotcom" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
              >
                View on GitHub
              </a>
            </p>
          </article>

          {/* Project 2: Personal Portfolio */}
          <article className="info-card">
            <img 
              src="/project1.png" 
              alt="Personal Portfolio Screenshot" 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} 
            />
            <h3>2. Personal Developer Portfolio</h3>
            <p>An accessible, responsive site showcasing my software development journey, medical background, and leadership credentials.</p>
            <p style={{ marginTop: '0.5rem' }}><strong>Technologies:</strong> HTML5, CSS3, Git, GitHub</p>
            <p style={{ marginTop: '0.5rem' }}>
              <a 
                href="https://github.com/lozayonasadugna-dotcom" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
              >
                View on GitHub
              </a>
            </p>
          </article>

          {/* Project 3: Dala Studio */}
          <article className="info-card">
            <img 
              src="/project2.png" 
              alt="Dala Studio Website Screenshot" 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} 
            />
            <h3>3. Dala Studio Web Layout</h3>
            <p>Responsive interface design project built during software bootcamp coursework, emphasizing clean UI structure.</p>
            <p style={{ marginTop: '0.5rem' }}><strong>Technologies:</strong> HTML5, CSS Layouts, Responsive Design</p>
          </article>

          {/* Project 4: Graphic Design Hub */}
          <article className="info-card">
            <img 
              src="/project3.png" 
              alt="Graphic Design Hub Screenshot" 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} 
            />
            <h3>4. Graphic Design & Media Hub</h3>
            <p>Promotional graphics, marketing campaign assets, and digital layouts designed for graduation committees and organizations.</p>
            <p style={{ marginTop: '0.5rem' }}><strong>Technologies:</strong> Canva, Visual Layout Tools, Graphic Design</p>
          </article>
        </div>
      </section>
    </main>
  );
}