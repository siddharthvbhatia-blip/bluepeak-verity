(() => {
  'use strict';

  const q = (selector, context = document) => context.querySelector(selector);
  const qa = (selector, context = document) => [...context.querySelectorAll(selector)];

  if (!document.querySelector('link[data-bp-elite-v3]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/elite-polish-v3.css?v=20260914-r1';
    style.dataset.bpEliteV3 = 'true';
    document.head.appendChild(style);
  }

  const platformMark = key => {
    const marks = {
      qbo: `<span class="bp3-platform-mark qbo" aria-hidden="true"><span class="bp3-qbo-word">QBO</span><i></i></span>`,
      xero: `<span class="bp3-platform-mark xero" aria-hidden="true"><span class="bp3-xero-ring">X</span><span class="bp3-xero-mini">xero</span></span>`,
      excel: `<span class="bp3-platform-mark excel" aria-hidden="true"><svg viewBox="0 0 42 42"><rect x="9" y="8" width="25" height="26" rx="4"/><path d="M9 17h25M9 25h25M18 8v26M26 8v26"/><path class="accent" d="M6 14h14v15H6z"/><path class="x" d="M9.5 18l7 8M16.5 18l-7 8"/></svg></span>`,
      powerbi: `<span class="bp3-platform-mark powerbi" aria-hidden="true"><svg viewBox="0 0 42 42"><rect x="7" y="25" width="5" height="10" rx="2"/><rect x="15" y="19" width="5" height="16" rx="2"/><rect x="23" y="13" width="5" height="22" rx="2"/><rect x="31" y="7" width="5" height="28" rx="2"/></svg></span>`,
      other: `<span class="bp3-platform-mark other" aria-hidden="true"><svg viewBox="0 0 42 42"><circle cx="13" cy="21" r="5"/><circle cx="29" cy="13" r="5"/><circle cx="29" cy="29" r="5"/><path d="M17 19l8-4M17 23l8 4"/></svg></span>`
    };
    return marks[key] || marks.other;
  };

  const platformKeyFromText = value => {
    const text = (value || '').toLowerCase();
    if (text.includes('quickbooks') || text === 'qbo') return 'qbo';
    if (text.includes('xero')) return 'xero';
    if (text.includes('excel') || text.includes('spreadsheet') || text === 'xls') return 'excel';
    if (text.includes('power bi') || text === 'bi') return 'powerbi';
    return 'other';
  };

  const replaceExistingToolMarks = () => {
    qa('.bp2-tool-pill').forEach(pill => {
      if (pill.dataset.bp3 === 'true') return;
      const label = [...pill.children].at(-1)?.textContent || pill.textContent;
      const oldMark = q('.bp2-tool-mark', pill);
      const key = platformKeyFromText(label);
      if (oldMark) oldMark.outerHTML = platformMark(key);
      pill.classList.add('bp3-platform-pill');
      pill.dataset.bp3 = 'true';
    });

    qa('.bp-software-chip').forEach(chip => {
      const key = chip.dataset.tool || platformKeyFromText(chip.textContent);
      const oldMark = q('.bp2-tool-mark,.bp-tool-mark', chip);
      if (oldMark) oldMark.outerHTML = platformMark(key);
    });
  };

  const decorateCredibilityRail = () => {
    const items = qa('.credibility-grid > div');
    if (items.length < 4 || q('.bp3-credibility-mark', items[1])) return;

    const xeroMark = document.createElement('div');
    xeroMark.className = 'bp3-credibility-mark';
    xeroMark.innerHTML = platformMark('xero');
    items[1].prepend(xeroMark);

    const workflowMarks = document.createElement('div');
    workflowMarks.className = 'bp3-credibility-mark dual';
    workflowMarks.innerHTML = `${platformMark('qbo')}${platformMark('xero')}`;
    items[2].prepend(workflowMarks);
  };

  const decorateFounderTools = () => {
    qa('.founder-credentials').forEach(credentials => {
      const blocks = qa(':scope > div', credentials);
      const block = blocks.find(item => q('span', item)?.textContent.trim().toLowerCase().includes('core tools'));
      if (!block || block.dataset.bp3 === 'true') return;
      const strong = q('strong', block);
      if (!strong) return;
      strong.classList.add('bp3-founder-platforms');
      strong.innerHTML = `
        <span class="bp3-founder-tool">${platformMark('qbo')}<span>QBO</span></span>
        <span class="bp3-founder-tool">${platformMark('xero')}<span>Xero</span></span>
        <span class="bp3-founder-tool">${platformMark('excel')}<span>Excel</span></span>
        <span class="bp3-founder-tool">${platformMark('powerbi')}<span>Power BI</span></span>`;
      block.dataset.bp3 = 'true';
    });
  };

  const makePlatformPicker = () => {
    const select = q('select[name="platform"]');
    if (!select || q('.bp3-platform-picker')) return;
    const field = select.closest('.field');
    if (!field) return;

    const options = [
      ['QuickBooks Online', 'qbo', 'QuickBooks Online'],
      ['Xero', 'xero', 'Xero'],
      ['Excel / spreadsheets', 'excel', 'Excel'],
      ['Other / mixed', 'other', 'Other / mixed']
    ];

    const picker = document.createElement('div');
    picker.className = 'bp3-platform-picker';
    picker.setAttribute('role', 'group');
    picker.setAttribute('aria-label', 'Choose accounting platform');
    picker.innerHTML = `<span class="bp3-picker-label">Choose visually or use the dropdown</span><div>${options.map(([value, key, label]) => `<button type="button" data-value="${value}" aria-pressed="false">${platformMark(key)}<span>${label}</span></button>`).join('')}</div>`;
    field.insertAdjacentElement('beforebegin', picker);

    const sync = () => {
      qa('button', picker).forEach(button => button.setAttribute('aria-pressed', String(button.dataset.value === select.value)));
    };
    qa('button', picker).forEach(button => {
      button.addEventListener('click', () => {
        select.value = button.dataset.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        sync();
      });
    });
    select.addEventListener('change', sync);
    sync();
  };

  const decorateMarketProof = () => {
    const cards = qa('.bp2-market-proof > div');
    if (cards.length < 3) return;
    const keys = ['qbo', 'xero', 'xero'];
    cards.forEach((card, index) => {
      if (q('.bp3-market-platform', card)) return;
      const mark = document.createElement('span');
      mark.className = 'bp3-market-platform';
      mark.innerHTML = platformMark(keys[index] || 'other');
      card.prepend(mark);
    });
  };

  const serviceIcons = [
    '<svg viewBox="0 0 32 32"><path d="M7 7h18v18H7zM11 12h10M11 17h10M11 22h7"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M10 10a7 7 0 0 1 10-1l2 2M22 22a7 7 0 0 1-10 1l-2-2M9 14H5v-4M23 18h4v4"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M8 9h16v15H8zM8 13h16M12 6v6M20 6v6M12 18h3M18 18h3"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M7 10h18v12H7zM7 14h18M11 18h4M20 18h2"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M9 8h14M7 13h18M10 18h12M12 23h8M8 8l2 17M24 8l-2 17"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M9 6h10l5 5v15H9zM19 6v6h6M12 17h9M12 21h7"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M6 9h8l2 3h10v13H6zM10 17h12M10 21h8"/></svg>',
    '<svg viewBox="0 0 32 32"><path d="M6 8h20v14H14l-5 4v-4H6zM11 13h10M11 17h7"/></svg>'
  ];

  const decorateServiceCards = () => {
    qa('.delivery-grid .delivery-card').forEach((card, index) => {
      if (q('.bp3-service-icon', card)) return;
      const icon = document.createElement('span');
      icon.className = 'bp3-service-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = serviceIcons[index % serviceIcons.length];
      card.appendChild(icon);
    });
  };

  const makePracticeNotes = () => {
    if (q('#practice-notes')) return;
    const contact = q('#contact');
    if (!contact) return;

    const section = document.createElement('section');
    section.className = 'section bp3-insights-section';
    section.id = 'practice-notes';
    section.innerHTML = `
      <div class="container bp3-insights-heading bp-reveal">
        <div>
          <p class="eyebrow">Practice notes</p>
          <h2>What we think matters before accounting work changes hands.</h2>
        </div>
        <p>Short operating notes for accounting-firm owners, controllers and reviewers evaluating offshore or remote accounting capacity.</p>
      </div>
      <div class="container bp3-insight-grid">
        <article class="bp3-insight-card bp-reveal">
          <div class="bp3-insight-meta"><span>RECONCILIATION</span>${platformMark('qbo')}</div>
          <h3>A reconciliation can reach zero and still deserve attention.</h3>
          <p>Aged outstanding items, stale cheques, duplicate entries or unsupported reconciling items can survive a technically balanced reconciliation.</p>
          <strong>Reviewer lens</strong><small>Ask what remains outstanding, how old it is and whether the evidence supports the treatment.</small>
        </article>
        <article class="bp3-insight-card bp-reveal">
          <div class="bp3-insight-meta"><span>WORKPAPERS</span>${platformMark('excel')}</div>
          <h3>Reviewer-ready is a file structure, not a marketing phrase.</h3>
          <p>The reviewer should be able to trace material balances, find the support, identify open matters and understand what preparation was performed.</p>
          <strong>Reviewer lens</strong><small>Separate completed work, exceptions and judgement items instead of blending them together.</small>
        </article>
        <article class="bp3-insight-card bp-reveal">
          <div class="bp3-insight-meta"><span>PILOT DESIGN</span>${platformMark('xero')}</div>
          <h3>A good pilot tests the handoff—not merely the hourly rate.</h3>
          <p>One defined entity, period or reconciliation batch is enough to assess communication, documentation, exception handling and review quality.</p>
          <strong>Reviewer lens</strong><small>Scale only after the first file proves that your review process becomes easier rather than noisier.</small>
        </article>
      </div>`;

    contact.insertAdjacentElement('beforebegin', section);
  };

  const improveSoftwareLegal = () => {
    const legal = q('.bp-tool-legal');
    if (!legal) return;
    legal.textContent = 'QuickBooks is a registered trademark of Intuit Inc. Microsoft Excel and Power BI are Microsoft product names. Xero is a trademark of Xero Limited. Product references describe workflow familiarity only; no partnership or endorsement is implied unless expressly stated.';
  };

  const reveal = () => {
    const items = qa('.bp-reveal:not(.bp-visible)');
    if (!items.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('bp-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('bp-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -45px' });
    items.forEach(item => observer.observe(item));
  };

  const init = () => {
    replaceExistingToolMarks();
    decorateCredibilityRail();
    decorateFounderTools();
    makePlatformPicker();
    decorateMarketProof();
    decorateServiceCards();
    makePracticeNotes();
    improveSoftwareLegal();
    reveal();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();