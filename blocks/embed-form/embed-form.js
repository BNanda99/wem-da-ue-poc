/*
 * Embed Form Block
 * Embed external forms directly on your page
 */

const getDefaultEmbed = (url) => `<div class="embed-form-wrapper">
    <iframe src="${url.href}"
      title="Content from ${url.hostname}"
      loading="lazy"
      allowfullscreen=""
      scrolling="yes"
      allow="encrypted-media">
    </iframe>
  </div>`;

const loadEmbed = (block, link) => {
  if (block.classList.contains('embed-form-is-loaded')) {
    return;
  }

  try {
    const url = new URL(link);
    block.innerHTML = getDefaultEmbed(url);
    block.classList.add('embed-form-is-loaded');
  } catch (e) {
    // Invalid URL, show error message
    block.innerHTML = `<p class="embed-form-error">Unable to load form</p>`;
  }
};

export default function decorate(block) {
  const linkEl = block.querySelector('a');
  if (!linkEl) {
    return;
  }

  const link = linkEl.href;
  block.textContent = '';

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      loadEmbed(block, link);
    }
  });
  observer.observe(block);
}
