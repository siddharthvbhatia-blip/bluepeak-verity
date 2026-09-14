(() => {
  'use strict';

  const XERO_LOGO = 'https://www.xero.com/content/dam/xero/pilot-images/explainer/media-downloads/xero-logo-downloads.1762731076660.png';

  const icons = {
    ledger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h14v15H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M4 9h16M9 4v16M14.5 9v11"/></svg>',
    chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"/><rect x="6" y="12" width="3" height="6" rx=".5"/><rect x="11" y="8" width="3" height="10" rx=".5"/><rect x="16" y="4" width="3" height="14" rx=".5"/></svg>'
  };

  const addPlatformSection = () => {
    const anchor = document.querySelector('.credibility-rail');
    if (!anchor || document.querySelector('.platform-stack-section')) return;

    const section = document.createElement('section');
    section.className = 'platform-stack-section';
    section.setAttribute('aria-labelledby', 'platform-stack-title');
    section.innerHTML = `
      <div class="container">
        <div class="platform-stack-head" data-reveal>
          <div>
            <p class="eyebrow">Accounting technology</p>
            <h2 id="platform-stack-title">Work delivered inside the platforms your finance team already uses.</h2>
          </div>
          <p>Platform familiarity matters because clean accounting delivery depends on correct system workflow, source traceability and a reviewer-friendly handoff—not merely data entry.</p>
        </div>
        <div class="platform-stack-grid">
          <article class="platform-card" data-reveal>
            <div class="platform-card-mark"><span class="platform-neutral-glyph">${icons.ledger}</span></div>
            <div><h3>QuickBooks Online</h3><p>Bookkeeping, invoicing, bank-feed and reconciliation workflows.</p></div>
          </article>
          <article class="platform-card xero-card" data-reveal>
            <div class="platform-card-mark"><img src="${XERO_LOGO}" alt="Xero" loading="lazy" decoding="async"></div>
            <div><h3>Xero</h3><p>Certified familiarity with cloud bookkeeping and reconciliation workflows.</p></div>
          </article>
          <article class="platform-card" data-reveal>
            <div class="platform-card-mark"><span class="platform-neutral-glyph">${icons.sheet}</span></div>
            <div><h3>Microsoft Excel</h3><p>Schedules, reconciliations, workpapers and structured analysis.</p></div>
          </article>
          <article class="platform-card" data-reveal>
            <div class="platform-card-mark"><span class="platform-neutral-glyph">${icons.chart}</span></div>
            <div><h3>Microsoft Power BI</h3><p>Management reporting and analytical support where the engagement requires it.</p></div>
          </article>
        </div>
        <p class="platform-stack-note">Product names and permitted marks are used only to identify software relevant to client workflows. No software-vendor partnership, sponsorship or endorsement is implied.</p>
      </div>`;

    anchor.insertAdjacentElement('afterend', section);
  };

  const replaceXeroCredentialArtwork = () => {
    document.querySelectorAll('.xero-mark').forEach((mark) => {
      mark.classList.add('bp-official-xero');
      mark.removeAttribute('aria-hidden');
      mark.setAttribute('aria-label', 'Xero');
      mark.innerHTML = `<img src="${XERO_LOGO}" alt="Xero" loading="lazy" decoding="async">`;
    });

    document.querySelectorAll('.credential-badge-large').forEach((badge) => {
      badge.classList.add('bp-official-xero');
      badge.setAttribute('aria-label', 'Xero L1 Certified Associate');
      badge.innerHTML = `<img src="${XERO_LOGO}" alt="Xero" loading="eager" decoding="async"><span class="bp-xero-level">L1 Certified Associate</span>`;
    });
  };

  const normalizePlatformNaming = () => {
    document.querySelectorAll('.hero-proof span').forEach((item) => {
      if (item.textContent.trim() === 'QBO & Xero workflows') {
        item.textContent = 'QuickBooks Online & Xero workflows';
      }
    });

    document.querySelectorAll('.founder-credentials > div').forEach((row) => {
      const label = row.querySelector('span');
      const value = row.querySelector('strong');
      if (!label || !value || label.textContent.trim().toLowerCase() !== 'core tools') return;
      value.textContent = '';
      value.classList.add('bp-tools-inline');
      ['QuickBooks Online', 'Xero', 'Microsoft Excel', 'Microsoft Power BI'].forEach((name) => {
        const chip = document.createElement('span');
        chip.textContent = name;
        value.appendChild(chip);
      });
    });
  };

  const addFooterBrandNote = () => {
    const footerBrand = document.querySelector('.site-footer .footer-brand');
    if (!footerBrand || footerBrand.querySelector('.bp-brand-legal')) return;
    const note = document.createElement('p');
    note.className = 'bp-brand-legal';
    note.textContent = 'QuickBooks is a trademark of Intuit Inc.; Xero is a trademark of Xero Limited; Microsoft Excel and Microsoft Power BI are Microsoft product names. Vendor references do not imply affiliation or endorsement.';
    footerBrand.appendChild(note);
  };

  addPlatformSection();
  replaceXeroCredentialArtwork();
  normalizePlatformNaming();
  addFooterBrandNote();
})();
