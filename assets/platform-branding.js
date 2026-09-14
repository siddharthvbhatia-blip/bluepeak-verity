(() => {
  'use strict';

  // Original vendor-hosted artwork from official brand/media libraries.
  const XERO_LOGO = 'https://www.xero.com/content/dam/xero/pilot-images/explainer/media-downloads/xero-logo-downloads.1762731076660.png';
  const QUICKBOOKS_LOGO = 'https://www.intuit.com/oidam/intuit/ic/en_us/images/h-z/intuit-logos-quickbooks-color-376x250.jpg';

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
          <article class="platform-card brand-card quickbooks-card" data-reveal>
            <div class="platform-card-mark platform-card-mark-qbo">
              <img src="${QUICKBOOKS_LOGO}" alt="Intuit QuickBooks" loading="lazy" decoding="async">
            </div>
            <div><h3>QuickBooks Online</h3><p>Bookkeeping, invoicing, bank-feed and reconciliation workflows.</p></div>
          </article>
          <article class="platform-card brand-card xero-card" data-reveal>
            <div class="platform-card-mark platform-card-mark-xero">
              <img src="${XERO_LOGO}" alt="Xero" loading="lazy" decoding="async">
            </div>
            <div><h3>Xero</h3><p>Certified familiarity with cloud bookkeeping and reconciliation workflows.</p></div>
          </article>
          <article class="platform-card text-platform-card" data-reveal>
            <div class="platform-text-mark"><small>MICROSOFT</small><strong>Excel</strong></div>
            <div><h3>Microsoft Excel</h3><p>Schedules, reconciliations, workpapers and structured analysis.</p></div>
          </article>
          <article class="platform-card text-platform-card" data-reveal>
            <div class="platform-text-mark"><small>MICROSOFT</small><strong>Power BI</strong></div>
            <div><h3>Microsoft Power BI</h3><p>Management reporting and analytical support where the engagement requires it.</p></div>
          </article>
        </div>
        <p class="platform-stack-note">QuickBooks and Xero marks shown above are original vendor artwork from official brand/media sources. Product references identify workflow familiarity only; no vendor partnership, sponsorship or endorsement is implied.</p>
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

    // Keep the vendor mark completely unmodified. Credential wording remains in page copy/meta data.
    document.querySelectorAll('.credential-badge-large').forEach((badge) => {
      badge.classList.add('bp-official-xero', 'bp-xero-logo-only');
      badge.setAttribute('aria-label', 'Xero');
      badge.innerHTML = `<img src="${XERO_LOGO}" alt="Xero" loading="eager" decoding="async">`;
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
