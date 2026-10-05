"use client";

export default function ErrorBoundary({ error, reset }) {
  return (
    <main style={{ padding: "2rem" }}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Try again
      </button>
    </main>
  );
}