/* global WebImporter */

/**
 * Parser for page-break block
 *
 * Source: https://www.flipkartethics.com/content/flipkart-ethics/en_us.html
 * Base Block: page-break
 *
 * Block Structure:
 * - Row 1: Text for centered heading with decorative lines
 *
 * Generated: 2025-12-13
 */

export default function parse(element, { document }) {
  // Extract text from page-break title
  const title = element.querySelector('.pb-title, .page-break-title, h1, h2');

  // Build cells array - single row with text
  const cells = [
    [title]
  ];

  // Create block using WebImporter.Blocks.createBlock()
  const block = WebImporter.Blocks.createBlock(document, { name: 'Page-Break', cells });

  // Replace element with block
  element.replaceWith(block);
}
