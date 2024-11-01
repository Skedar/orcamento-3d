export const initializePlugins = () => {
  if (window.jQuery) {
    // Inicializa o FakeLoader
    const $preloader = jQuery('.preloader');
    if ($preloader.length) {
      $preloader.fakeLoader({
        timeToHide: 1200,
        bgColor: '#1da1f2',
        spinner: 'spinner2'
      });
    }

    // Inicializa outros plugins conforme necessário
    jQuery('[data-trigger="sticky"]').sticky({
      zIndex: 999
    });

    // ... outras inicializações de plugins
  }
};

export const loadScripts = () => {
  return new Promise((resolve) => {
    // Como os scripts já estão no HTML, apenas inicializamos os plugins
    setTimeout(() => {
      initializePlugins();
      resolve(true);
    }, 100);
  });
}; 