export default function Education() {
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

      <section className="cards-grid">
        <article className="info-card">
          <h3>Technical & Digital Skills</h3>
          <ul>
            <li><strong>Web Development:</strong> HTML5, CSS3, JavaScript, Python</li>
            <li><strong>Developer Tools:</strong> Git, GitHub, VS Code</li>
            <li><strong>Design Tools:</strong> Graphic Design, UI/UX, Canva, Digital Layouts</li>
            <li><strong>AI Engineering:</strong> AI Prompt Engineering</li>
          </ul>
        </article>

        <article className="info-card">
          <h3>Leadership & Tutoring</h3>
          <ol style={{ paddingLeft: '1.2rem' }}>
            <li style={{ marginBottom: '0.75rem' }}><strong>Academic Tutoring:</strong> Over 8 years tutoring National Curriculum (Grades 4–12).</li>
            <li style={{ marginBottom: '0.75rem' }}><strong>EHPSA Leadership:</strong> Vice Director for EHPSA Hawassa Volunteer Branch.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong>Media Leadership:</strong> Marketing Team Content Leader & Graduation Graphic Designer.</li>
          </ol>
        </article>
      </section>
    </main>
  );
}