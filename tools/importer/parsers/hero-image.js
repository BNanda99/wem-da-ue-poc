/* global WebImporter */

/**
 * Parser for hero-image block
 *
 * Source: https://www.flipkartethics.com/content/flipkart-ethics/en_us.html
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Background image + heading + CTA button
 *
 * Generated: 2025-12-13
 */

export default function parse(element, { document }) {
  // Extract content from source HTML
  const img = element.querySelector('img');
  const heading = element.querySelector('.hero-title, h1, h2');
  const button = element.querySelector('a.hero-button, a.button-primary');

  // Build cells array - single row with image, heading, and button
  const cells = [
    [img, heading, button]
  ];

  // Create block using WebImporter.Blocks.createBlock()
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Image', cells });

  // Replace element with block
  element.replaceWith(block);
}
