const { override, fixBabelImports, addWebpackAlias, overrideDevServer } = require('customize-cra')
const path = require('path')

const addProxy = () => (configFunction) => {
  configFunction.proxy = {
    '/v1/api': {
      target: 'https://test.shipformula.com', // 接口的域名
      secure: true, // 如果是https接口，需要配置这个参数
      changeOrigin: true // 如果接口跨域，需要进行这个参数配置
    }
  }

  return configFunction
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    addWebpackAlias({
      // add your alias
      ['@']: path.resolve(__dirname, './src')
    })
  ),
  devServer: overrideDevServer(addProxy())
}
