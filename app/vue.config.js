const {
  background_color,
  short_name,
  theme_color
} = require("./public/manifest.json");

module.exports = {
  pwa: {
    themeColor: theme_color,
    name: short_name,
    msTileColor: background_color
  }
};
