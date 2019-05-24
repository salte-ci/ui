const json = require('rollup-plugin-json');
const glob = require('rollup-plugin-glob-import');
const svgo = require('rollup-plugin-svgo');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const copy = require('rollup-plugin-copy-assets-to');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');

const { browserslist } = require('./package.json');

module.exports = function({ minified, es6, tests, coverage, server }) {
  return {
    input: 'index.js',
    external: [],
    output: {
      dir: 'dist',
      format: es6 ? 'es' : 'system',
      sourcemap: tests ? 'inline' : true,
      exports: 'named'
    },

    plugins: [
      json(),
      glob(),
      svgo({
        raw: true
      }),

      babel({
        runtimeHelpers: true,

        presets: [
          ['@babel/preset-env', {
            targets: es6 ? {
              esmodules: true
            } : {
              browsers: browserslist
            }
          }]
        ],

        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-class-properties',
          ['@babel/plugin-proposal-decorators', {
            decoratorsBeforeExport: true
          }]
        ].concat(coverage ? [['istanbul', {
          include: [
            'src/**/*.ts'
          ]
        }]] : []),

        exclude: 'node_modules/!(chai-as-promised|chai|sinon|lit-element)/**',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs']
      }),

      resolve({
        mainFields: ['main', 'browser'],

        extensions: [ '.mjs', '.js', '.jsx', '.json']
      }),

      commonjs({
        namedExports: {
          '@salte-auth/salte-auth': ['SalteAuth', 'SalteAuthError', 'OAuth2Provider', 'OpenIDProvider', 'Handler', 'Utils', 'Generic'],
          '@salte-auth/redirect': ['Redirect'],
          '@salte-auth/auth0': ['Auth0'],
          '@salte-auth/bitbucket': ['Bitbucket'],
          '@salte-auth/github': ['GitHub'],
          '@salte-auth/gitlab': ['GitLab']
        }
      }),

      minified && terser({
        output: {
          comments: function (node, comment) {
            const { value, type } = comment;
            if (type == 'comment2') {
              // multiline comment
              return /@license/i.test(value);
            }
          }
        }
      }),

      copy({
        assets: [
          './index.html',
          'manifest.webmanifest'
        ],
        outputDir: 'dist'
      }),

      server && serve({
        contentBase: 'dist',
        historyApiFallback: '/index.html',
        port: 8081
      }),

      server && livereload('dist')
    ],

    watch: {
      include: '**',
      exclude: 'node_modules/**'
    },

    onwarn: function(warning) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
      }
    }
  }
}
