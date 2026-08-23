# Habesha Eatery Mini-Site

A lightweight, fully accessible two-page website built using semantic HTML5 for a local restaurant located in Bole, Addis Ababa.

## How to Run

1. Open the project folder in VS Code.
2. Launch `index.html` directly in your browser or through the VS Code Live Server extension.
3. Use the navigation links to move between the Reservations page (`index.html`) and the Contact page (`contact.html`).

## Accessibility Features Implemented

* **Semantic Landmarks:** Organized layout using `<header>`, `<nav>`, `<main>`, `<section>`, `<figure>`, and `<footer>` tags to allow screen reader users to jump through sections easily.
* **Logical Heading Structure:** Each page starts with one clean `<h1>` title followed by properly nested `<h2>` tags.
* **Form Accessibility & Validation:** Connected every input to an explicit `<label>` using matching `for` and `id` tags. Built-in validation checks (such as TeleBirr `+251` phone patterns) run natively, and additional hints are linked via `aria-describedby`.
* **Data Tables:** Added clean `<caption>` descriptions and explicit `scope="col"` / `scope="row"` attributes on header cells so assistive technologies read out row and column contexts clearly.
* **Accessible Media:** Included clear `alt` text on the Doro Wat dish photo and added a clear `title` attribute on the map `<iframe>`.
* **Keyboard Navigation:** Fully testable with keyboard-only navigation (`Tab`, `Shift + Tab`, `Enter`, and `Space`).