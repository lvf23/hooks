const { useHooks } = require("./hooks");
const { addHook, getHooks } = useHooks();

const addJob = (name, handler, weight) => {
  addHook(name, handler, weight);
};

const runJobs = (name, ...args) => {
  const hooks = getHooks(name);

  for (const hook of hooks) {
    hook.handler(...args);
  }
};

const runJobsAsync = async (name, ...args) => {
  const hooks = getHooks(name);

  for (const hook of hooks) {
    await hook.handler(...args);
  }
};

module.exports = {
  addJob,
  runJobs,
  runJobsAsync,
};
