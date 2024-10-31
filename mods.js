const { useHooks } = require("./hooks");
const { addHook, getHooks } = useHooks();

const addMod = (name, handler, weight) => {
  addHook(name, handler, weight);
};

const runMods = async (name, value, ...args) => {
  const hooks = getHooks(name);

  let lastValue = value;

  for (const hook of hooks) {
    lastValue = await hook.handler(lastValue, ...args);
  }

  return lastValue;
};

module.exports = {
  addMod,
  runMods,
};
