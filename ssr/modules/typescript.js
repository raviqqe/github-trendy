module.exports = function() {
  this.nuxt.options.extensions.push('ts');

  this.extendBuild(config => {
    config.module.rules.push({
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/]
      },
      exclude: [/dist/, /\.temp/],
      test: /((client|server)\.js)|(\.tsx?)$/
    });

    if (config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts');
    }
  });
};
