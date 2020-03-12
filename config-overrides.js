const { addBabelPlugins, override } = require('customize-cra')

module.exports = override(
  ...addBabelPlugins(
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
  )
);
/*

module.exports = function override(config) {
  // add your plugins or write your config here
  const myPlugins = ['transform-decorators-legacy']

  return addBabelPlugins(myPlugins, config)
}

*/