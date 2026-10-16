import { useEffect, useRef, useState } from 'react';

const educationCards = [
  {
    title: 'Technical & Digital Skills',
    content: (
      <ul>
        <li><strong>Web Development:</strong> HTML5, CSS3, JavaScript, React, Next.js, Python</li>
        <li><strong>Developer Tools:</strong> Git, GitHub, VS Code</li>
        <li><strong>Design Tools:</strong> Graphic Design, UI/UX, Canva, Digital Layouts</li>
        <li><strong>AI Engineering:</strong> AI Prompt Engineering</li>
      </ul>
    ),
  },
  {
    title: 'Leadership & Tutoring',
    content: (
      <ol className="education-leadership-list">
        <li><strong>Academic Tutoring:</strong> Over 8 years tutoring National Curriculum (Grades 4–12).</li>
        <li><strong>EHPSA Leadership:</strong> Vice Director for EHPSA Hawassa Volunteer Branch.</li>
        <li><strong>Media Leadership:</strong> Marketing Team Content Leader & Graduation Graphic Designer.</li>
      </ol>
    ),
  },
];

export default function Education() {
  const [selectedCard, setSelectedCard] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (selectedCard && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedCard]);

  const closeDialog = () => dialogRef.current?.close();

  return (
    <main id="education">
      <section>
        <h2 style={{ fontFamily: 'var(--heading-font)', marginBottom: '1rem' }}>Academic & Clinical Background</h2>
        <p style={{ marginBottom: '1.5rem' }}>Summary of formal education, professional licensure, and clinical internship rotations:</p>

        <table>
          <caption>Educational History & Clinical Experience</caption>
          <thead>
            <tr>
              <th scope="col">Qualification / Role</th>
              <th scope="col">Institution / Location</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>B.Sc. in Medical Radiology Technology</td>
              <td>Hawassa University College of Medicine</td>
              <td>Graduated March 2026 (CGPA: 3.84 - Great Distinction)</td>
            </tr>
            <tr>
              <td>Licensed Medical Radiology Technologist</td>
              <td>Ministry of Health, Ethiopia</td>
              <td>Active Professional Practice License</td>
            </tr>
            <tr>
              <td>Clinical Radiology Intern</td>
              <td>Hawassa University & Adare Hospitals</td>
              <td>X-ray, MRI, and CT Scan Rotations</td>
            </tr>
            <tr>
              <td>Ultrasound Clinical Intern</td>
              <td>Tirunesh Beijing, Hawela Tula & Fiyel Bet</td>
              <td>Diagnostic Ultrasound Examinations</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="cards-grid education-cards">
        {educationCards.map((card) => (
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
      </section>

      <dialog
        className="project-dialog"
        ref={dialogRef}
        aria-labelledby="education-dialog-title"
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
            <h3 id="education-dialog-title">{selectedCard.title}</h3>
            <div className="about-dialog-details">{selectedCard.content}</div>
          </div>
        )}
      </dialog>
    </main>
  );
}