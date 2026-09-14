(() => {
  'use strict';

  const q = (selector, context = document) => context.querySelector(selector);
  const qa = (selector, context = document) => [...context.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.querySelector('link[data-bp-client-experience]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/client-experience-upgrade.css?v=20260914-r1';
    style.dataset.bpClientExperience = 'true';
    document.head.appendChild(style);
  }

  const isHome = !!q('#main .hero') && !!q('#delegate') && !!q('#contact');
  if (!isHome) return;

  const makeWorkstreamStrip = () => {
    if (q('.bp-workstream-strip')) return;
    const credibility = q('.credibility-rail');
    if (!credibility) return;

    const services = [
      'Bookkeeping',
      'Bank & Card Reconciliations',
      'Month-End Close',
      'AP & AR',
      'Cleanup & Backlogs',
      'Financial Reporting',
      'Reviewer Workpapers',
      'Tax Source-Data Support'
    ];
    const set = services.map(item => `<span class="bp-workstream-item"><i aria-hidden="true"></i>${item}</span>`).join('');

    const strip = document.createElement('section');
    strip.className = 'bp-workstream-strip';
    strip.setAttribute('aria-label', 'BluePeak Verity accounting workstreams');
    strip.innerHTML = `<div class="bp-workstream-track"><div class="bp-workstream-set">${set}</div><div class="bp-workstream-set" aria-hidden="true">${set}</div></div>`;
    credibility.insertAdjacentElement('afterend', strip);
  };

  const previewData = {
    reconcile: {
      kicker: 'Reconciliation workflow',
      title: 'Match what can be matched. Isolate what still needs judgement.',
      copy: 'A useful reconciliation does more than reach zero. It shows what cleared, what remains outstanding, and which items need reviewer or client follow-up.',
      rows: [
        ['Statement-to-ledger matching', 'Matched', 'ok', 100],
        ['Outstanding items schedule', 'Prepared', 'ok', 84],
        ['Unexplained or aged items', 'Review', 'warn', 48]
      ],
      note: 'Unresolved differences remain visible in an open-items tracker rather than being forced through unsupported entries.'
    },
    close: {
      kicker: 'Month-end workflow',
      title: 'Turn the close into a visible sequence instead of a scattered checklist.',
      copy: 'Recurring work is organised around a defined cut-off, reconciliation status, supporting schedules, open matters and a clear handoff to the reviewer.',
      rows: [
        ['Cash, bank and card accounts', 'Reconciled', 'ok', 100],
        ['Balance-sheet schedules', 'Prepared', 'ok', 78],
        ['Accruals and judgement items', 'Reviewer queue', 'review', 58]
      ],
      note: 'The reviewer sees what is complete, what is pending, and where professional judgement is still required.'
    },
    cleanup: {
      kicker: 'Cleanup workflow',
      title: 'Historical problems are easier to fix when exceptions are separated by type.',
      copy: 'Cleanup work is structured so duplicated entries, old reconciling items, classification issues and missing evidence do not disappear inside one large adjustment.',
      rows: [
        ['Duplicate / unusual patterns', 'Flagged', 'review', 74],
        ['Old reconciling items', 'Isolated', 'warn', 61],
        ['Missing supporting records', 'Query list', 'warn', 44]
      ],
      note: 'Proposed corrections can be prepared for review while unsupported items remain clearly identified.'
    },
    handoff: {
      kicker: 'Reviewer handoff',
      title: 'The final output should make the next professional faster, not slower.',
      copy: 'The handoff brings together the schedules, evidence references, unresolved matters and completion status needed for an efficient review.',
      rows: [
        ['Workpapers and schedules', 'Indexed', 'ok', 100],
        ['Exceptions and query tracker', 'Consolidated', 'ok', 92],
        ['Review status', 'Ready for review', 'review', 82]
      ],
      note: 'The objective is a file that is understandable, traceable and easy to continue reviewing.'
    }
  };

  const makePreviewSection = () => {
    if (q('#delivery-preview')) return;
    const deliverables = q('#deliverables');
    if (!deliverables) return;

    const section = document.createElement('section');
    section.className = 'section bp-preview-section';
    section.id = 'delivery-preview';
    section.innerHTML = `
      <div class="container section-intro bp-reveal">
        <p class="eyebrow">See the work before you buy the capacity</p>
        <h2>Accounting support should feel visible while it is being delivered.</h2>
        <p>These generic workflow views illustrate how BluePeak structures preparation, exceptions and reviewer handoff. They are not client data and do not represent guaranteed turnaround or performance metrics.</p>
      </div>
      <div class="container bp-preview-layout">
        <div class="bp-preview-menu bp-reveal" role="tablist" aria-label="Illustrative accounting workflows">
          <button class="bp-preview-tab" type="button" role="tab" aria-selected="true" data-preview="reconcile"><span class="bp-preview-index">01</span><strong>Reconciliation</strong><span class="bp-preview-arrow" aria-hidden="true">→</span></button>
          <button class="bp-preview-tab" type="button" role="tab" aria-selected="false" data-preview="close"><span class="bp-preview-index">02</span><strong>Month-end close</strong><span class="bp-preview-arrow" aria-hidden="true">→</span></button>
          <button class="bp-preview-tab" type="button" role="tab" aria-selected="false" data-preview="cleanup"><span class="bp-preview-index">03</span><strong>Cleanup & backlog</strong><span class="bp-preview-arrow" aria-hidden="true">→</span></button>
          <button class="bp-preview-tab" type="button" role="tab" aria-selected="false" data-preview="handoff"><span class="bp-preview-index">04</span><strong>Reviewer handoff</strong><span class="bp-preview-arrow" aria-hidden="true">→</span></button>
        </div>
        <div class="bp-preview-panel bp-reveal" role="tabpanel" aria-live="polite">
          <div class="bp-preview-top"><span class="bp-preview-kicker"></span><span class="bp-preview-sample">Illustrative sample · no client data</span></div>
          <h3></h3>
          <p class="bp-preview-copy"></p>
          <div class="bp-preview-board"></div>
          <div class="bp-preview-note"></div>
        </div>
      </div>`;

    deliverables.insertAdjacentElement('afterend', section);
  };

  const makeSoftwareSection = () => {
    if (q('.bp-software-section')) return;
    const credential = q('.credential-section');
    if (!credential) return;

    const section = document.createElement('section');
    section.className = 'bp-software-section';
    section.setAttribute('aria-label', 'Accounting software and reporting tools');
    section.innerHTML = `
      <div class="container bp-software-layout">
        <div class="bp-software-copy bp-reveal">
          <p class="eyebrow">Work inside your existing stack</p>
          <h2>Your tools should not become an onboarding project.</h2>
          <p>BluePeak's core working environment is built around the platforms most relevant to its current accounting-delivery model.</p>
        </div>
        <div class="bp-software-grid bp-reveal">
          <div class="bp-software-chip"><span>Accounting</span><strong>QBO</strong></div>
          <div class="bp-software-chip"><span>Accounting</span><strong>Xero</strong></div>
          <div class="bp-software-chip"><span>Workpapers</span><strong>Excel</strong></div>
          <div class="bp-software-chip"><span>Reporting</span><strong>Power BI</strong></div>
          <div class="bp-software-note"><i aria-hidden="true"></i><span>Client-controlled access, agreed file conventions and review responsibilities are defined before recurring work begins.</span></div>
        </div>
      </div>`;

    credential.insertAdjacentElement('afterend', section);
  };

  const faqs = [
    ['Can BluePeak work behind our accounting firm rather than directly with our client?', 'Yes, where the engagement is structured that way. BluePeak can work as a white-label preparation layer while your firm retains the client relationship, professional judgement, final review and any regulated responsibility.'],
    ['Will BluePeak replace our reviewer or make professional judgements for us?', 'No. BluePeak is positioned around execution, reconciliation, schedules, workpapers, exception visibility and reviewer handoff. Professional conclusions and regulated sign-off remain with the appropriately responsible professional.'],
    ['What is the safest way to start?', 'Start with one defined pilot: an entity, a reconciliation batch, a cleanup period or another clearly bounded workflow. That allows both sides to test communication, file quality, documentation and handoff before recurring capacity is expanded.'],
    ['Which tools can BluePeak work with?', 'The current core stack is QBO, Xero, Excel and Power BI. If an engagement depends on another platform or specialist compliance software, access and capability should be reviewed before the scope is confirmed.'],
    ['What happens when a balance does not reconcile or information is missing?', 'The item should remain visible. BluePeak is designed to isolate unexplained differences, missing evidence and judgement matters into a structured query or open-items tracker instead of hiding them inside unsupported entries.'],
    ['How should system access and client information be handled?', 'Access should be limited to the agreed role and scope, preferably through client- or firm-controlled permissions. File exchange, retention expectations, review responsibility and access removal should be agreed before delivery begins.']
  ];

  const makeFaqSection = () => {
    if (q('#faq')) return;
    const pricing = q('#pricing');
    if (!pricing) return;

    const items = faqs.map((item, index) => `
      <div class="bp-faq-item">
        <button class="bp-faq-button" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
          <span class="bp-faq-num">${String(index + 1).padStart(2, '0')}</span>
          <strong>${item[0]}</strong>
          <span class="bp-faq-toggle" aria-hidden="true">+</span>
        </button>
        <div class="bp-faq-answer"><div><p>${item[1]}</p></div></div>
      </div>`).join('');

    const section = document.createElement('section');
    section.className = 'section bp-faq-section';
    section.id = 'faq';
    section.innerHTML = `
      <div class="container bp-faq-layout">
        <div class="section-intro bp-faq-copy bp-reveal">
          <p class="eyebrow">Before you outsource</p>
          <h2>The questions a careful accounting firm should ask first.</h2>
          <p>Good outsourcing starts with boundaries, review responsibility and a controlled first assignment—not with a large commitment.</p>
          <a class="text-link" href="#contact">Discuss your workflow <span>↗</span></a>
        </div>
        <div class="bp-faq-list bp-reveal">${items}</div>
      </div>`;

    pricing.insertAdjacentElement('afterend', section);
  };

  const makeScrollCta = () => {
    if (q('.bp-scroll-cta')) return;
    const cta = document.createElement('aside');
    cta.className = 'bp-scroll-cta';
    cta.setAttribute('aria-label', 'Discuss a BluePeak pilot');
    cta.innerHTML = `<div class="bp-scroll-cta-copy"><span>Need accounting capacity?</span><strong>Start with one defined workflow.</strong></div><a href="#contact">Discuss a Pilot ↗</a>`;
    document.body.appendChild(cta);
  };

  const renderPreview = key => {
    const data = previewData[key];
    const panel = q('.bp-preview-panel');
    if (!data || !panel) return;

    q('.bp-preview-kicker', panel).textContent = data.kicker;
    q('h3', panel).textContent = data.title;
    q('.bp-preview-copy', panel).textContent = data.copy;
    q('.bp-preview-board', panel).innerHTML = data.rows.map(row => `
      <div class="bp-preview-row">
        <div class="bp-preview-row-main">
          <div class="bp-preview-row-label"><span>${row[0]}</span><span class="bp-preview-status ${row[2]}">${row[1]}</span></div>
          <div class="bp-preview-progress" aria-hidden="true"><span data-progress="${row[3]}"></span></div>
        </div>
      </div>`).join('');
    q('.bp-preview-note', panel).innerHTML = `<strong>Reviewer principle:</strong> ${data.note}`;

    qa('.bp-preview-tab').forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.preview === key)));
    panel.classList.remove('bp-refresh');
    void panel.offsetWidth;
    panel.classList.add('bp-refresh');

    requestAnimationFrame(() => requestAnimationFrame(() => {
      qa('.bp-preview-progress span', panel).forEach(bar => { bar.style.width = `${bar.dataset.progress}%`; });
    }));
  };

  const initFaq = () => {
    qa('.bp-faq-button').forEach(button => {
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  };

  const initReveal = () => {
    const items = qa('.bp-reveal');
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
    }, { threshold: 0.13, rootMargin: '0px 0px -50px' });
    items.forEach(item => observer.observe(item));
  };

  const initHeroWorkflowMotion = () => {
    if (reduceMotion) return;
    const nodes = qa('.workflow-node');
    const rows = qa('.ledger-row');
    if (!nodes.length) return;
    let index = 0;
    window.setInterval(() => {
      nodes.forEach(node => node.classList.remove('bp-focus'));
      rows.forEach(row => row.classList.remove('bp-focus'));
      const node = nodes[index % nodes.length];
      node?.classList.add('bp-focus');
      rows[index % Math.max(rows.length, 1)]?.classList.add('bp-focus');
      index += 1;
    }, 1700);
  };

  const initScrollCta = () => {
    const cta = q('.bp-scroll-cta');
    const contact = q('#contact');
    if (!cta || !contact) return;
    const update = () => {
      const contactTop = contact.getBoundingClientRect().top;
      const show = window.scrollY > Math.max(520, window.innerHeight * .55) && contactTop > window.innerHeight * .75;
      cta.classList.toggle('is-visible', show);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  };

  const init = () => {
    makeWorkstreamStrip();
    makePreviewSection();
    makeSoftwareSection();
    makeFaqSection();
    makeScrollCta();

    renderPreview('reconcile');
    qa('.bp-preview-tab').forEach(tab => tab.addEventListener('click', () => renderPreview(tab.dataset.preview)));
    initFaq();
    initReveal();
    initHeroWorkflowMotion();
    initScrollCta();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
