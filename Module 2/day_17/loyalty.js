/* ==========================================================================
   Mini-Project: Loyalty Points Module
   ========================================================================== */

function createLoyalty(earnRule = (etb) => Math.floor(etb / 10)) {
  // Private variable encapsulated by closure
  let points = 0;

  return {
    earn(etb) {
      if (typeof etb === "number" && etb > 0) {
        points += earnRule(etb);
      }
    },

    redeem(p) {
      if (typeof p === "number" && p > 0) {
        points = Math.max(0, points - p); // Refuses to drop below 0
      }
    },

    balance() {
      return points;
    }
  };
}

// Export for Node.js environment
if (typeof module !== "undefined") {
  module.exports = { createLoyalty };
}