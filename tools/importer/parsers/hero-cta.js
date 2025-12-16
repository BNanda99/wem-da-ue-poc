/* global WebImporter */

/**
 * Parser for hero-cta block
 *
 * Source: https://www.flipkartethics.com/content/flipkart-ethics/en_us.html
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Heading + description + CTA button (centered, no image)
 *
 * Generated: 2025-12-13
 */

export default function parse(element, { document }) {
  // Extract content from source HTML
  const heading = element.querySelector('.hero-title, h1, h2');
  const description = element.querySelector('.hero-text, p');
  const button = element.querySelector('a.hero-button, a');

  // Build cells array - single row with heading, description, and button
  const cells = [
    [heading, description, button]
  ];

  // Create block using WebImporter.Blocks.createBlock()
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Cta', cells });

  // Replace element with block
  element.replaceWith(block);
}
