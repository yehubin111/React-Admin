const { adjustStyleLoaders, override, overrideDevServer } = require('customize-cra');
const { name } = require('./package');

const addCustomize = () => config => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;

    return config;
}

const devServerConfig = () => (config, e, s) => {
    return {
        ...config,
        port: 6008,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/api': {
                target: 'http://39.103.146.61', //配置你要请求的服务器地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}

// 添加公共scss
function addSassResourcesLoader() {
    return adjustStyleLoaders(rule => {
        if (rule.test.toString().includes('scss')) {
            rule.use.push({
                loader: require.resolve('sass-resources-loader'),
                options: {
                    resources: './src/assets/css/theme.scss'
                }
            });
        }
    })
}

module.exports = {
    webpack: override(
        addSassResourcesLoader(),
        addCustomize()
    ),
    devServer: overrideDevServer(
        devServerConfig()
    )
}