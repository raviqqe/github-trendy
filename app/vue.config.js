const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const nodeExternals = require("webpack-node-externals");

const {
  background_color,
  short_name,
  theme_color
} = require("./public/manifest.json");

const ssr = !!process.env.ssr;

module.exports = {
  configureWebpack: ssr
    ? {
        devtool: "source-map",
        entry: "./src/entry-server.ts",
        target: "node",
        plugins: [new VueSSRServerPlugin()],
        externals: nodeExternals({
          whitelist: /\.css$/
        }),
        optimization: {
          splitChunks: false
        },
        output: {
          libraryTarget: "commonjs2"
        }
      }
    : {
        entry: "./src/entry-client.ts",
        plugins: [new VueSSRClientPlugin()]
      },
  outputDir: "dist/" + (ssr ? "server" : "client"),
  pwa: {
    themeColor: theme_color,
    name: short_name,
    msTileColor: background_color
  }
};
