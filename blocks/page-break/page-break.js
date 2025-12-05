export default function decorate(block) {
  // Get the configuration from the block content
  const rows = [...block.children];

  // Default values
  let text = '';
  let lineColor = '#0053e2'; // Default PhonePe blue color
  let topMargin = '20px';
  let bottomMargin = '20px';

  // Parse configuration from block content
  // Support both key-value pairs (2 columns) and simple sequential format (1 column)
  if (rows.length > 0 && rows[0].children.length === 1) {
    // Sequential format: text, lineColor, topMargin, bottomMargin
    if (rows[0]) text = rows[0].textContent.trim();
    if (rows[1]) lineColor = rows[1].textContent.trim();
    if (rows[2]) topMargin = rows[2].textContent.trim();
    if (rows[3]) bottomMargin = rows[3].textContent.trim();
  } else {
    // Key-value format
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
          case 'line color':
            lineColor = value;
            break;
          case 'top-margin':
          case 'topmargin':
          case 'top margin':
            topMargin = value;
            break;
          case 'bottom-margin':
          case 'bottommargin':
          case 'bottom margin':
            bottomMargin = value;
            break;
          default:
            // No action needed for unrecognized keys
            break;
        }
      }
    });
  }

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

  // Create text element (only if text is provided)
  if (text) {
    const textElement = document.createElement('div');
    textElement.className = 'page-break-text';
    textElement.textContent = text;
    pageBreakContent.appendChild(leftLine);
    pageBreakContent.appendChild(textElement);
  } else {
    // If no text, just add the line
    pageBreakContent.appendChild(leftLine);
  }

  // Create right line (only if text is provided)
  if (text) {
    const rightLine = document.createElement('div');
    rightLine.className = 'page-break-line';
    rightLine.style.backgroundColor = lineColor;
    pageBreakContent.appendChild(rightLine);
  }

  pageBreakContainer.appendChild(pageBreakContent);

  // Replace block content
  block.replaceChildren(pageBreakContainer);
}
