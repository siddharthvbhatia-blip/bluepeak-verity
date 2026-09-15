(() => {
  'use strict';

  const QUICKBOOKS_LOGO = 'assets/quickbooks-logo-attached.png';
  const XERO_LOGO = 'assets/xero-wordmark-blue.svg';

  const icons = {
    ledger: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    reconcile: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h12M13 4l3 3-3 3M20 17H8M11 14l-3 3 3 3"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 9h16M8 13h3M13 13h3M8 16h3"/></svg>',
    card: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h4"/></svg>',
    cleanup: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10M9 7V5h6v2M8 10v7M12 10v7M16 10v7M7 7l1 12h8l1-12"/></svg>',
    document: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6"/></svg>',
    folder: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h7l2 2h9v11H3zM7 12h10M7 15h7"/></svg>',
    query: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4zM8 9h8M8 12h5"/></svg>',
    ageing: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>',
    assets: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h3M13 12h3M8 16h8"/></svg>',
    evidence: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h10l4 4v12H5zM15 4v4h4M8 12h8M8 16h5"/><path d="M8 8h3"/></svg>',
    status: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M8 12l3 3 5-6"/></svg>'
  };

  const makeIcon = (key) => {
    const el = document.createElement('span');
    el.className = 'bpv-card-visual';
    el.innerHTML = icons[key] || icons.document;
    el.setAttribute('aria-hidden', 'true');
    return el;
  };

  const makeToolChip = (tool) => {
    const chip = document.createElement('span');
    chip.className = `bpv-brand-chip ${tool}`;
    chip.setAttribute('aria-hidden', 'true');

    if (tool === 'qbo' || tool === 'xero') {
      const img = document.createElement('img');
      img.src = tool === 'qbo' ? QUICKBOOKS_LOGO : XERO_LOGO;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      chip.appendChild(img);
      return chip;
    }

    if (tool === 'excel') {
      chip.innerHTML = '<span class="bpv-mini-mark">X</span><span>Excel</span>';
      return chip;
    }

    if (tool === 'powerbi') {
      chip.innerHTML = '<span class="bpv-mini-mark"><i></i><i></i><i></i><i></i></span><span>Power BI</span>';
      return chip;
    }

    return chip;
  };

  const addTools = (card, tools) => {
    if (!tools?.length || card.querySelector('.bpv-tool-row')) return;
    const row = document.createElement('div');
    row.className = 'bpv-tool-row';
    tools.forEach(tool => row.appendChild(makeToolChip(tool)));
    card.appendChild(row);
  };

  const decorateCard = (card, index, config) => {
    if (!card) return;
    card.classList.add('bpv-color-card', `bpv-accent-${(index % 8) + 1}`);

    card.querySelectorAll('.bp3-service-icon').forEach(old => old.remove());
    if (!card.querySelector('.bpv-card-visual')) card.appendChild(makeIcon(config.icon));
    addTools(card, config.tools);
  };

  const deliveryConfig = [
    { icon: 'ledger', tools: ['qbo','xero'] },
    { icon: 'reconcile', tools: ['qbo','xero','excel'] },
    { icon: 'calendar', tools: ['qbo','xero','excel'] },
    { icon: 'card', tools: ['qbo','xero','excel'] },
    { icon: 'cleanup', tools: ['qbo','xero','excel'] },
    { icon: 'document', tools: ['excel'] },
    { icon: 'folder', tools: ['excel','powerbi'] },
    { icon: 'query', tools: ['excel'] }
  ];

  const deliverableConfig = [
    { icon: 'ledger', tools: ['qbo','xero'] },
    { icon: 'reconcile', tools: ['qbo','xero','excel'] },
    { icon: 'card', tools: ['qbo','xero','excel'] },
    { icon: 'ageing', tools: ['excel'] },
    { icon: 'ageing', tools: ['excel'] },
    { icon: 'assets', tools: ['excel'] },
    { icon: 'assets', tools: ['excel'] },
    { icon: 'document', tools: ['excel'] },
    { icon: 'query', tools: ['excel'] },
    { icon: 'evidence', tools: ['excel'] },
    { icon: 'query', tools: ['excel'] },
    { icon: 'status', tools: ['qbo','xero','excel','powerbi'] }
  ];

  const apply = () => {
    [...document.querySelectorAll('.delivery-grid > article')].forEach((card, i) => {
      decorateCard(card, i, deliveryConfig[i] || { icon: 'document', tools: ['excel'] });
    });

    [...document.querySelectorAll('.deliverables-grid > article')].forEach((card, i) => {
      decorateCard(card, i, deliverableConfig[i] || { icon: 'document', tools: ['excel'] });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
  requestAnimationFrame(apply);
  window.setTimeout(apply, 160);
  window.setTimeout(apply, 650);
})();
