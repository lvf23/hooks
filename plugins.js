const loadPlugins = (plugins, loader) => {
  for (const plugin of plugins) {
    loader(plugin);
  }
};

const loadPluginsAsync = async (plugins, loader) => {
  for (const plugin of plugins) {
    await loader(plugin);
  }
};

module.exports = {
  loadPlugins,
  loadPluginsAsync,
};
