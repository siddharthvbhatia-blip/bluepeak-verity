(() => {
  'use strict';

  if (!document.querySelector('link[data-bp-team-upgrade]')) {
    const teamStyle = document.createElement('link');
    teamStyle.rel = 'stylesheet';
    teamStyle.href = 'assets/team-upgrade.css?v=20260910-r2';
    teamStyle.dataset.bpTeamUpgrade = 'true';
    document.head.appendChild(teamStyle);
  }

  const loadTeamUpgrade = () => {
    if (document.querySelector('script[data-bp-team-upgrade]')) return;
    const teamScript = document.createElement('script');
    teamScript.src = 'assets/team-upgrade.js?v=20260912-ceo-r1';
    teamScript.async = false;
    teamScript.dataset.bpTeamUpgrade = 'true';
    document.head.appendChild(teamScript);
  };

  const coreScript = document.createElement('script');
  coreScript.src = 'assets/script-core.js?v=20260910-team-r1';
  coreScript.async = false;
  coreScript.dataset.bpCore = 'true';
  coreScript.addEventListener('load', loadTeamUpgrade, { once: true });
  coreScript.addEventListener('error', loadTeamUpgrade, { once: true });
  document.head.appendChild(coreScript);
})();
