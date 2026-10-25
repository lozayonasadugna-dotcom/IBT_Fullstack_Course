"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="space-y-6">
      <div className="flex gap-3 pb-2 border-b border-gray-200">
        {["All", "Traditional", "Vegetarian"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedCategory === category
                ? "bg-amber-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
