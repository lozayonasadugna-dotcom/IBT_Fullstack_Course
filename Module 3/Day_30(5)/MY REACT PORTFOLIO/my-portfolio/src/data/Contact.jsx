import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! Your message has been received.');
    setFormData({ fullname: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="max-w-2xl mx-auto bg-white p-10 rounded-2xl border border-[#efe8fa] shadow-sm">
        <h2 className="text-3xl font-bold mb-3">Get In Touch</h2>
        <p className="text-[#665c78] mb-8">
          Feel free to reach out for software collaborations, diagnostic consultations, or general inquiries!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="border border-[#e2d9f3] p-6 rounded-xl">
            <legend className="font-heading text-[#6c4ab6] font-semibold px-2">Contact Form</legend>

            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm font-medium mb-1">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                minLength={2}
                placeholder="Your Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-3 border border-[#dcd1f0] rounded-lg bg-[#fcfaff] focus:outline-none focus:ring-2 focus:ring-[#6c4ab6]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-[#dcd1f0] rounded-lg bg-[#fcfaff] focus:outline-none focus:ring-2 focus:ring-[#6c4ab6]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Reason for Inquiry:</label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border border-[#dcd1f0] rounded-lg bg-[#fcfaff] focus:outline-none focus:ring-2 focus:ring-[#6c4ab6]"
              >
                <option value="">-- Select an Option --</option>
                <option value="job">Job / Internship Opportunity</option>
                <option value="project">Project Collaboration</option>
                <option value="tutoring">Tutoring Inquiry</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message:</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                minLength={10}
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-[#dcd1f0] rounded-lg bg-[#fcfaff] focus:outline-none focus:ring-2 focus:ring-[#6c4ab6]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#6c4ab6] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#553596] transition-colors duration-300"
            >
              Submit Message
            </button>
          </fieldset>
        </form>
      </section>
    </div>
  );
}