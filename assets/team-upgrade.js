(() => {
  'use strict';

  const q = (selector, context = document) => context.querySelector(selector);

  const createPoojaCard = () => {
    const article = document.createElement('article');
    article.className = 'leader-card leader-card-senior';
    article.innerHTML = `
      <div class="leader-media">
        <div class="professional-photo">
          <img src="assets/pooja-manawat.jpg" alt="CA Pooja Manawat, Senior Chartered Accountant at BluePeak Verity" width="560" height="700" loading="lazy" decoding="async">
        </div>
        <span class="leader-role-badge">Senior Chartered Accountant</span>
      </div>
      <div class="leader-copy">
        <p class="eyebrow">Senior Chartered Accountant</p>
        <h2>CA. Pooja Manawat</h2>
        <p class="leader-meta"><strong>Chartered Accountant, India · Qualified 2017</strong></p>
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

  const upgradeStandardLeadership = section => {
    const layout = q('.founder-layout', section);
    if (!layout) return false;

    const founderPhoto = q('.founder-photo-shell', layout);
    const founderCopy = q('.founder-copy', layout);
    if (!founderPhoto || !founderCopy) return false;

    section.classList.add('leadership-section');
    addSectionIntro(section, layout);

    q('.eyebrow', founderCopy)?.replaceChildren(document.createTextNode('Founder | Chartered Accountant'));

    const founderCard = document.createElement('article');
    founderCard.className = 'leader-card leader-card-founder';
    const founderMedia = document.createElement('div');
    founderMedia.className = 'leader-media';
    founderMedia.appendChild(founderPhoto);
    founderMedia.insertAdjacentHTML('beforeend', '<span class="leader-role-badge">Founder</span>');
    founderCard.append(founderMedia, founderCopy);

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

    const founderCard = document.createElement('article');
    founderCard.className = 'sg-leader-card';
    const founderMedia = document.createElement('div');
    founderMedia.className = 'sg-leader-photo';
    founderMedia.appendChild(founderPhoto);
    founderCard.append(founderMedia, founderCopy);
    q('.eyebrow', founderCopy)?.replaceChildren(document.createTextNode('Founder | Chartered Accountant'));

    const poojaCard = document.createElement('article');
    poojaCard.className = 'sg-leader-card';
    poojaCard.innerHTML = `
      <div class="sg-leader-photo professional-photo">
        <img src="assets/pooja-manawat.jpg" alt="CA Pooja Manawat, Senior Chartered Accountant at BluePeak Verity" width="560" height="700" loading="lazy" decoding="async">
      </div>
      <div>
        <p class="eyebrow">Senior Chartered Accountant</p>
        <h2>CA. Pooja Manawat</h2>
        <p><strong>Chartered Accountant, India · Qualified 2017</strong></p>
        <p>Senior delivery experience across accounting, taxation, audit-related assignments, financial reporting and finance.</p>
        <div class="leader-expertise"><span>Accounting</span><span>Taxation</span><span>Audit Support</span><span>Finance</span></div>
      </div>`;

    layout.className = 'container sg-leadership-grid';
    layout.replaceChildren(founderCard, poojaCard);
    return true;
  };

  const updateAboutMetadata = () => {
    if (!/about\.html$/i.test(location.pathname)) return;
    const description = q('meta[name="description"]');
    if (description) description.content = 'Meet CA Siddharth Bhatia and CA Pooja Manawat and learn how BluePeak Verity delivers Chartered Accountant-led accounting support for US, UK and Singapore firms from India.';
  };

  const run = () => {
    const sections = [...document.querySelectorAll('.founder-section')];
    sections.forEach(section => {
      if (section.dataset.bpLeadershipUpgraded === 'true') return;
      const upgraded = upgradeStandardLeadership(section) || upgradeSingaporeLeadership(section);
      if (upgraded) section.dataset.bpLeadershipUpgraded = 'true';
    });
    updateAboutMetadata();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
