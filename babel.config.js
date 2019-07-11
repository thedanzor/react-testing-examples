module.exports = function (api) {
  const presets = ['@babel/preset-react', '@babel/preset-env']
  const plugins = ['@babel/plugin-transform-modules-commonjs', '@babel/plugin-syntax-dynamic-import', ['@babel/plugin-proposal-class-properties', { 'loose': true }], ['@babel/plugin-transform-runtime', { 'regenerator': true }]]

  api.cache(true)

  return {
    presets,
    plugins
  }
}
