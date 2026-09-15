import React, { useState } from "react";
import { Star, CheckCircle } from "lucide-react";

export default function ReviewSystem({ supperTitle }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, user: "Abebe B.", rating: 5, comment: "An unforgettable evening in Kazanchis! The flavors and secret atmosphere were pure magic.", date: "May 2026" },
    { id: 2, user: "Selam T.", rating: 5, comment: "Incredible hospitality and the mystery menu reveal blew us away.", date: "June 2026" }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newReview = {
      id: Date.now(),
      user: "You (Verified Guest)",
      rating,
      comment,
      date: "Just now"
    };
    setReviews([newReview, ...reviews]);
    setComment("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "20px", padding: "2rem", border: "1px solid var(--border-color)", marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="category-label">GUEST FEEDBACK & REVIEWS</span>
          <h3 className="serif-heading" style={{ fontSize: "1.5rem", marginTop: "0.2rem" }}>
            Supper Experiences & Ratings
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-gold)", fontWeight: "bold" }}>
          <Star fill="var(--accent-gold)" size={18} /> 4.9 / 5.0
        </div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-color)" }}>
        <h4 style={{ fontSize: "1rem", marginBottom: "0.8rem" }}>Leave your review for {supperTitle || "this experience"}</h4>
        
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <Star
                size={22}
                fill={star <= rating ? "var(--accent-gold)" : "transparent"}
                color={star <= rating ? "var(--accent-gold)" : "var(--text-muted)"}
              />
            </button>
          ))}
          <span style={{ marginLeft: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>{rating} Stars</span>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share details about the secret ambiance, food quality, and host hospitality..."
          rows={3}
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border-color)",
            color: "inherit",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            resize: "vertical"
          }}
          required
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Only verified ticket holders can post reviews.</span>
          <button type="submit" className="btn-pill-gold" style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem" }}>
            Submit Review
          </button>
        </div>

        {submitted && (
          <div style={{ marginTop: "1rem", padding: "0.7rem", backgroundColor: "rgba(46,204,113,0.1)", borderRadius: "8px", color: "#2ecc71", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CheckCircle size={16} /> Thank you! Your verified review has been published.
          </div>
        )}
      </form>

      {/* Review List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {reviews.map((rev) => (
          <div key={rev.id} style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: "1.2rem", borderRadius: "14px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>{rev.user}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{rev.date}</span>
            </div>
            <div style={{ display: "flex", gap: "0.2rem", marginBottom: "0.5rem" }}>
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
              ))}
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}