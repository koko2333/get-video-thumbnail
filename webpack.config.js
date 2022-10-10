const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    library: {
      type: "commonjs-static",
    },
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/types.ts"),
          to: path.resolve(__dirname, "./dist/index.d.ts"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            // pure_funcs: ["console.log"],
          },
        },
      }),
    ],
  },
};
