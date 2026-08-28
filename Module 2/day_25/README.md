# Manual Test Plan - Sheger Transit

- [ ] **Data Fetching:** API/JSON loads correctly on initialization without console errors.
- [ ] **Search Filtering:** Searching a non-existent route shows the empty state message.
- [ ] **Invalid Phone Validation:** Submitting invalid phone (`12345`) blocks submission and updates `#form-error`.
- [ ] **Empty State Guard:** Submitting checkout with zero saved routes displays *"Your saved list is empty."*
- [ ] **Successful Submission:** Valid phone (`0911223344`) clears favorites, saves to `localStorage`, and displays ETB total confirmation.
- [ ] **State Persistence:** Saved favorites persist after refreshing the browser.