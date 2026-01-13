export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-form-${cols.length}-cols`);

  // Process rows
  [...block.children].forEach((row) => {
    const columns = [...row.children];

    // First column - check for embed URL and convert to iframe
    if (columns[0]) {
      columns[0].classList.add('columns-form-main');
      const link = columns[0].querySelector('a');
      if (link && link.href.includes('ecm-web-prod.walmart.com')) {
        // Convert URL to embedded iframe
        const iframeWrapper = document.createElement('div');
        iframeWrapper.className = 'columns-form-iframe-wrapper';
        const iframe = document.createElement('iframe');
        iframe.src = link.href;
        iframe.title = 'Report a Concern Form';
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('allowfullscreen', '');
        iframeWrapper.appendChild(iframe);

        // Replace paragraph with iframe
        const para = link.closest('p');
        if (para) {
          para.replaceWith(iframeWrapper);
        }
      }
    }

    // Second column - sidebar with links
    if (columns[1]) {
      columns[1].classList.add('columns-form-sidebar');

      // Style links as buttons
      const links = columns[1].querySelectorAll('a');
      links.forEach((link) => {
        link.classList.add('columns-form-sidebar-link');
      });
    }
  });
}
