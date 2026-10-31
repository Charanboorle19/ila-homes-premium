/**
 * Utility to navigate to the separate property details page
 * Stores property metadata in sessionStorage and updates window.location.hash
 */
export function navigateToPropertyDetails(property) {
  try {
    if (property) {
      sessionStorage.setItem("ila_selected_property", JSON.stringify(property));
    }
  } catch (err) {
    console.error("Failed to store property:", err);
  }
  window.location.hash = "#property-details";
}
