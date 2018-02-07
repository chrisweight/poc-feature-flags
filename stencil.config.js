exports.config = {
  bundles: [
    { components: ['poc-app'] },
    { components: ['page-landing', 'page-other'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
