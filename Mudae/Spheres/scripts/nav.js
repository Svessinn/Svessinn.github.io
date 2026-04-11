/**
 * Handles the switching of the top row tabs and visibility
 * of the corresponding bottom row links.
 * @param {string} mode - 'quest' or 'trace'
 */
function switchTab(mode) {
  // If an event exists (like a click), prevent default behavior
  if (window.event) window.event.preventDefault();

  const nav = document.getElementById("main-nav");
  const questTab = document.getElementById("tab-quest");
  const traceTab = document.getElementById("tab-trace");

  if (!nav) return;

  nav.classList.remove("view-quest", "view-trace");
  nav.classList.add("view-" + mode);

  if (questTab) questTab.classList.toggle("active", mode === "quest");
  if (traceTab) traceTab.classList.toggle("active", mode === "trace");
}
