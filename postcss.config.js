module.exports = {
  modules: true,
  plugins: {
    'postcss-modules': {
      generateScopedName: '[local]-[sha1:hash:base64:5]',
    },
  },
};
