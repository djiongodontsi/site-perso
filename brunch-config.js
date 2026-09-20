module.exports = {
  paths: {
    watched: ['.'],
    public: 'public'
  },
  conventions: {
    assets: /^(index\.html|assets\/|projects\/)/,
    ignored: /^(node_modules\/|public\/|\.git\/|\.netlify\/)/
  },
  files: {
    javascripts: {
      joinTo: 'js/script.js'
    },
    stylesheets: {
      joinTo: 'css/style.css'
    }
  }
};
