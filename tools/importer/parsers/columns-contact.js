/* global WebImporter */

/**
 * Parser for columns-contact block
 *
 * Source: https://www.flipkartethics.com/content/flipkart-ethics/en_us/contact-us.html
 * Base Block: columns
 *
 * Block Structure:
 * - Handles both 2-column (50/50) and 3-column layouts
 * - Each row represents one set of columns
 * - Columns can contain images, headings, paragraphs, lists, and links
 *
 * Generated: 2025-12-16
 */

export default function parse(element, { document }) {
  // Detect layout type based on classes
  const is5050 = element.classList.contains('block-fifty-fifty-v3') || element.classList.contains('block5050-component-v3');
  const is3Column = element.classList.contains('col-new-three');

  const cells = [];

  if (is5050) {
    // 50/50 layout: image on left, content on right
    const imageEl = element.querySelector('.content-block-image-v3 img, img');
    const title = element.querySelector('.content-block-title-v3, h1, h2, h3');
    const text = element.querySelector('.content-block-text-v3, p');
    const button = element.querySelector('a');

    // Create content container for right column
    const contentDiv = document.createElement('div');
    if (title) contentDiv.appendChild(title.cloneNode(true));
    if (text) contentDiv.appendChild(text.cloneNode(true));
    if (button) contentDiv.appendChild(button.cloneNode(true));

    // Build row with 2 columns: image | content
    cells.push([imageEl, contentDiv]);

  } else if (is3Column) {
    // 3-column layout: extract content from each column
    const columns = Array.from(element.querySelectorAll('.dv-column'));

    // Filter out empty columns
    const nonEmptyColumns = columns.filter(col => {
      const content = col.textContent.trim();
      return content.length > 0;
    });

    // Build row with 3 columns
    const row = nonEmptyColumns.map(col => {
      // Clone the entire column content
      const colDiv = document.createElement('div');
      const heading = col.querySelector('h4, h3, h2');
      const paragraphs = Array.from(col.querySelectorAll('p'));
      const lists = Array.from(col.querySelectorAll('ul, ol'));
      const links = Array.from(col.querySelectorAll('a'));

      if (heading) colDiv.appendChild(heading.cloneNode(true));
      paragraphs.forEach(p => {
        if (p.textContent.trim()) colDiv.appendChild(p.cloneNode(true));
      });
      lists.forEach(list => colDiv.appendChild(list.cloneNode(true)));
      links.forEach(link => {
        if (!link.closest('p') && !link.closest('ul') && !link.closest('ol')) {
          colDiv.appendChild(link.cloneNode(true));
        }
      });

      return colDiv;
    });

    cells.push(row);
  }

  // Create block using WebImporter.Blocks.createBlock()
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Contact', cells });

  // Replace element with block
  element.replaceWith(block);
}
