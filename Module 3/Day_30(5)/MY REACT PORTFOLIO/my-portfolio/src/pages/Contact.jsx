export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! Your message has been sent successfully.');
  };

  return (
    <main id="contact">
      <section className="form-section">
        <h2 style={{ fontFamily: 'var(--heading-font)', marginBottom: '1rem', textAlign: 'center' }}>Get In Touch</h2>
        <p style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Feel free to reach out for software development projects, diagnostic consultations, tutoring, or general inquiries!
        </p>

        <form onSubmit={handleSubmit}>
          <fieldset style={{ border: '1px solid #e2d9f3', padding: '1.5rem 2rem', borderRadius: '12px' }}>
            <legend style={{ fontFamily: 'var(--heading-font)', color: 'var(--primary-color)', padding: '0 0.5rem', fontWeight: '600' }}>
              Contact Form
            </legend>

            <p style={{ marginBottom: '1rem' }}>
              <label htmlFor="fullname">Full Name:</label>
              <input type="text" id="fullname" name="fullname" required minLength={2} placeholder="Your Full Name" />
            </p>

            <p style={{ marginBottom: '1rem' }}>
              <label htmlFor="email">Email Address:</label>
              <input type="email" id="email" name="email" required placeholder="name@example.com" />
            </p>

            <p style={{ marginBottom: '1rem' }}>
              <label htmlFor="subject">Reason for Inquiry:</label>
              <select id="subject" name="subject" required defaultValue="">
                <option value="" disabled>-- Select an Option --</option>
                <option value="job">Job / Internship Opportunity</option>
                <option value="project">Software Project Collaboration</option>
                <option value="radiology">Radiology & Clinical Consultation</option>
                <option value="tutoring">Academic Tutoring Inquiry</option>
                <option value="general">General Inquiry</option>
              </select>
            </p>

            <p style={{ marginBottom: '1rem' }}>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows={5} required minLength={10} placeholder="Type your message here..."></textarea>
            </p>

            <button type="submit" style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: '#ffffff', 
              padding: '0.8rem 1.8rem', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '0.95rem', 
              fontWeight: '600', 
              cursor: 'pointer',
              width: '100%' 
            }}>
              Submit Message
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
}