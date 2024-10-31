const { loadPlugins } = require("../plugins");
const { addJob, runJobs } = require("../jobs");
const { addMod, runMods } = require("../mods");

test("Plugins", async () => {
  let x = 0;

  const plugins = ["foo"];

  const jobName = "foo";
  const modName = "bar";

  const requiredPlugins = {
    foo() {
      addJob(jobName, () => {
        x = 1;
      });

      addMod(modName, (value) => {
        return 10 + value;
      });
    },
  };

  const requirePlugin = (name) => {
    return requiredPlugins[name]();
  };

  await loadPlugins(plugins, (pluginName) => {
    requirePlugin(pluginName);
  });

  expect(x).toBe(0);

  runJobs(jobName);

  expect(x).toBe(1);

  const y = await runMods(modName, 32);

  expect(y).toBe(42);
});
