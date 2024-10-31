const { useHooks } = require("./hooks");
const { addHook, getHooks } = useHooks();

const addJob = (name, handler, weight) => {
  addHook(name, handler, weight);
};

const runJobs = async (name, ...args) => {
  const hooks = getHooks(name);

  for (const hook of hooks) {
    await hook.handler(...args);
  }
};

module.exports = {
  addJob,
  runJobs,
};
