/**
 * Settings Controller
 * Handles the visibility and interactions of the settings overlay.
 */

/**
 * Toggles the settings menu overlay
 * @param {boolean} show - Whether to display the menu
 */
function toggleSettings(show) {
  const overlay = document.getElementById("settings-overlay");
  if (!overlay) return;

  if (show) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
}

/**
 * Closes settings and executes the existing resetSolver logic
 */
function settingsReset() {
  if (typeof reset === "function") {
    reset();
    toggleSettings(false);
  }
}

// Global Event Listeners for UX
window.addEventListener("keydown", (e) => {
  // Close menu on Escape key
  if (e.key === "Escape") {
    toggleSettings(false);
  }
});

window.addEventListener("click", (e) => {
  // Close menu if clicking the dark area outside the settings box
  const overlay = document.getElementById("settings-overlay");
  if (e.target === overlay) {
    toggleSettings(false);
  }
});

let currentGridOpacity = 1.0;

/**
 * Updates the grid opacity dynamically
 * @param {string} val - The slider value (10-100)
 */
function updateOpacity(val) {
  const grid = document.getElementById("grid");

  // Update our global memory of what the opacity should be
  currentGridOpacity = parseFloat(val) / 100;

  if (grid) {
    // Apply it to the element now
    grid.style.setProperty("opacity", currentGridOpacity, "important");
  }
}

/**
 * Re-applies the saved opacity.
 * Call this at the end of your render() function in script.js!
 */
function syncGridOpacity() {
  const grid = document.getElementById("grid");
  if (grid) {
    grid.style.setProperty("opacity", currentGridOpacity, "important");
  }
}
