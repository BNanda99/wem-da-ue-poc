/* global WebImporter */

/**
 * Parser for columns-form block
 *
 * Source: https://www.flipkartethics.com/content/flipkart-ethics/en_us/report-a-concern.html
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2: Two columns - form embed URL | sidebar links
 *
 * Source HTML Pattern:
 * <div class="columns-new-component col-new-7525">
 *   <div class="dv-column">
 *     <iframe src="https://ecm-web-prod.walmart.com/locale=en">
 *   </div>
 *   <div class="dv-column">
 *     <div class="richtext">links and descriptions</div>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-13
 */
export default function parse(element, { document }) {
  // Get all column divs
  const columns = element.querySelectorAll(':scope > .dv-column');

  // Extract iframe URL from first column
  const iframe = element.querySelector('iframe');
  const iframeUrl = iframe ? iframe.getAttribute('src') : '';

  // Build left column content (embed URL)
  const leftColumn = [];
  if (iframeUrl) {
    const link = document.createElement('a');
    link.href = iframeUrl;
    link.textContent = iframeUrl;
    leftColumn.push(link);
  }

  // Extract sidebar content from second column
  const rightColumn = [];
  const sidebarContent = element.querySelector('.dv-column:nth-child(2) .richtext') ||
                         element.querySelector('.dv-column:last-child .richtext');

  if (sidebarContent) {
    // Get all links and paragraphs
    const links = sidebarContent.querySelectorAll('a');
    const paragraphs = sidebarContent.querySelectorAll('p');

    links.forEach((link, index) => {
      const a = document.createElement('a');
      a.href = link.getAttribute('href') || '';
      a.textContent = link.textContent.trim();
      rightColumn.push(a);

      // Find corresponding description paragraph
      const nextP = paragraphs[index * 2 + 1];
      if (nextP && !nextP.querySelector('a')) {
        const p = document.createElement('p');
        p.textContent = nextP.textContent.trim();
        rightColumn.push(p);
      }

      // Add separator
      if (index < links.length - 1) {
        rightColumn.push(document.createElement('hr'));
      }
    });
  }

  const cells = [
    [leftColumn, rightColumn]
  ];

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Form', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
