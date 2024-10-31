const useHooks = () => {
  const hooks = {};

  let sorted = false;

  const addHook = (name, handler, weight = 0) => {
    if (!(name in hooks)) {
      hooks[name] = [];
    }

    hooks[name].push({ handler, weight });

    sorted = false;
  };

  const getHooks = (name) => {
    if (name in hooks) {
      sortHooks(name);
      return hooks[name];
    }

    return [];
  };

  const sortHooks = (name) => {
    if (name in hooks && hooks[name].length >= 2 && !sorted) {
      hooks[name].sort((hookA, hookB) => hookA.weight - hookB.weight);
      sorted = true;
    }
  };

  return {
    addHook,
    getHooks,
  };
};

module.exports = { useHooks };
