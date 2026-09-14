(() => {
  'use strict';

  const q = (selector, context = document) => context.querySelector(selector);
  const qa = (selector, context = document) => [...context.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.querySelector('link[data-bp-elite-polish]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/elite-polish-v2.css?v=20260914-r1';
    style.dataset.bpElitePolish = 'true';
    document.head.appendChild(style);
  }

  if (!q('#main .hero')) return;

  const toolMarks = {
    qbo: `
      <span class="bp2-tool-mark bp2-qbo" aria-hidden="true">
        <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"/><path d="M15 17h18M15 23h12M15 29h15"/><text x="24" y="39">QBO</text></svg>
      </span>`,
    xero: `
      <span class="bp2-tool-mark bp2-xero" aria-hidden="true">
        <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"/><path d="M15 15l18 18M33 15L15 33"/><text x="24" y="43">Xero</text></svg>
      </span>`,
    excel: `
      <span class="bp2-tool-mark bp2-excel" aria-hidden="true">
        <svg viewBox="0 0 48 48"><rect x="10" y="9" width="28" height="30" rx="5"/><path d="M10 19h28M19 9v30M29 9v30M10 29h28"/><text x="24" y="45">XLS</text></svg>
      </span>`,
    powerbi: `
      <span class="bp2-tool-mark bp2-powerbi" aria-hidden="true">
        <svg viewBox="0 0 48 48"><rect x="11" y="27" width="5" height="10" rx="2"/><rect x="19" y="21" width="5" height="16" rx="2"/><rect x="27" y="15" width="5" height="22" rx="2"/><rect x="35" y="10" width="4" height="27" rx="2"/><text x="24" y="45">BI</text></svg>
      </span>`
  };

  const tools = [
    { key: 'qbo', name: 'QuickBooks Online', short: 'QBO', detail: 'Bookkeeping, reconciliations and month-end workflows', status: 'Workflow experience' },
    { key: 'xero', name: 'Xero', short: 'Xero', detail: 'Bookkeeping, reconciliations and accounting-delivery workflows', status: 'L1 Certified' },
    { key: 'excel', name: 'Microsoft Excel', short: 'Excel', detail: 'Workpapers, schedules, reconciliations and review packs', status: 'Core tool' },
    { key: 'powerbi', name: 'Microsoft Power BI', short: 'Power BI', detail: 'Management reporting and analytical presentation', status: 'Core tool' }
  ];

  const toolPill = tool => `<span class="bp2-tool-pill" data-tool="${tool.key}">${toolMarks[tool.key]}<span>${tool.short}</span></span>`;

  const upgradeSoftwareGrid = () => {
    const grid = q('.bp-software-grid');
    if (!grid || grid.dataset.elite === 'true') return;
    const chips = qa('.bp-software-chip', grid);
    chips.forEach((chip, index) => {
      const tool = tools[index];
      if (!tool) return;
      chip.dataset.tool = tool.key;
      chip.innerHTML = `
        <div class="bp2-tool-head">${toolMarks[tool.key]}<span class="bp-tool-status">${tool.status}</span></div>
        <div class="bp2-tool-name"><strong>${tool.name}</strong><span>${tool.short}</span></div>
        <p class="bp-tool-detail">${tool.detail}</p>`;
    });
    const legal = q('.bp-tool-legal', grid);
    if (legal) {
      legal.textContent = 'Product names are used only to describe workflow familiarity. QuickBooks is a trademark/service mark of Intuit Inc.; Microsoft Excel and Power BI are Microsoft product names; Xero is a Xero Limited product name. No partnership or endorsement is implied unless expressly stated.';
    }
    grid.dataset.elite = 'true';
  };

  const addHeroToolRail = () => {
    if (q('.bp2-hero-tool-rail')) return;
    const proof = q('.hero-proof');
    if (!proof) return;
    const rail = document.createElement('div');
    rail.className = 'bp2-hero-tool-rail';
    rail.setAttribute('aria-label', 'Core accounting and reporting tools');
    rail.innerHTML = `<span class="bp2-rail-label">Built around your working stack</span><div>${tools.map(toolPill).join('')}</div>`;
    proof.insertAdjacentElement('afterend', rail);
  };

  const addFounderToolMarks = () => {
    const credentials = q('.founder-credentials');
    if (!credentials || q('.bp2-founder-tools', credentials)) return;
    const blocks = qa(':scope > div', credentials);
    const toolBlock = blocks.find(block => q('span', block)?.textContent.trim().toLowerCase() === 'core tools');
    if (!toolBlock) return;
    const strong = q('strong', toolBlock);
    if (!strong) return;
    strong.className = 'bp2-founder-tools';
    strong.innerHTML = tools.map(toolPill).join('');
  };

  const addFormToolCue = () => {
    if (q('.bp2-form-tool-cue')) return;
    const step = q('[data-form-step="2"]');
    if (!step) return;
    const platformField = qa('.field', step).find(field => q(':scope > span', field)?.textContent.trim().toLowerCase() === 'accounting platform');
    if (!platformField) return;
    const cue = document.createElement('div');
    cue.className = 'bp2-form-tool-cue';
    cue.innerHTML = `<span>Core workflow environment</span><div>${tools.map(toolPill).join('')}</div>`;
    platformField.insertAdjacentElement('beforebegin', cue);
  };

  const makeReviewerShift = () => {
    if (q('#reviewer-shift')) return;
    const anchor = q('#delivery-preview') || q('#deliverables');
    if (!anchor) return;
    const section = document.createElement('section');
    section.className = 'section bp2-reviewer-shift';
    section.id = 'reviewer-shift';
    section.innerHTML = `
      <div class="container section-intro centered bp-reveal">
        <p class="eyebrow">Change the review experience</p>
        <h2>Move from task-complete files to reviewer-ready files.</h2>
        <p>The differentiator is not simply whether bookkeeping is finished. It is whether the next professional can understand what was done, trace the evidence and find the unresolved matters quickly.</p>
      </div>
      <div class="container bp2-shift-shell">
        <article class="bp2-shift-card before bp-reveal">
          <div class="bp2-shift-head"><span>Typical friction</span><strong>Before a controlled preparation layer</strong></div>
          <div class="bp2-shift-list">
            <div><i>01</i><span><strong>Evidence is scattered</strong><small>Statements, schedules and support sit across folders, email and chat.</small></span></div>
            <div><i>02</i><span><strong>Queries arrive one at a time</strong><small>Review time is interrupted by repeated information requests.</small></span></div>
            <div><i>03</i><span><strong>Exceptions hide inside “completed” work</strong><small>The reviewer discovers unresolved items late in the process.</small></span></div>
            <div><i>04</i><span><strong>Senior staff repair preparation</strong><small>Review turns into rework instead of judgement.</small></span></div>
          </div>
        </article>
        <div class="bp2-shift-bridge bp-reveal" aria-hidden="true"><span>BLUEPEAK<br>CONTROL LAYER</span><i></i></div>
        <article class="bp2-shift-card after bp-reveal">
          <div class="bp2-shift-head"><span>Reviewer-ready state</span><strong>With structured BluePeak handoff</strong></div>
          <div class="bp2-shift-list">
            <div><i>01</i><span><strong>Evidence is indexed</strong><small>Material balances connect back to the relevant source or schedule.</small></span></div>
            <div><i>02</i><span><strong>Queries are consolidated</strong><small>Open information requests sit in one visible tracker.</small></span></div>
            <div><i>03</i><span><strong>Exceptions stay visible</strong><small>Completed work and judgement items are deliberately separated.</small></span></div>
            <div><i>04</i><span><strong>Review begins at the right level</strong><small>The responsible professional can focus on judgement and approval.</small></span></div>
          </div>
        </article>
      </div>`;
    anchor.insertAdjacentElement('afterend', section);
  };

  const makeFitFilter = () => {
    if (q('#engagement-fit')) return;
    const pilot = q('#pilot');
    if (!pilot) return;
    const section = document.createElement('section');
    section.className = 'section bp2-fit-section';
    section.id = 'engagement-fit';
    section.innerHTML = `
      <div class="container bp2-fit-layout">
        <div class="bp2-fit-copy bp-reveal">
          <p class="eyebrow">Fit before scale</p>
          <h2>The best outsourcing relationship starts by being clear about what belongs in scope.</h2>
          <p>BluePeak is strongest where repeatable accounting execution, reconciliation discipline and structured review handoff matter. Work requiring regulated authority or specialist judgement is scoped separately.</p>
          <a class="text-link" href="#contact">Check a workflow with us <span>↗</span></a>
        </div>
        <div class="bp2-fit-grid">
          <article class="bp2-fit-card strong bp-reveal"><span>Strong fit</span><h3>Preparation-heavy accounting work</h3><ul><li>Recurring bookkeeping and month-end preparation</li><li>Bank, card and balance-sheet reconciliations</li><li>Cleanup, catch-up and backlog assignments</li><li>White-label workpapers, schedules and query management</li></ul></article>
          <article class="bp2-fit-card scope bp-reveal"><span>Separate scoping</span><h3>Authority or specialist-judgement work</h3><ul><li>Regulated sign-off, audit opinions or statutory authority</li><li>Direct client advisory requiring jurisdiction-specific licensure</li><li>Complex tax return filing or regulated tax representation</li><li>Payment approval, collection authority or treasury control</li></ul></article>
        </div>
      </div>`;
    pilot.insertAdjacentElement('beforebegin', section);
  };

  const addMarketMicroProof = () => {
    if (q('.bp2-market-proof')) return;
    const shell = q('.audience-shell');
    if (!shell) return;
    const strip = document.createElement('div');
    strip.className = 'bp2-market-proof container bp-reveal';
    strip.innerHTML = `
      <div><span>United States</span><strong>QBO &amp; close-support workflows</strong></div>
      <div><span>United Kingdom</span><strong>Xero &amp; practice-support workflows</strong></div>
      <div><span>Singapore</span><strong>Xero, GST source data &amp; month-end support</strong></div>
      <p>Workflow references describe operating familiarity; regulated filing and sign-off remain with the responsible professional.</p>`;
    shell.insertAdjacentElement('afterend', strip);
  };

  const enhanceTabKeyboard = selector => {
    qa(selector).forEach(list => {
      const tabs = qa('[role="tab"]', list);
      if (tabs.length < 2 || list.dataset.keyboardEnhanced === 'true') return;
      list.dataset.keyboardEnhanced = 'true';
      tabs.forEach((tab, index) => {
        tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
        tab.addEventListener('click', () => tabs.forEach(item => { item.tabIndex = item === tab ? 0 : -1; }));
        tab.addEventListener('keydown', event => {
          const horizontal = event.key === 'ArrowRight' || event.key === 'ArrowLeft';
          const vertical = event.key === 'ArrowDown' || event.key === 'ArrowUp';
          if (!horizontal && !vertical && event.key !== 'Home' && event.key !== 'End') return;
          event.preventDefault();
          let next = index;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = tabs.length - 1;
          tabs[next].focus();
          tabs[next].click();
        });
      });
    });
  };

  const addPointerLight = () => {
    if (reduceMotion || !window.matchMedia('(pointer:fine)').matches) return;
    qa('.bp-software-chip,.bp2-shift-card,.bp2-fit-card,.bp-bottleneck-panel,.leader-card').forEach(card => {
      if (card.dataset.pointerLight === 'true') return;
      card.dataset.pointerLight = 'true';
      card.classList.add('bp2-pointer-light');
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    });
  };

  const revealAdded = () => {
    const items = qa('.bp-reveal:not(.bp-visible)');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
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
    upgradeSoftwareGrid();
    addHeroToolRail();
    addFounderToolMarks();
    addFormToolCue();
    makeReviewerShift();
    makeFitFilter();
    addMarketMicroProof();
    enhanceTabKeyboard('.bp-preview-menu,.bp-bottleneck-menu,.audience-tabs');
    revealAdded();
    window.requestAnimationFrame(addPointerLight);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
