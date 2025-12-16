/* global WebImporter */

/**
 * Transformer for Flipkart Ethics site cleanup
 * Purpose: Remove non-content elements (header, footer, navigation, etc.)
 * Applies to: Flipkart Ethics pages
 * Generated: 2025-12-13
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove non-content elements before block parsing

    WebImporter.DOMUtils.remove(element, [
      // Header and navigation
      '.experiencefragment--header',
      '.header',
      '#header-container',
      '.hide-on-print',

      // Footer
      '.experiencefragment--footer',
      '.footer',
      '#skipto-main-footer',

      // Modals and overlays
      '.off-the-clock-modal',
      '.add-favorite-modal',
      '.edit-favorite-modal',
      '.remove-favorite-modal',
      '.page-alert-componenttwo',
      '#hamburger-container',

      // User profile and navigation menus
      '#user-profile-container',
      '#hamburger-container-child',
      '.user-profile-notifications',

      // Search elements
      '.search-mobile-model',
      '#header-search-bar',

      // Non-content wrappers
      '.nudge_outer_wrapper',
      '.custom-targeting-buttons'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Post-processing cleanup after block parsing
    // Clean up any remaining empty containers
  }
}
