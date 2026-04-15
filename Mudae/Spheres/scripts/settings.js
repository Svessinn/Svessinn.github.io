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
  // Toggle menu on Escape key
  if (e.key === "Escape") {
    const settingsStatus = Boolean(document.getElementById("settings-overlay").classList.contains("hidden"));
    // console.log("Escape key pressed. Settings menu currently open:", !settingsStatus);
    toggleSettings(settingsStatus);
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

/**
 * Fine-tunes the multiplier value via buttons
 * @param {number} amount - The amount to add or subtract (e.g., 10 or -10)
 */
function adjustMultiplier(amount) {
  const slider = document.getElementById("multiplier-slider");
  if (!slider) return;

  // Calculate new value and keep it within 0-500 bounds
  let newValue = parseInt(slider.value) + amount;
  if (newValue < 100) newValue = 100;
  if (newValue > 500) newValue = 500;

  // Update slider position and trigger the update logic
  slider.value = newValue;
  updateMultiplier(newValue);
}

/**
 *
 * @param {number} val
 */
function updateMultiplier(val) {
  const display = document.getElementById("multiplier-display");
  if (display) display.innerText = val + "%";

  valueMultiplier = parseFloat(val) / 100.0;
  // console.log("Value multiplier set to:", valueMultiplier);
}
