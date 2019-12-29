module.exports = {
  modules: true,
  plugins: {
    'postcss-nested': true,
    'postcss-modules': {
      generateScopedName: '[local]-[sha1:hash:base64:5]',
    },
  },
};
