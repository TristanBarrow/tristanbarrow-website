const path = require('path');

export default {
    entry: './src/frontend/index.tsx',
    output: {
        path: path.resolve(__dirname, 'served'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(txt|tmd)$/i,
                use: 'raw-loader',
            },
            {
                test: /\.(ico|png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
}