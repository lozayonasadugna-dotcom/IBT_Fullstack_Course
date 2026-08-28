# Manual Test Plan - Sheger Transit (Day 24)

- [ ] **Data Fetching:** Data loads from `data/routes.json` on app startup without console errors.
- [ ] **Search & Empty State:** Searching a non-existent route displays a clear user message.
- [ ] **Favorites & Storage:** Clicking "Save Favorite" updates state and persists across page reloads via `localStorage`.
- [ ] **Validation Failure (Empty Name):** Submitting checkout form without full name blocks submit and displays *"Please enter your full name."*
- [ ] **Validation Failure (Invalid Phone):** Submitting `12345` into TeleBirr field displays *"Enter a valid Ethiopian phone number..."*
- [ ] **Validation Failure (Empty Cart):** Triggering order with zero saved routes displays *"Your saved favorites list is empty..."*
- [ ] **Order Placement:** Entering valid details (`Abebe`, `0911223344`) displays confirmation alert with ETB total, clears saved items, and updates the screen.