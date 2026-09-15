(() => {
  'use strict';

  const icons = {
    ledger: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect class="bpv-fill-a" x="7" y="5" width="26" height="30" rx="6"/><rect class="bpv-fill-b" x="10" y="9" width="20" height="22" rx="3"/><path class="bpv-line" d="M14 14h12M14 19h12M14 24h7"/><circle class="bpv-dot" cx="26" cy="25" r="3"/></svg>`,
    reconcile: `<svg viewBox="0 0 40 40" aria-hidden="true"><circle class="bpv-fill-a" cx="14" cy="20" r="8"/><circle class="bpv-fill-b" cx="26" cy="20" r="8"/><path class="bpv-line" d="M8 12c5-5 13-6 19-2l3 2M32 28c-5 5-13 6-19 2l-3-2"/><path class="bpv-line" d="M27 8l3 4-5 1M13 32l-3-4 5-1"/></svg>`,
    calendar: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect class="bpv-fill-a" x="6" y="8" width="28" height="26" rx="6"/><rect class="bpv-fill-b" x="9" y="14" width="22" height="17" rx="3"/><path class="bpv-line" d="M13 5v7M27 5v7M10 17h20"/><path class="bpv-line" d="M15 24l4 4 7-9"/></svg>`,
    arap: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect class="bpv-fill-a" x="6" y="10" width="28" height="20" rx="5"/><rect class="bpv-fill-b" x="10" y="14" width="9" height="12" rx="2"/><path class="bpv-line" d="M22 16h8M22 21h8M22 26h5"/><path class="bpv-line" d="M12 20h5M14.5 17.5v5"/></svg>`,
    cleanup: `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bpv-fill-a" d="M10 24l12-12 8 8-12 12H10z"/><path class="bpv-fill-b" d="M23 11l4-4 7 7-4 4z"/><path class="bpv-line" d="M8 9h8M12 5v8M27 30h7M30.5 26.5v7"/></svg>`,
    tax: `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bpv-fill-a" d="M9 5h16l6 6v24H9z"/><path class="bpv-fill-b" d="M25 5v8h6"/><path class="bpv-line" d="M14 17h12M14 22h12M14 27h8"/><circle class="bpv-dot" cx="27" cy="28" r="3"/></svg>`,
    workpapers: `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bpv-fill-a" d="M5 11h13l3 4h14v18H5z"/><path class="bpv-fill-b" d="M9 16h22v13H9z"/><path class="bpv-line" d="M13 20h14M13 24h10"/><path class="bpv-line" d="M26 27l3 3 5-6"/></svg>`,
    query: `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bpv-fill-a" d="M6 7h28v21H18l-8 7v-7H6z"/><path class="bpv-fill-b" d="M10 11h20v13H10z"/><path class="bpv-line" d="M14 16h12M14 20h8"/><circle class="bpv-dot" cx="27" cy="20" r="2.5"/></svg>`,
    bank: `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bpv-fill-a" d="M5 14L20 5l15 9z"/><path class="bpv-fill-b" d="M8 16h24v14H8z"/><path class="bpv-line" d="M12 17v12M18 17v12M24 17v12M30 17v12M6 33h28"/><path class="bpv-line" d="M27 8l4 2"/></svg>`,
    creditcard: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect class="bpv-fill-a" x="5" y="9" width="30" height="22" rx="6"/><rect class="bpv-fill-b" x="8" y="15" width="24" height="5" rx="2"/><path class="bpv-line" d="M10 25h8M23 25h7"/><circle class="bpv-dot" cx="29" cy="12" r="2.5"/></svg>`,
    ageing: `<svg viewBox="0 0 40 40" aria-hidden="true"><circle class="bpv-fill-a" cx="20" cy="20" r="14"/><circle class="bpv-fill-b" cx="20" cy="20" r="9"/><path class="bpv-line" d="M20 13v8l5 3"/><path class="bpv-line" d="M8 8l4 1M32 8l-4 1"/></svg>`,
    balance: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect class="bpv-fill-a" x="6" y="6" width="28" height="28" rx="6"/><rect class="bpv-fill-b" x="10" y="10" width="20" height="20" rx="3"/><path class="bpv-line" d="M14 15h12M14 20h5M22 20h4M14 25h12"/></svg>`,
    asset: `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bpv-fill-a" d="M7 11h26v22H7z"/><path class="bpv-fill-b" d="M11 7h18v8H11z"/><path class="bpv-line" d="M12 20h6M22 20h6M12 25h6M22 25h6"/><path class="bpv-line" d="M20 15v18"/></svg>`,
    tracker: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect class="bpv-fill-a" x="6" y="7" width="28" height="26" rx="6"/><path class="bpv-line" d="M12 14h16M12 20h16M12 26h10"/><circle class="bpv-dot" cx="28" cy="26" r="3"/><path class="bpv-line" d="M27 26l1 1 2-3"/></svg>`,
    evidence: `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bpv-fill-a" d="M8 5h17l7 7v23H8z"/><path class="bpv-fill-b" d="M12 11h12v18H12z"/><path class="bpv-line" d="M25 5v8h7M15 16h6M15 21h10M15 26h8"/></svg>`,
    review: `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bpv-fill-a" d="M6 8h28v21H19l-8 6v-6H6z"/><path class="bpv-fill-b" d="M11 13h18v11H11z"/><path class="bpv-line" d="M14 18h8M14 22h5"/><path class="bpv-line" d="M25 17l2 2 4-5"/></svg>`,
    status: `<svg viewBox="0 0 40 40" aria-hidden="true"><circle class="bpv-fill-a" cx="20" cy="20" r="15"/><circle class="bpv-fill-b" cx="20" cy="20" r="10"/><path class="bpv-line" d="M14 20l4 4 8-10"/></svg>`
  };

  const makeIcon = (key) => {
    const el = document.createElement('span');
    el.className = 'bpv-card-visual';
    el.innerHTML = icons[key] || icons.ledger;
    el.setAttribute('aria-hidden', 'true');
    return el;
  };

  const decorateCard = (card, index, iconKey) => {
    if (!card) return;
    card.classList.add('bpv-color-card', `bpv-accent-${(index % 8) + 1}`);
    card.querySelectorAll('.bp3-service-icon, .bpv-card-visual, .bpv-tool-row, .bpv-brand-chip').forEach(node => node.remove());
    card.appendChild(makeIcon(iconKey));
  };

  const serviceIcons = ['ledger','reconcile','calendar','arap','cleanup','tax','workpapers','query'];
  const deliverableIcons = ['ledger','bank','creditcard','ageing','ageing','balance','asset','tax','tracker','evidence','review','status'];

  const apply = () => {
    document.querySelectorAll('.bpv-tool-row, .bpv-capacity-brands').forEach(node => node.remove());

    [...document.querySelectorAll('.delivery-grid > article')].forEach((card, i) => {
      decorateCard(card, i, serviceIcons[i] || 'ledger');
    });

    [...document.querySelectorAll('.deliverables-grid > article')].forEach((card, i) => {
      decorateCard(card, i, deliverableIcons[i] || 'ledger');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
  requestAnimationFrame(apply);
  window.setTimeout(apply, 180);
  window.setTimeout(apply, 700);
})();
