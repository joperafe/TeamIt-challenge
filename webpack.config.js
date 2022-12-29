const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // other configuration options here...
  plugins: [new BundleAnalyzerPlugin()],
};
