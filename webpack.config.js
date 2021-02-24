// 
const path =  require('path');

// 构建自动生成html文件，自动引用相关js资源文件

const HTMLWebpackPlugin = require('html-webpack-plugin');


// 清除历史构建产生的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// webpack 配置信息
module.exports = {
    mode: 'production',
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // 兼容ie 告诉webpack 不使用箭头函数
        environment: {
            arrowFunction: false
        }
    },
    //  制定webpack打包时候使用的模块
    module: {
        rules: [
            {
                // test 制定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        loader: 'babel-loader',
                        options: {
                            // 设置预定义的环境
                            presets:[
                                [
                                    '@babel/preset-env',
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome":"58",
                                            "ie":  "11"
                                        },
                                        // 制定corejs的版本
                                        "corejs":"3",
                                        // 使用core.js的方式 usage表示按需加载
                                        "useBuiltIns": "usage"
                                
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/
            
            },
            {
                test: /\.less$/,
                use:[ // loader 加载顺序是从下往上加载
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: '这是一个自定义的html的title'
            template: './src/index.html'
        }),
    ],
    // 设置那些模块可以引用
    resolve: {
        extensions:[
            '.ts', '.js'
        ]
    }

}