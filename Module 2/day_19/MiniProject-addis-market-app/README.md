# Addis Market Shopping List

An interactive single-page DOM application built with Vanilla JavaScript, HTML5, and CSS3.

## Features
- **Add Items**: Input item names and prices in Ethiopian Birr (ETB) with form validation.
- **Dynamic DOM Rendering**: Uses `document.createElement()` and `.append()` to add rows without re-rendering the entire DOM.
- **Event Delegation**: Manages list item deletions and completion toggles using a single event listener attached to the parent container.
- **Live Running Total**: Automatically calculates and updates the total price whenever items are added or removed.

## How to Run
1. Clone this repository to your local machine.
2. Open `index.html` in any web browser.
3. Open Developer Tools (F12) to inspect the live DOM tree and observe event delegation in action.