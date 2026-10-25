"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
      <h3 className="font-bold">Something went wrong!</h3>
      <p className="text-sm">{error.message}</p>
      <button 
        onClick={() => reset()}
        className="mt-3 bg-red-600 text-white px-3 py-1 rounded text-sm"
      >
        Try again
      </button>
    </div>
  );
}