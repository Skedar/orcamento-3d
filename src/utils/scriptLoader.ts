declare global {
  interface Window {
    jQuery: typeof jQuery;
    $: typeof jQuery;
    retinajs: any;
  }
}

export const initializePlugins = () => {
  if (window.jQuery) {
    const $ = window.jQuery;
    
    // Inicializa o RetinaJS
    if (window.retinajs) {
      window.retinajs();
    }
    
    // Inicializa o FakeLoader
    const $preloader = $('.preloader');
    if ($preloader.length) {
      ($preloader as any).fakeLoader({
        timeToHide: 1200,
        bgColor: '#1da1f2',
        spinner: 'spinner2'
      });
    }

    // Inicializa outros plugins
    $('[data-trigger="sticky"]').sticky({
      zIndex: 999
    } as any);

    // Inicializa imagens retina
    $('img[data-rjs]').each(function() {
      const $img = $(this);
      const ratio = $img.data('rjs') || 2;
      if (window.retinajs) {
        window.retinajs($img[0], ratio);
      }
    });
  }
};

export const loadScripts = () => {
  return new Promise((resolve) => {
    // Aguarda um pouco mais para garantir que todos os scripts foram carregados
    setTimeout(() => {
      initializePlugins();
      resolve(true);
    }, 500); // Aumentado para 500ms
  });
}; 