/* global WebImporter */

/**
 * Parser for cards-action block
 *
 * Source: https://www.flipkartethics.com/content/flipkart-ethics/en_us.html
 * Base Block: cards
 *
 * Block Structure:
 * - Each card: one row with 2 columns [image | heading + description]
 *
 * Generated: 2025-12-13
 */

export default function parse(element, { document }) {
  // Find all cards within the element
  const cards = Array.from(element.querySelectorAll('.card, .card_wrapper'));

  // Build cells array - one row per card with [image | content]
  const cells = [];

  cards.forEach((card) => {
    // Extract image from card
    const img = card.querySelector('img');

    // Extract heading and description
    const heading = card.querySelector('.card-title, h2, h3, p.card-title');
    const description = card.querySelector('.card-description, p:not(.card-title)');

    // Create content cell with heading and description
    const contentCell = document.createElement('div');
    if (heading) contentCell.appendChild(heading.cloneNode(true));
    if (description) contentCell.appendChild(description.cloneNode(true));

    // Add row: [image | content]
    cells.push([img, contentCell]);
  });

  // Create block using WebImporter.Blocks.createBlock()
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Action', cells });

  // Replace element with block
  element.replaceWith(block);
}
