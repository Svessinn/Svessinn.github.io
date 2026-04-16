/**
 * Handles the switching of the top row tabs and visibility
 * of the corresponding bottom row links.
 * @param {string} mode - 'chest', 'harvest', 'quest', or 'trace'
 * @param {string} id - ID of the nav container to update (default: 'main-nav')
 */
function switchTab(mode, id = "main-nav") {
  // Use a more modern check for the event
  if (typeof event !== "undefined") event.preventDefault();

  const nav = document.getElementById(id);
  if (!nav) return;

  // Define all possible modes to clean up classes efficiently
  const modes = ["chest", "harvest", "quest", "trace"];

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
  // Extract "chest" from "path/to/chest.html"
  const path = window.location.pathname;
  const page = path.split("/").pop().split(".")[0];

  const validModes = ["chest", "harvest", "quest", "trace"];

  if (validModes.includes(page)) {
    switchTab(page);
  }
});
