export default function decorate(block) {
  // Get the configuration from the block content
  const rows = [...block.children];

  // Default values
  let text = '';
  let lineColor = '#0071ce'; // Default blue color
  let topMargin = '20px';
  let bottomMargin = '20px';

  // Parse configuration from block content
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();

      switch (key) {
        case 'text':
          text = value;
          break;
        case 'line-color':
        case 'linecolor':
          lineColor = value;
          break;
        case 'top-margin':
        case 'topmargin':
          topMargin = value;
          break;
        case 'bottom-margin':
        case 'bottommargin':
          bottomMargin = value;
          break;
        default:
          // No action needed for unrecognized keys
          break;
      }
    } else if (cells.length === 1 && !text) {
      // If only one cell, treat it as the text
      text = cells[0].textContent.trim();
    }
  });

  // Create the page break structure
  const pageBreakContainer = document.createElement('div');
  pageBreakContainer.className = 'page-break-container';
  pageBreakContainer.style.marginTop = topMargin;
  pageBreakContainer.style.marginBottom = bottomMargin;

  const pageBreakContent = document.createElement('div');
  pageBreakContent.className = 'page-break-content';

  // Create left line
  const leftLine = document.createElement('div');
  leftLine.className = 'page-break-line';
  leftLine.style.backgroundColor = lineColor;

  // Create text element
  const textElement = document.createElement('div');
  textElement.className = 'page-break-text';
  textElement.textContent = text;

  // Create right line
  const rightLine = document.createElement('div');
  rightLine.className = 'page-break-line';
  rightLine.style.backgroundColor = lineColor;

  // Assemble the structure
  pageBreakContent.appendChild(leftLine);
  pageBreakContent.appendChild(textElement);
  pageBreakContent.appendChild(rightLine);
  pageBreakContainer.appendChild(pageBreakContent);

  // Replace block content
  block.replaceChildren(pageBreakContainer);
}
