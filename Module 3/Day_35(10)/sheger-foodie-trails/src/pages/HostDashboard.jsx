import React, { useState } from "react";
import { Sparkles, PlusCircle, Calendar, MapPin, DollarSign, Users, Image as ImageIcon, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HostDashboard({ onAddPopup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    neighborhood: "Bole",
    date: "",
    price: "",
    capacity: 12,
    image: "",
    description: "",
    menuHighlights: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      neighborhood: formData.neighborhood,
      date: formData.date || "Upcoming",
      price: formData.price.startsWith("ETB") ? formData.price : `ETB ${formData.price}`,
      capacity: Number(formData.capacity),
      image: formData.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop",
      description: formData.description,
      menuHighlights: formData.menuHighlights.split(",").map((item) => item.trim()),
    };

    if (onAddPopup) {
      onAddPopup(newEvent);
    }

    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem 0" }}>
      {/* Header Banner */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span className="category-label" style={{ letterSpacing: "2px", display: "inline-block", marginBottom: "0.5rem" }}>
          HOST AN EXPERIENCE
        </span>
        <h1 className="serif-heading" style={{ fontSize: "2.6rem", margin: "0.2rem 0 0.8rem 0" }}>
          Create a Secret Supper
        </h1>
        <p style={{ color: "var(--text-muted, #a0aec0)", fontSize: "1rem" }}>
          List your popup dining event, set ticket quantities, and connect with food enthusiasts across Sheger.
        </p>
      </div>

      {submitted ? (
        <div
          style={{
            backgroundColor: "var(--bg-card, #171d18)",
            border: "2px solid var(--accent-gold, #c5a059)",
            borderRadius: "20px",
            padding: "3rem 2rem",
            textAlign: "center",
          }}
        >
          <Sparkles size={48} style={{ color: "var(--accent-gold, #c5a059)", marginBottom: "1rem" }} />
          <h2 className="serif-heading" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Event Published Successfully!
          </h2>
          <p style={{ color: "var(--text-muted, #a0aec0)" }}>
            Redirecting you to the home page so you can see your live listing...
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "var(--bg-card, #171d18)",
            border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
            borderRadius: "24px",
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
          }}
        >
          {/* Title */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.9rem" }}>
              Event Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Artisan Pasta & Wine Tasting"
              value={formData.title}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Grid Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.9rem" }}>
                <MapPin size={15} className="gold-accent" /> Neighborhood
              </label>
              <select name="neighborhood" value={formData.neighborhood} onChange={handleChange} style={inputStyle}>
                <option value="Bole">Bole</option>
                <option value="Kazanchis">Kazanchis</option>
                <option value="Piassa">Piassa</option>
                <option value="Old Airport">Old Airport</option>
                <option value="Sarbet">Sarbet</option>
                <option value="Ayat">Ayat</option>
                <option value="CMC">CMC</option>
              </select>
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.9rem" }}>
                <Calendar size={15} className="gold-accent" /> Date & Time
              </label>
              <input
                type="text"
                name="date"
                required
                placeholder="e.g. Sep 28, 7:00 PM"
                value={formData.date}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Grid Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.9rem" }}>
                <DollarSign size={15} className="gold-accent" /> Price Per Seat (ETB)
              </label>
              <input
                type="number"
                name="price"
                required
                placeholder="e.g. 1500"
                value={formData.price}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.9rem" }}>
                <Users size={15} className="gold-accent" /> Max Guest Capacity
              </label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.9rem" }}>
              <ImageIcon size={15} className="gold-accent" /> Cover Photo URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.9rem" }}>
              Event Story & Atmosphere
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe the experience, the host chef, and the vibe guests should expect..."
              value={formData.description}
              onChange={handleChange}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Menu Highlights */}
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.9rem" }}>
              <Utensils size={15} className="gold-accent" /> Secret Menu Highlights (Comma Separated)
            </label>
            <input
              type="text"
              name="menuHighlights"
              placeholder="e.g. Handcrafted Ravioli, Herbal Welcome Infusion, Tiramisu"
              value={formData.menuHighlights}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-pill-gold"
            style={{
              padding: "1rem",
              fontSize: "1rem",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <PlusCircle size={18} /> Publish Secret Supper
          </button>
        </form>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  backgroundColor: "var(--bg-primary, #0a0f0c)",
  border: "1px solid var(--border-color, rgba(255,255,255,0.15))",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "0.92rem",
  outline: "none",
  boxSizing: "border-box",
};