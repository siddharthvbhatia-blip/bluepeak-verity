(() => {
  'use strict';

  const q = (selector, context = document) => context.querySelector(selector);
  const qa = (selector, context = document) => [...context.querySelectorAll(selector)];

  if (!document.querySelector('link[data-bp-benchmark-polish]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/benchmark-polish.css?v=20260914-r1';
    style.dataset.bpBenchmarkPolish = 'true';
    document.head.appendChild(style);
  }

  if (!q('#main .hero')) return;

  const toolMarks = {
    qbo: `
      <span class="bp-tool-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" role="img">
          <circle cx="20" cy="20" r="16" fill="#2CA01C"/>
          <text x="20" y="24" text-anchor="middle" font-size="13" font-weight="800" font-family="Arial,sans-serif" fill="#fff">QB</text>
        </svg>
      </span>`,
    xero: `
      <span class="bp-tool-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" role="img">
          <circle cx="20" cy="20" r="16" fill="#13B5EA"/>
          <text x="20" y="23" text-anchor="middle" font-size="10" font-weight="700" font-family="Arial,sans-serif" fill="#fff">xero</text>
        </svg>
      </span>`,
    excel: `
      <span class="bp-tool-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" role="img">
          <rect x="12" y="7" width="21" height="26" rx="3" fill="#107C41"/>
          <rect x="7" y="11" width="18" height="18" rx="3" fill="#185C37"/>
          <path d="M12 15l3.2 5L12 25h3.2l1.8-3.2 1.8 3.2H22l-3.2-5L22 15h-3.2L17 18.2 15.2 15z" fill="#fff"/>
          <path d="M25 13h5M25 18h5M25 23h5M25 28h5" stroke="#fff" stroke-width="1.5" opacity=".85"/>
        </svg>
      </span>`,
    powerbi: `
      <span class="bp-tool-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" role="img">
          <rect x="8" y="21" width="5" height="11" rx="2.5" fill="#F2C811"/>
          <rect x="15" y="15" width="5" height="17" rx="2.5" fill="#F2C811"/>
          <rect x="22" y="10" width="5" height="22" rx="2.5" fill="#F2C811"/>
          <rect x="29" y="6" width="5" height="26" rx="2.5" fill="#F2C811"/>
        </svg>
      </span>`
  };

  const upgradeSoftwareTiles = () => {
    const grid = q('.bp-software-grid');
    if (!grid || grid.dataset.polished === 'true') return;
    const chips = qa('.bp-software-chip', grid);
    const tools = [
      { key: 'qbo', name: 'QuickBooks Online', detail: 'Bookkeeping, reconciliations and close workflows', status: 'Workflow experience' },
      { key: 'xero', name: 'Xero', detail: 'Bookkeeping, reconciliations and accounting-delivery workflows', status: 'Certified' },
      { key: 'excel', name: 'Microsoft Excel', detail: 'Workpapers, schedules, reconciliations and review packs', status: 'Core tool' },
      { key: 'powerbi', name: 'Microsoft Power BI', detail: 'Management reporting and analytical presentation', status: 'Core tool' }
    ];

    chips.forEach((chip, index) => {
      const tool = tools[index];
      if (!tool) return;
      chip.dataset.tool = tool.key;
      chip.innerHTML = `
        <div class="bp-tool-top">${toolMarks[tool.key]}<span class="bp-tool-status">${tool.status}</span></div>
        <strong>${tool.name}</strong>
        <p class="bp-tool-detail">${tool.detail}</p>`;
    });

    const existingNote = q('.bp-software-note', grid);
    if (existingNote) {
      existingNote.insertAdjacentHTML('afterend', '<p class="bp-tool-legal">Product names and trademarks belong to their respective owners. References indicate workflow familiarity only; no partnership or endorsement is implied unless expressly stated.</p>');
    }
    grid.dataset.polished = 'true';
  };

  const bottlenecks = {
    close: {
      label: 'Month-end pressure',
      kicker: 'Recurring close capacity',
      title: 'Move routine close preparation away from senior reviewers.',
      copy: 'When recurring bookkeeping, reconciliations and supporting schedules consume reviewer time, BluePeak can take on the preparation layer while your firm keeps the judgement and sign-off.',
      move: 'Bookkeeping, reconciliations, schedules, open-items tracking',
      retain: 'Material judgement, client advice and final review',
      pilot: 'One entity · one accounting period · reviewer-ready handoff'
    },
    recon: {
      label: 'Reconciliation backlog',
      kicker: 'Balance-sheet control',
      title: 'Clear old reconciling items without hiding the exceptions.',
      copy: 'A backlog is easier to resolve when each unexplained item is isolated, aged and documented rather than pushed through unsupported entries.',
      move: 'Statement matching, open-item schedules, evidence indexing',
      retain: 'Approval of adjustments and judgement over unresolved items',
      pilot: 'One bank/card account or one balance-sheet reconciliation batch'
    },
    cleanup: {
      label: 'Cleanup / catch-up',
      kicker: 'Historical remediation',
      title: 'Turn messy historical books into a structured review file.',
      copy: 'BluePeak can separate duplicates, misclassifications, missing evidence and unreconciled balances into a controlled cleanup workflow for professional review.',
      move: 'Backlog processing, proposed corrections, issue tracker',
      retain: 'Acceptance of adjustments and accounting policy decisions',
      pilot: 'A defined historical period or one cleanup workstream'
    },
    review: {
      label: 'Reviewer overload',
      kicker: 'Preparation quality',
      title: 'Reduce the amount of senior time spent repairing avoidable preparation issues.',
      copy: 'The goal is not simply finished bookkeeping. The file should arrive with schedules, evidence references, visible exceptions and consolidated reviewer queries.',
      move: 'Workpapers, schedules, exception logs, query consolidation',
      retain: 'Professional conclusions, sign-off and client communication',
      pilot: 'One recurring client file reviewed against your preferred template'
    },
    working: {
      label: 'AP / AR visibility',
      kicker: 'Working-capital support',
      title: 'Make receivables, payables and ageing exceptions easier to act on.',
      copy: 'Structured ageing schedules and exception lists can improve visibility without transferring payment, collection or approval authority.',
      move: 'Ageing schedules, balance review, exception tracking',
      retain: 'Payment approval, collection decisions and commercial judgement',
      pilot: 'One monthly AP/AR cycle with agreed reporting format'
    }
  };

  const makeBottleneckSection = () => {
    if (q('#bottleneck-navigator')) return;
    const capacity = q('#capacity');
    if (!capacity) return;

    const section = document.createElement('section');
    section.className = 'section bp-bottleneck-section';
    section.id = 'bottleneck-navigator';
    section.innerHTML = `
      <div class="container section-intro bp-reveal">
        <p class="eyebrow">Start with the bottleneck</p>
        <h2>Tell us where review time is leaking. The scope should follow the problem.</h2>
        <p>Strong accounting outsourcing starts by defining the operational constraint first—not by forcing every client into the same package.</p>
      </div>
      <div class="container bp-bottleneck-layout">
        <div class="bp-bottleneck-menu bp-reveal" role="tablist" aria-label="Common accounting delivery bottlenecks">
          ${Object.entries(bottlenecks).map(([key, value], index) => `<button class="bp-bottleneck-button" type="button" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}" data-bottleneck="${key}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${value.label}</strong><em>→</em></button>`).join('')}
        </div>
        <div class="bp-bottleneck-panel bp-reveal" role="tabpanel" aria-live="polite">
          <span class="bp-panel-kicker"></span>
          <h3></h3>
          <p class="bp-panel-copy"></p>
          <div class="bp-scope-columns">
            <div class="bp-scope-card"><span>Moves to BluePeak</span><strong data-scope="move"></strong></div>
            <div class="bp-scope-card"><span>Remains with your firm</span><strong data-scope="retain"></strong></div>
            <div class="bp-scope-card"><span>Suggested pilot</span><strong data-scope="pilot"></strong></div>
          </div>
          <a class="bp-bottleneck-cta" href="#contact">Scope this workflow <span aria-hidden="true">↗</span></a>
        </div>
      </div>`;
    capacity.insertAdjacentElement('afterend', section);
  };

  const renderBottleneck = key => {
    const data = bottlenecks[key];
    const panel = q('.bp-bottleneck-panel');
    if (!data || !panel) return;
    q('.bp-panel-kicker', panel).textContent = data.kicker;
    q('h3', panel).textContent = data.title;
    q('.bp-panel-copy', panel).textContent = data.copy;
    q('[data-scope="move"]', panel).textContent = data.move;
    q('[data-scope="retain"]', panel).textContent = data.retain;
    q('[data-scope="pilot"]', panel).textContent = data.pilot;
    qa('.bp-bottleneck-button').forEach(button => button.setAttribute('aria-selected', String(button.dataset.bottleneck === key)));
  };

  const addPractitionerCue = () => {
    if (q('.bp-practitioner-card')) return;
    const contactCopy = q('.contact-copy');
    const intro = q('.contact-copy > p:not(.eyebrow)');
    if (!contactCopy || !intro) return;
    const card = document.createElement('div');
    card.className = 'bp-practitioner-card bp-reveal';
    card.innerHTML = '<div class="bp-practitioner-avatar" aria-hidden="true">CA</div><div><span>Direct scope discussion</span><strong>Your initial workflow discussion is with CA Siddharth Bhatia, CEO—not a generic sales queue.</strong></div>';
    intro.insertAdjacentElement('afterend', card);
  };

  const initNavSpy = () => {
    if (!('IntersectionObserver' in window)) return;
    const links = qa('.site-nav a[href^="#"]');
    const pairs = links.map(link => ({ link, section: q(link.getAttribute('href')) })).filter(item => item.section);
    if (!pairs.length) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      pairs.forEach(({ link, section }) => link.classList.toggle('is-current', section === visible.target));
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-24% 0px -58% 0px' });
    pairs.forEach(({ section }) => observer.observe(section));
  };

  const revealAddedItems = () => {
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
    }, { threshold: 0.13, rootMargin: '0px 0px -50px' });
    items.forEach(item => observer.observe(item));
  };

  const init = () => {
    upgradeSoftwareTiles();
    makeBottleneckSection();
    addPractitionerCue();
    renderBottleneck('close');
    qa('.bp-bottleneck-button').forEach(button => button.addEventListener('click', () => renderBottleneck(button.dataset.bottleneck)));
    initNavSpy();
    revealAddedItems();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
