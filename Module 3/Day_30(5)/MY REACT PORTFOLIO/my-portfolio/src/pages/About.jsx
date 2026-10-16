import { useEffect, useRef, useState } from 'react';

const aboutCards = [
  {
    title: 'Biography & Overview',
    content: (
      <>
        <p>
          I am a <strong>Licensed Medical Radiology Technologist</strong> and full-stack developer trainee based in Addis Ababa, Ethiopia.
        </p>
        <p>
          My background bridges clinical healthcare diagnostic precision with modern full-stack web development, AI engineering, graphic design, and public service leadership.
        </p>
      </>
    ),
  },
  {
    title: 'Licensure & Credentials',
    content: (
      <ul>
        <li><strong>Active Professional Practice License:</strong> Medical Radiology Technologist.</li>
        <li><strong>Academic Standing:</strong> Graduated with Great Distinction (CGPA: 3.84/4.00) from Hawassa University College of Medicine & Health Sciences.</li>
        <li><strong>Clinical Rotations:</strong> Hands-on experience in X-ray, CT, MRI, and Clinical Ultrasound across specialized and primary care centers.</li>
      </ul>
    ),
  },
  {
    title: 'Model United Nations (MUN)',
    image: '/certificateMUN1.jpg',
    imageAlt: 'Model United Nations Conference',
    content: (
      <>
        <p>Active delegate engaged in diplomacy, international relations, and multilateral debate:</p>
        <div className="about-card-highlight">
          <strong>UN General Assembly (UNGA)</strong><br />
          <em>Delegate:</em> Loza Yonas | <em>Country:</em> The Republic of Chile<br />
          <small><strong>Topic:</strong> Advancing Women’s Political Participation: Evaluating Feminist Approaches Versus Mandatory Gender Quotas</small>
        </div>
        <div className="about-card-highlight">
          <strong>UN Security Council (UNSC)</strong><br />
          <em>Delegate:</em> Loza Yonas | <em>Country:</em> Colombia<br />
          <small><strong>Topic:</strong> Sovereignty vs. Impunity in Conflict Zones: Reconciling Accountability and Political Realities in Modern Conflict Zones</small>
        </div>
      </>
    ),
  },
  {
    title: 'EHPSA Leadership & Social Impact',
    image: '/certificate1.jpg',
    imageAlt: 'EHPSA Leadership Certificate',
    content: (
      <>
        <p><strong>Vice Director — EHPSA Hawassa Branch</strong></p>
        <p>Spearheaded health initiatives, First Aid courses, and impactful community outreach campaigns:</p>
        <ul>
          <li><strong>Street Children Support:</strong> Organized community fundraisers and provided footwear/shoes for street children.</li>
          <li><strong>Orphanage Outreach:</strong> Conducted visits and food donation campaigns for local orphanages.</li>
          <li><strong>Health Drives:</strong> Coordinated voluntary blood donation drives across campus and health centers.</li>
          <li><strong>School Outreach:</strong> Led the "Do It for the Sister" initiative distributing sanitary pads to public school students.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Ayrese Tech Accelerator Bootcamp',
    image: '/certificate.jpg',
    imageAlt: 'Ayrese Tech Accelerator Certificate',
    content: (
      <>
        <p>
          Completed intensive hands-on practical activities, real-world tech challenges, and domain exercises across 6 key tracks:
        </p>
        <ul className="about-tracks">
          <li>1. UI/UX & Product Design</li>
          <li>2. AI Essentials</li>
          <li>3. Web & AI Agent Dev</li>
          <li>4. Digital Marketing</li>
          <li>5. Blockchain & Web3</li>
          <li>6. Data Analysis & Insights</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Graphic Designer',
    image: '/certificate2.jpg',
    imageAlt: 'Graphic Design Certificate',
    content: (
      <>
        <p><strong>Certificate of Completion</strong></p>
        <p>
          Developed creative designs for various projects, including branding, marketing materials, and digital content for my Graduation class Committee, EHPSA leadership, and community-based initiatives.
        </p>
      </>
    ),
  },
];

export default function About() {
  const [selectedCard, setSelectedCard] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (selectedCard && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedCard]);

  const closeDialog = () => dialogRef.current?.close();

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
          <p className="card-hint">Select a card to learn more about me.</p>
        </div>

        <div className="cards-grid">
          {aboutCards.map((card) => (
            <article className="info-card project-card" key={card.title}>
              <button
                className="project-card-trigger"
                type="button"
                onClick={() => setSelectedCard(card)}
                aria-label={`View details for ${card.title}`}
              >
                  <span>{card.title}</span>
                  <span className="project-card-prompt">View details <span aria-hidden="true">↗</span></span>
                </button>
            </article>
          ))}
        </div>
      </section>

      <dialog
        className="project-dialog"
        ref={dialogRef}
        aria-labelledby="about-dialog-title"
        onClose={() => setSelectedCard(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        {selectedCard && (
          <div className="project-dialog-content">
            <button className="project-dialog-close" type="button" onClick={closeDialog} aria-label="Close details">
              ×
            </button>
            {selectedCard.image && (
              <img src={selectedCard.image} alt={selectedCard.imageAlt} className="project-dialog-image" />
            )}
            <h3 id="about-dialog-title">{selectedCard.title}</h3>
            <div className="about-dialog-details">{selectedCard.content}</div>
          </div>
        )}
      </dialog>
    </main>
  );
}
