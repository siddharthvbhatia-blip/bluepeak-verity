(() => {
  'use strict';

  const q = (selector, context = document) => context.querySelector(selector);

  const createPoojaCard = () => {
    const article = document.createElement('article');
    article.className = 'leader-card leader-card-senior';
    article.innerHTML = `
      <div class="leader-media">
        <div class="professional-photo">
          <img src="assets/pooja-manawat.jpg" alt="CA. Pooja Manavat, Senior Chartered Accountant at BluePeak Verity" width="560" height="700" loading="lazy" decoding="async">
        </div>
        <span class="leader-role-badge">Senior Chartered Accountant</span>
      </div>
      <div class="leader-copy">
        <p class="eyebrow">Senior Chartered Accountant</p>
        <h2>CA. Pooja Manavat</h2>
        <p class="leader-meta"><strong>Chartered Accountant, India · Qualified 2017 · ICAI Membership 434849</strong></p>
        <p>A Chartered Accountant qualified in 2017 with professional experience across accounting, taxation, audit-related assignments and finance. She contributes senior-level accounting execution, financial review and compliance-oriented experience to BluePeak Verity's client delivery.</p>
        <div class="leader-expertise" aria-label="Areas of expertise">
          <span>Accounting</span><span>Taxation</span><span>Audit Support</span><span>Financial Reporting</span><span>Finance</span><span>Review</span>
        </div>
      </div>`;
    return article;
  };

  const addSectionIntro = (section, beforeNode) => {
    if (q('.leadership-intro', section)) return;
    const intro = document.createElement('div');
    intro.className = 'container section-intro leadership-intro';
    intro.innerHTML = `
      <p class="eyebrow">Leadership &amp; Senior Professionals</p>
      <h2>Founder-led accountability. Senior Chartered Accountant delivery capacity.</h2>
      <p>BluePeak Verity combines founder oversight with senior Chartered Accountant experience across accounting, taxation, finance and defined audit-support work.</p>`;
    section.insertBefore(intro, beforeNode);
  };

  const cleanFounderFrame = photoShell => {
    const frame = q('.founder-photo-frame', photoShell);
    if (!frame) return null;
    frame.classList.add('professional-photo', 'founder-professional-photo');
    q('.founder-orbit', photoShell)?.remove();
    photoShell.querySelectorAll('.founder-label').forEach(node => node.remove());
    return frame;
  };

  const upgradeStandardLeadership = section => {
    const layout = q('.founder-layout', section);
    if (!layout) return false;

    const founderPhotoShell = q('.founder-photo-shell', layout);
    const founderCopy = q('.founder-copy', layout);
    if (!founderPhotoShell || !founderCopy) return false;

    const founderFrame = cleanFounderFrame(founderPhotoShell);
    if (!founderFrame) return false;

    section.classList.add('leadership-section');
    addSectionIntro(section, layout);

    founderCopy.classList.add('leader-copy');
    q('.eyebrow', founderCopy)?.replaceChildren(document.createTextNode('Founder | Chartered Accountant'));
    const founderName = q('h2', founderCopy);
    if (founderName) founderName.textContent = 'CA. Siddharth Bhatia';

    const founderCard = document.createElement('article');
    founderCard.className = 'leader-card leader-card-founder';

    const founderMedia = document.createElement('div');
    founderMedia.className = 'leader-media';
    founderMedia.appendChild(founderFrame);
    founderMedia.insertAdjacentHTML('beforeend', '<span class="leader-role-badge">Founder</span>');

    founderCard.append(founderMedia, founderCopy);

    founderPhotoShell.remove();
    layout.className = 'container leadership-grid';
    layout.replaceChildren(founderCard, createPoojaCard());
    return true;
  };

  const upgradeSingaporeLeadership = section => {
    const layout = q('.sg-founder-mini', section);
    if (!layout) return false;

    const founderPhoto = q('.founder-photo-frame', layout);
    const founderCopy = layout.children[1];
    if (!founderPhoto || !founderCopy) return false;

    section.classList.add('leadership-section', 'sg-leadership-section');
    addSectionIntro(section, layout);

    founderPhoto.classList.add('professional-photo', 'founder-professional-photo');
    founderCopy.classList.add('leader-copy');

    const founderCard = document.createElement('article');
    founderCard.className = 'sg-leader-card';
    const founderMedia = document.createElement('div');
    founderMedia.className = 'sg-leader-photo';
    founderMedia.appendChild(founderPhoto);
    founderCard.append(founderMedia, founderCopy);
    q('.eyebrow', founderCopy)?.replaceChildren(document.createTextNode('Founder | Chartered Accountant'));
    const founderName = q('h2', founderCopy);
    if (founderName) founderName.textContent = 'CA. Siddharth Bhatia';

    const poojaCard = document.createElement('article');
    poojaCard.className = 'sg-leader-card';
    poojaCard.innerHTML = `
      <div class="sg-leader-photo professional-photo">
        <img src="assets/pooja-manawat.jpg" alt="CA. Pooja Manavat, Senior Chartered Accountant at BluePeak Verity" width="560" height="700" loading="lazy" decoding="async">
      </div>
      <div class="leader-copy">
        <p class="eyebrow">Senior Chartered Accountant</p>
        <h2>CA. Pooja Manavat</h2>
        <p><strong>Chartered Accountant, India · Qualified 2017 · ICAI Membership 434849</strong></p>
        <p>Senior delivery experience across accounting, taxation, audit-related assignments, financial reporting and finance.</p>
        <div class="leader-expertise"><span>Accounting</span><span>Taxation</span><span>Audit Support</span><span>Finance</span></div>
      </div>`;

    layout.className = 'container sg-leadership-grid';
    layout.replaceChildren(founderCard, poojaCard);
    return true;
  };

  const normalizeProfessionalNames = () => {
    if (document.body) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (!node.nodeValue) continue;
        if (node.nodeValue.includes('CA Siddharth Bhatia')) {
          node.nodeValue = node.nodeValue.replaceAll('CA Siddharth Bhatia', 'CA. Siddharth Bhatia');
        }
        if (node.nodeValue.includes('Pooja Manawat')) {
          node.nodeValue = node.nodeValue.replaceAll('Pooja Manawat', 'Pooja Manavat');
        }
      }
    }

    document.querySelectorAll('[alt],[aria-label],[title]').forEach(element => {
      ['alt', 'aria-label', 'title'].forEach(attribute => {
        const value = element.getAttribute(attribute);
        if (!value) return;
        let corrected = value.replaceAll('CA Siddharth Bhatia', 'CA. Siddharth Bhatia').replaceAll('Pooja Manawat', 'Pooja Manavat');
        if (corrected !== value) element.setAttribute(attribute, corrected);
      });
    });

    document.querySelectorAll('meta[content]').forEach(meta => {
      const value = meta.getAttribute('content');
      if (!value) return;
      const corrected = value.replaceAll('CA Siddharth Bhatia', 'CA. Siddharth Bhatia').replaceAll('Pooja Manawat', 'Pooja Manavat');
      if (corrected !== value) meta.setAttribute('content', corrected);
    });
  };

  const updateAboutMetadata = () => {
    if (!/about\.html$/i.test(location.pathname)) return;
    const description = q('meta[name="description"]');
    if (description) description.content = 'Meet CA. Siddharth Bhatia and CA. Pooja Manavat and learn how BluePeak Verity delivers Chartered Accountant-led accounting support for US, UK and Singapore firms from India.';
  };

  const run = () => {
    const sections = [...document.querySelectorAll('.founder-section')];
    sections.forEach(section => {
      if (section.dataset.bpLeadershipUpgraded === 'true') return;
      const upgraded = upgradeStandardLeadership(section) || upgradeSingaporeLeadership(section);
      if (upgraded) section.dataset.bpLeadershipUpgraded = 'true';
    });
    updateAboutMetadata();
    normalizeProfessionalNames();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
