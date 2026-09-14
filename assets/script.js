(() => {
  'use strict';

  if (!document.querySelector('link[data-bp-team-upgrade]')) {
    const teamStyle = document.createElement('link');
    teamStyle.rel = 'stylesheet';
    teamStyle.href = 'assets/team-upgrade.css?v=20260910-r2';
    teamStyle.dataset.bpTeamUpgrade = 'true';
    document.head.appendChild(teamStyle);
  }

  const loadElitePolish = () => {
    if (document.querySelector('script[data-bp-elite-polish]')) return;
    const eliteScript = document.createElement('script');
    eliteScript.src = 'assets/elite-polish-v2.js?v=20260914-r1';
    eliteScript.async = false;
    eliteScript.dataset.bpElitePolish = 'true';
    document.head.appendChild(eliteScript);
  };

  const loadBenchmarkPolish = () => {
    if (document.querySelector('script[data-bp-benchmark-polish]')) {
      loadElitePolish();
      return;
    }
    const benchmarkScript = document.createElement('script');
    benchmarkScript.src = 'assets/benchmark-polish.js?v=20260914-r1';
    benchmarkScript.async = false;
    benchmarkScript.dataset.bpBenchmarkPolish = 'true';
    benchmarkScript.addEventListener('load', loadElitePolish, { once: true });
    benchmarkScript.addEventListener('error', loadElitePolish, { once: true });
    document.head.appendChild(benchmarkScript);
  };

  const loadClientExperience = () => {
    if (document.querySelector('script[data-bp-client-experience]')) {
      loadBenchmarkPolish();
      return;
    }
    const clientScript = document.createElement('script');
    clientScript.src = 'assets/client-experience-upgrade.js?v=20260914-r1';
    clientScript.async = false;
    clientScript.dataset.bpClientExperience = 'true';
    clientScript.addEventListener('load', loadBenchmarkPolish, { once: true });
    clientScript.addEventListener('error', loadBenchmarkPolish, { once: true });
    document.head.appendChild(clientScript);
  };

  const loadTeamUpgrade = () => {
    if (!document.querySelector('script[data-bp-team-upgrade]')) {
      const teamScript = document.createElement('script');
      teamScript.src = 'assets/team-upgrade.js?v=20260912-ceo-r1';
      teamScript.async = false;
      teamScript.dataset.bpTeamUpgrade = 'true';
      teamScript.addEventListener('load', loadClientExperience, { once: true });
      teamScript.addEventListener('error', loadClientExperience, { once: true });
      document.head.appendChild(teamScript);
      return;
    }
    loadClientExperience();
  };

  const coreScript = document.createElement('script');
  coreScript.src = 'assets/script-core.js?v=20260910-team-r1';
  coreScript.async = false;
  coreScript.dataset.bpCore = 'true';
  coreScript.addEventListener('load', loadTeamUpgrade, { once: true });
  coreScript.addEventListener('error', loadTeamUpgrade, { once: true });
  document.head.appendChild(coreScript);
})();
