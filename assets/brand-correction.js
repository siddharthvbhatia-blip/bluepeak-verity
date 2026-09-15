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

  const capacityIcons = [
    `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="11" width="30" height="27" rx="5"/><path d="M9 19h30M16 7v8M32 7v8"/><circle cx="29" cy="29" r="6"/><path d="M29 25v4l3 2"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="19" cy="17" r="6"/><path d="M8 36c1-7 5-11 11-11s10 4 11 11"/><path d="M31 14h8M35 10v8"/><path d="M32 27c5 1 8 4 8 9"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 17a15 15 0 0 1 25-4l3 4"/><path d="M40 10v7h-7"/><path d="M36 31a15 15 0 0 1-25 4l-3-4"/><path d="M8 38v-7h7"/><path d="M19 17h10M17 24h14M20 31h8"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="17" r="5"/><circle cx="31" cy="19" r="4"/><path d="M8 36c1-7 5-11 10-11s9 4 10 11"/><path d="M27 29c6 0 10 3 11 7"/><path d="M37 8v10M32 13h10"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="10" width="30" height="28" rx="5"/><path d="M9 18h30M16 6v8M32 6v8"/><path d="M17 29l4 4 10-11"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 34l17-17 7 7-17 17H13z"/><path d="M29 18l4-4 7 7-4 4"/><path d="M10 13h10M15 8v10"/><path d="M30 35h9M34.5 30.5v9"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="10" y="9" width="22" height="30" rx="4"/><path d="M16 17h10M16 23h10M16 29h7"/><circle cx="34" cy="31" r="7"/><path d="M34 28v3l2 2"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 15l15-7 15 7-15 7z"/><path d="M9 24l15 7 15-7M9 33l15 7 15-7"/><path d="M34 9h7v7M41 9l-9 9"/></svg>`
  ];

  const decorateCapacityCards = () => {
    const cards = [...document.querySelectorAll('.capacity-grid > article')];
    if (!cards.length) return;

    cards.forEach((card, index) => {
      card.classList.add('bpv-capacity-card');
      if (!card.querySelector('.bpv-capacity-icon')) {
        const mark = document.createElement('span');
        mark.className = `bpv-capacity-icon bpv-capacity-icon-${index + 1}`;
        mark.innerHTML = capacityIcons[index] || capacityIcons[0];
        card.prepend(mark);
      }

      if (index === 5 && !card.querySelector('.bpv-capacity-brands')) {
        const brands = document.createElement('div');
        brands.className = 'bpv-capacity-brands';
        brands.setAttribute('aria-label', 'QuickBooks Online and Xero');
        brands.append(makeLogo('qbo', true), makeLogo('xero', true));
        card.appendChild(brands);
      }
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
    decorateCapacityCards();
    normalizeCopy();
  };

  if (!document.querySelector('link[data-bpv-brand-correction]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/brand-correction.css?v=20260915-r2';
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
