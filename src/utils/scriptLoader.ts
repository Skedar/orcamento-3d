export const loadScripts = () => {
  const scripts = [
    '/js/jquery.min.js',
    '/js/jquery-ui.min.js',
    '/js/bootstrap.min.js',
    '/js/main.js'
  ];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  });
}; 