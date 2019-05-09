module.exports = {
  presets:
    [
      '@babel/preset-react',
      [
        '@babel/env',
        {
          targets: {
            android: '4.2',
            chrome: '29',
            edge: '14',
            firefox: '48',
            ie: '10',
            ios: '7',
            safari: '9.1'
          },
          useBuiltIns: 'usage',
          debug: false,
          corejs: 3
        }
      ]
    ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ]
};
