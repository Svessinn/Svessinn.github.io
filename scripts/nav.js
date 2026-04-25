// Define all possible modes to clean up classes efficiently
const modes = ["chest", "harvest", "quest", "trace", "calculator", "other", "simulator", "solver"];

/**
 * Handles the switching of the top row tabs and visibility
 * of the corresponding bottom row links.
 * @param {string} mode - The mode to switch to (e.g., 'chest', 'harvest', etc.)
 * @param {string} id - ID of the nav container to update (default: 'main-nav')
 */
function switchTab(mode, id = "main-nav") {
  // Use a more modern check for the event
  if (typeof event !== "undefined") event.preventDefault();

  const nav = document.getElementById(id);
  if (!nav) return;

  // Remove all potential view classes and the active state from all tabs
  modes.forEach((m) => {
    nav.classList.remove("view-" + m);
    const tab = document.getElementById("tab-" + m);
    if (tab) tab.classList.remove("active");
  });

  // Add the new active classes
  nav.classList.add("view-" + mode);
  const activeTab = document.getElementById("tab-" + mode);
  if (activeTab) activeTab.classList.add("active");
}
/**
 * AUTOMATION: Runs every time a page loads
 */
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.toLowerCase();

  // Find which mode is present in the URL path
  const currentMode = modes.find((mode) => path.includes("/" + mode + "/"));

  if (currentMode) {
    switchTab(currentMode);
  }
});
