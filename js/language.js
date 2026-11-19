(() => {
  const dictionary = window.portfolioTranslations || {};
  const normalise = value => value.replace(/\s+/g, ' ').trim();
  const records = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('script, style, code, pre, .language-switch')
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const english = dictionary[normalise(node.nodeValue)];
    if (english) records.push({ node, french: node.nodeValue, english: node.nodeValue.replace(node.nodeValue.trim(), english) });
  }
  const attributes = [];
  document.querySelectorAll('[aria-label], [alt], [title], [placeholder], meta[name="description"]').forEach(element => {
    for (const name of ['aria-label', 'alt', 'title', 'placeholder', 'content']) {
      const french = element.getAttribute(name);
      if (french && dictionary[normalise(french)]) attributes.push({ element, name, french, english: dictionary[normalise(french)] });
    }
  });
  let language = 'fr';
  const translate = french => language === 'en' ? (dictionary[normalise(french)] || french) : french;
  const apply = selected => {
    language = selected === 'en' ? 'en' : 'fr';
    document.documentElement.lang = language;
    records.forEach(record => { record.node.nodeValue = language === 'en' ? record.english : record.french; });
    attributes.forEach(record => record.element.setAttribute(record.name, language === 'en' ? record.english : record.french));
    const theme = document.getElementById('themeToggle');
    theme?.setAttribute('aria-label', translate(document.documentElement.dataset.theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'));
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    const count = document.getElementById('filterCount');
    if (count && count.textContent.trim()) {
      const total = [...document.querySelectorAll('.project-card-custom')].filter(card => !card.hidden).length;
      count.textContent = `${total} ${language === 'en' ? 'project' : 'projet'}${total > 1 ? 's' : ''}`;
    }
    try { localStorage.setItem('portfolio-language', language); } catch (_) {}
  };
  window.portfolioLanguage = { translate };
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => apply(button.dataset.language)));
  let saved;
  try { saved = localStorage.getItem('portfolio-language'); } catch (_) {}
  apply(saved);
})();
