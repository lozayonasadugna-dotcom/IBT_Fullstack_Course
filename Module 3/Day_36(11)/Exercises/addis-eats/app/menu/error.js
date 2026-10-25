"use client";

export default function Error({ error, reset }) {
  return (
    <main style={{ padding: "2rem" }}>
      <h2>Oops! Something went wrong in the kitchen.</h2>
      <button onClick={() => reset()} style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>
        Try Again
      </button>
    </main>
  );
}