const loadPlugins = async (plugins, loader) => {
  for (const plugin of plugins) {
    await loader(plugin);
  }
};

module.exports = {
  loadPlugins,
};
