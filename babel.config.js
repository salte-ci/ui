const presets = ['@babel/env', '@babel/preset-react'];
const plugins = [];
if (process.env.NODE_ENV === 'test') {
  plugins.push('transform-postcss');
}

module.exports = {
  presets,
  plugins,
};
