(() => {
  'use strict';

  const QUICKBOOKS_LOGO = 'assets/quickbooks-logo-attached.png';
  const XERO_LOGO = 'assets/xero-wordmark-blue.svg';

  const makeLogo = (key, compact = false) => {
    const wrap = document.createElement('span');
    wrap.className = `${compact ? 'bpv-official-compact-logo' : 'bpv-official-software-logo'} bpv-${key}`;
    wrap.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    img.src = key === 'qbo' ? QUICKBOOKS_LOGO : XERO_LOGO;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    wrap.appendChild(img);
    return wrap;
  };

  const platformKey = element => {
    if (!element) return '';
    const explicit = (element.dataset?.tool || '').toLowerCase();
    if (explicit === 'qbo' || explicit === 'xero') return explicit;
    const text = (element.textContent || '').toLowerCase();
    if (text.includes('quickbooks') || text.includes('qbo')) return 'qbo';
    if (text.includes('xero')) return 'xero';
    return '';
  };

  const removeLegacyDuplicates = () => {
    document.querySelectorAll('.bp2-hero-tool-rail, .platform-stack-section').forEach(node => node.remove());
    document.querySelectorAll('.bp3-credibility-mark').forEach(node => node.remove());

    const credibility = document.querySelectorAll('.credibility-grid > div');
    if (credibility[2]) {
      const title = credibility[2].querySelector('strong');
      if (title) title.textContent = 'QuickBooks Online & Xero';
    }
  };

  const correctPrimarySoftwareCards = () => {
    document.querySelectorAll('.bp-software-chip').forEach(chip => {
      const key = platformKey(chip);
      if (key !== 'qbo' && key !== 'xero') return;

      const head = chip.querySelector('.bp2-tool-head, .bp-tool-top') || chip;
      const existing = head.querySelector('.bpv-official-software-logo, .bp3-platform-mark, .bp2-tool-mark, .bp-tool-mark');
      if (existing && !existing.classList.contains('bpv-official-software-logo')) {
        existing.replaceWith(makeLogo(key, false));
      } else if (!existing) {
        head.prepend(makeLogo(key, false));
      }

      const shortLabel = chip.querySelector('.bp2-tool-name > span');
      if (shortLabel) shortLabel.remove();

      chip.classList.add('bpv-brand-corrected');
    });
  };

  const correctRemainingCompactMarks = () => {
    document.querySelectorAll('.bp3-platform-mark.qbo, .bp3-platform-mark.xero').forEach(mark => {
      if (mark.closest('.bp-software-chip')) return;
      const key = mark.classList.contains('qbo') ? 'qbo' : 'xero';
      mark.replaceWith(makeLogo(key, true));
    });
  };

  const normalizeCopy = () => {
    document.querySelectorAll('.hero-proof span').forEach(item => {
      if (item.textContent.trim() === 'QBO & Xero workflows') {
        item.textContent = 'QuickBooks Online & Xero workflows';
      }
    });
  };

  const apply = () => {
    removeLegacyDuplicates();
    correctPrimarySoftwareCards();
    correctRemainingCompactMarks();
    normalizeCopy();
  };

  if (!document.querySelector('link[data-bpv-brand-correction]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/brand-correction.css?v=20260915-r1';
    style.dataset.bpvBrandCorrection = 'true';
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  requestAnimationFrame(apply);
  window.setTimeout(apply, 120);
  window.setTimeout(apply, 500);
})();
