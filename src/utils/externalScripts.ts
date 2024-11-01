export const loadExternalScripts = () => {
  const scripts = [
    '/js/jquery.min.js',
    '/js/bootstrap.min.js',
    '/js/jquery.sticky.min.js',
    // ... outros scripts necessários
  ];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  });
}; 