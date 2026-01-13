/* global WebImporter */

/**
 * Parser for columns-hero block
 *
 * Source: https://www.flipkartethics.com/content/flipkart-ethics/en_us/report-a-concern.html
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2: Two columns - image | heading + description
 *
 * Source HTML Pattern:
 * <div class="block-fifty-fifty-v3">
 *   <div class="content-block-image-v3">
 *     <img src="...">
 *   </div>
 *   <div class="content-block-solid-v3">
 *     <div class="content-block-title-v3">Title</div>
 *     <div class="content-block-text-v3">Description</div>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-13
 */
export default function parse(element, { document }) {
  // Extract image from left column
  const image = element.querySelector('.content-block-image-v3 img') ||
                element.querySelector('.content-block-image-wrap img') ||
                element.querySelector('img');

  // Extract title from right column
  const title = element.querySelector('.content-block-title-v3') ||
                element.querySelector('.content-block-title') ||
                element.querySelector('h1, h2, h3');

  // Extract description from right column
  const description = element.querySelector('.content-block-text-v3') ||
                      element.querySelector('.content-block-text') ||
                      element.querySelector('p');

  // Build cells array matching columns block structure
  // Row 1: Two columns - image | content
  const leftColumn = [];
  if (image) {
    leftColumn.push(image.cloneNode(true));
  }

  const rightColumn = [];
  if (title) {
    // Create heading element
    const h2 = document.createElement('h2');
    h2.textContent = title.textContent.trim();
    rightColumn.push(h2);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    rightColumn.push(p);
  }

  const cells = [
    [leftColumn, rightColumn]
  ];

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Hero', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
