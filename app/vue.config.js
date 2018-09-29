const {
  background_color,
  short_name,
  theme_color
} = require("./public/manifest.json");

module.exports = {
  pwa: {
    iconPaths: {
      appleTouchIcon: "icon-152.png",
      favicon16: "icon-16.png",
      favicon32: "icon-32.png",
      msTileImage: "icon-144.png"
    },
    msTileColor: background_color,
    name: short_name,
    themeColor: theme_color
  }
};
