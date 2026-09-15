import React from "react";

export default function ShegerLogo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        <linearGradient id="shegerGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E0B3" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8A6B29" />
        </linearGradient>
      </defs>

      {/* Outer Golden Ring */}
      <circle cx="50" cy="50" r="44" stroke="url(#shegerGoldGradient)" strokeWidth="4" fill="none" />

      {/* Stylized Cloche / Crown Cover */}
      <path
        d="M 24 58 C 24 32, 76 32, 76 58 Z"
        fill="url(#shegerGoldGradient)"
      />

      {/* Cloche Top Handle */}
      <circle cx="50" cy="28" r="5" fill="url(#shegerGoldGradient)" />

      {/* Platter Base */}
      <path
        d="M 18 64 H 82"
        stroke="url(#shegerGoldGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Sparkle Detail */}
      <path
        d="M 50 14 L 52 19 L 57 21 L 52 23 L 50 28 L 48 23 L 43 21 L 48 19 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
}