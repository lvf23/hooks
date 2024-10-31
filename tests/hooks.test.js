const { useHooks } = require("../hooks");
const { addHook, getHooks } = useHooks();

test("Hooks", () => {
  const hookName = "foo";

  const h1 = {
    handler() {
      return Math.round(Math.random() * 23 + 1);
    },
    weight: 123,
  };

  const h2 = {
    handler() {
      return 42;
    },
    weight: 101,
  };

  addHook(hookName, h1.handler, h1.weight);
  addHook(hookName, h2.handler, h2.weight);

  const [firstHook, secondHook] = getHooks(hookName);

  expect(firstHook.handler).toBe(h2.handler);
  expect(firstHook.weight).toBe(h2.weight);

  expect(secondHook.handler).toBe(h1.handler);
  expect(secondHook.weight).toBe(h1.weight);
});
