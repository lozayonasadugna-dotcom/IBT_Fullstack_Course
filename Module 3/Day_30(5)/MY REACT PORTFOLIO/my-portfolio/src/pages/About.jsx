export default function About() {
  return (
    <main id="about">
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img 
            src="/profile.jpg" 
            alt="Loza Yonas" 
            className="passport-circle" 
          />
          <h2 style={{ fontFamily: 'var(--heading-font)', fontSize: '2.5rem' }}>About Me</h2>
        </div>

        <div className="cards-grid">
          {/* Card 1: Biography */}
          <article className="info-card">
            <h3>Biography & Overview</h3>
            <p>
              I am a <strong>Licensed Medical Radiology Technologist</strong> and full-stack developer trainee based in Addis Ababa, Ethiopia.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              My background bridges clinical healthcare diagnostic precision with modern full-stack web development, AI engineering, graphic design, and public service leadership.
            </p>
          </article>

          {/* Card 2: Clinical Credentials */}
          <article className="info-card">
            <h3>Licensure & Credentials</h3>
            <ul>
              <li><strong>Active Professional Practice License:</strong> Medical Radiology Technologist.</li>
              <li><strong>Academic Standing:</strong> Graduated with Great Distinction (CGPA: 3.84/4.00) from Hawassa University College of Medicine & Health Sciences.</li>
              <li><strong>Clinical Rotations:</strong> Hands-on experience in X-ray, CT, MRI, and Clinical Ultrasound across specialized and primary care centers.</li>
            </ul>
          </article>

          {/* Card 3: Model United Nations (MUN) */}
          <article className="info-card">
            <img 
              src="/certificateMUN1.jpg" 
              alt="Model United Nations Conference" 
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'cover', 
                borderRadius: '8px', 
                marginBottom: '1rem' 
              }} 
            />
            <h3>Model United Nations (MUN)</h3>
            <p style={{ marginBottom: '0.75rem' }}>Active delegate engaged in diplomacy, international relations, and multilateral debate:</p>
            
            <div style={{ marginBottom: '0.75rem', paddingLeft: '0.5rem', borderLeft: '3px solid var(--primary-color)' }}>
              <strong>UN General Assembly (UNGA)</strong><br />
              <em>Delegate:</em> Loza Yonas | <em>Country:</em> The Republic of Chile<br />
              <small><strong>Topic:</strong> Advancing Women’s Political Participation: Evaluating Feminist Approaches Versus Mandatory Gender Quotas</small>
            </div>

            <div style={{ paddingLeft: '0.5rem', borderLeft: '3px solid var(--primary-color)' }}>
              <strong>UN Security Council (UNSC)</strong><br />
              <em>Delegate:</em> Loza Yonas | <em>Country:</em> Colombia<br />
              <small><strong>Topic:</strong> Sovereignty vs. Impunity in Conflict Zones: Reconciling Accountability and Political Realities in Modern Conflict Zones</small>
            </div>
          </article>

          {/* Card 4: EHPSA Leadership & Community Outreach */}
          <article className="info-card">
             <img 
              src="/certificate1.jpg" 
              alt="EHPSA Leadership Certificate" 
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'cover', 
                borderRadius: '8px', 
                marginBottom: '1rem' 
              }} 
            />
            <h3>EHPSA Leadership & Social Impact</h3>
            <p><strong>Vice Director — EHPSA Hawassa Branch</strong></p>
            <p style={{ margin: '0.5rem 0' }}>Spearheaded health initiatives, First Aid courses, and impactful community outreach campaigns:</p>
            <ul>
              <li><strong>Street Children Support:</strong> Organized community fundraisers and provided footwear/shoes for street children.</li>
              <li><strong>Orphanage Outreach:</strong> Conducted visits and food donation campaigns for local orphanages.</li>
              <li><strong>Health Drives:</strong> Coordinated voluntary blood donation drives across campus and health centers.</li>
              <li><strong>School Outreach:</strong> Led the "Do It for the Sister" initiative distributing sanitary pads to public school students.</li>
            </ul>
          </article>

          {/* Card 5: Ayrese Tech Accelerator Bootcamp */}
          <article className="info-card">
            <img 
              src="/certificate.jpg" 
              alt="Ayrese Tech Accelerator Certificate" 
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'cover', 
                borderRadius: '8px', 
                marginBottom: '1rem' 
              }} 
            />
            <h3>Ayrese Tech Accelerator Bootcamp</h3>
            <p style={{ marginBottom: '0.75rem' }}>
              Completed intensive hands-on practical activities, real-world tech challenges, and domain exercises across 6 key tracks:
            </p>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', fontSize: '0.9rem' }}>
              <li>1. UI/UX & Product Design</li>
              <li>2. AI Essentials</li>
              <li>3. Web & AI Agent Dev</li>
              <li>4. Digital Marketing</li>
              <li>5. Blockchain & Web3</li>
              <li>6. Data Analysis & Insights</li>
            </ul>
          </article>
           {/* Card 6: Graphic Designer */}
          <article className="info-card">
            <img 
              src="/certificate2.jpg"
              alt="Graphic Design Certificate" 
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'cover', 
                borderRadius: '8px', 
                marginBottom: '1rem' 
              }} 
            />
            <h3>Graphic Designer</h3>
            <p><strong>Certificate of Completion</strong></p>
            <p style={{ margin: '0.5rem 0' }}>Developed creative designs for various projects, including branding, marketing materials, and digital content. for my Graduation class Committee and during ehpsa leaderships and also community based initiatives.</p>
          </article>
        </div>
      </section>
    </main>
  );
}