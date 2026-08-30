# 🚌 Sheger Transit

**Your daily journey, elevated.**

A modern, responsive web application for real-time bus schedules, route planning, fare calculation, and transit pass booking across Addis Ababa, Ethiopia.

---

## ✨ Features

- **🔍 Smart Search** – Search routes by route number, origin, destination, or via streets
- **🗺️ Route Explorer** – View all available transit routes with real-time bus countdowns
- **🧮 Trip Planner & Fare Calculator** – Select origin and destination to find direct routes and calculate fares
- **🔖 Favorites** – Save frequently used routes for quick access
- **💳 Transit Pass Booking** – Book passes via TeleBirr or CBE Birr with integrated order history
- **📍 Live Transit Map** – Embedded Google Maps showing Addis Ababa transit network
- **📜 Order History** – View past bookings and payment records
- **💬 Support & Inquiry** – Send messages directly to customer support
- **👤 User Profile** – Manage your commuter account

---

## 🛠️ Technologies Used

- **HTML5** – Semantic structure and content
- **CSS3** – Custom styling with responsive design (mobile-first)
- **JavaScript (Vanilla)** – Client-side logic, state management, and local storage
- **Font Awesome** – Icon library for UI elements
- **Google Fonts** – Plus Jakarta Sans typography
- **Google Maps Embed** – Live transit map integration

---

## 📁 File Structure
sheger-transit/
├── index.html # Main application file (HTML + CSS + JS combined)
├── shegerlogo.png # Logo used in navbar, hero section, and branding
├── shegerBus.jpg # Background image for header hero card
└── README.md # This file

> **Note:** All CSS and JavaScript are embedded directly within `index.html` for simplicity and ease of deployment.

---

## 🚀 How to Run

### Option 1: Directly Open in Browser
1. Download or clone the repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
3. That's it! No server or build process required.

### Option 2: Use a Local Server (Recommended for Development)
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
