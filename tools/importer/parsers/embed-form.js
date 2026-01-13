/* global WebImporter */

/**
 * Parser for embed-form block
 *
 * Source: https://www.flipkartethics.com/content/flipkart-ethics/en_us/report-a-concern.html
 * Base Block: embed
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2: Embed URL
 *
 * Source HTML Pattern:
 * <iframe src="https://ecm-web-prod.walmart.com/locale=en">
 *
 * Generated: 2026-01-13
 */
export default function parse(element, { document }) {
  // Extract URL from iframe src attribute
  const iframeUrl = element.getAttribute('src') || '';

  // Build cells array
  const cells = [];

  if (iframeUrl) {
    const link = document.createElement('a');
    link.href = iframeUrl;
    link.textContent = iframeUrl;
    cells.push([link]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Embed-Form', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
