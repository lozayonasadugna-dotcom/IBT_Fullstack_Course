"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <h2>Something went wrong!</h2>
          <p style={{ color: "#666", margin: "1rem 0" }}>{error?.message || "An unexpected error occurred."}</p>
          <button 
            onClick={() => reset()}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}