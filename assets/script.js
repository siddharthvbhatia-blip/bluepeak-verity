(() => {
  'use strict';

  if (!document.querySelector('link[data-bp-team-upgrade]')) {
    const teamStyle = document.createElement('link');
    teamStyle.rel = 'stylesheet';
    teamStyle.href = 'assets/team-upgrade.css?v=20260910-r2';
    teamStyle.dataset.bpTeamUpgrade = 'true';
    document.head.appendChild(teamStyle);
  }

  if (!document.querySelector('link[data-bp-platform-branding]')) {
    const platformStyle = document.createElement('link');
    platformStyle.rel = 'stylesheet';
    platformStyle.href = 'assets/platform-branding.css?v=20260914-r3';
    platformStyle.dataset.bpPlatformBranding = 'true';
    document.head.appendChild(platformStyle);
  }

  if (!document.querySelector('link[data-bpv-colorful-cards]')) {
    const colorfulStyle = document.createElement('link');
    colorfulStyle.rel = 'stylesheet';
    colorfulStyle.href = 'assets/colorful-card-logos.css?v=20260915-r1';
    colorfulStyle.dataset.bpvColorfulCards = 'true';
    document.head.appendChild(colorfulStyle);
  }

  const loadColorfulCards = () => {
    if (document.querySelector('script[data-bpv-colorful-cards]')) return;
    const colorful = document.createElement('script');
    colorful.src = 'assets/colorful-card-logos.js?v=20260915-r1';
    colorful.async = false;
    colorful.dataset.bpvColorfulCards = 'true';
    document.head.appendChild(colorful);
  };

  const loadBrandCorrection = () => {
    if (document.querySelector('script[data-bpv-brand-correction]')) {
      loadColorfulCards();
      return;
    }
    const correction = document.createElement('script');
    correction.src = 'assets/brand-correction.js?v=20260915-r2';
    correction.async = false;
    correction.dataset.bpvBrandCorrection = 'true';
    correction.addEventListener('load', loadColorfulCards, { once: true });
    correction.addEventListener('error', loadColorfulCards, { once: true });
    document.head.appendChild(correction);
  };

  const loadPlatformBranding = () => {
    if (document.querySelector('script[data-bp-platform-branding]')) {
      loadBrandCorrection();
      return;
    }
    const platformScript = document.createElement('script');
    platformScript.src = 'assets/platform-branding.js?v=20260915-r4';
    platformScript.async = false;
    platformScript.dataset.bpPlatformBranding = 'true';
    platformScript.addEventListener('load', loadBrandCorrection, { once: true });
    platformScript.addEventListener('error', loadBrandCorrection, { once: true });
    document.head.appendChild(platformScript);
  };

  const loadEliteV3 = () => {
    if (document.querySelector('script[data-bp-elite-v3]')) {
      loadPlatformBranding();
      return;
    }
    const eliteV3 = document.createElement('script');
    eliteV3.src = 'assets/elite-polish-v3.js?v=20260914-r1';
    eliteV3.async = false;
    eliteV3.dataset.bpEliteV3 = 'true';
    eliteV3.addEventListener('load', loadPlatformBranding, { once: true });
    eliteV3.addEventListener('error', loadPlatformBranding, { once: true });
    document.head.appendChild(eliteV3);
  };

  const loadElitePolish = () => {
    if (document.querySelector('script[data-bp-elite-polish]')) {
      loadEliteV3();
      return;
    }
    const eliteScript = document.createElement('script');
    eliteScript.src = 'assets/elite-polish-v2.js?v=20260914-r1';
    eliteScript.async = false;
    eliteScript.dataset.bpElitePolish = 'true';
    eliteScript.addEventListener('load', loadEliteV3, { once: true });
    eliteScript.addEventListener('error', loadEliteV3, { once: true });
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
