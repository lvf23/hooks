const { addMod, runMods } = require("../mods");

describe("Mods", () => {
  test("Sync", async () => {
    const modName = "fizz_sync";

    const m1 = {
      handler(value) {
        return value + 42;
      },
      weight: 67,
    };

    const m2 = {
      handler(value) {
        return value * 2;
      },
      weight: 12,
    };

    addMod(modName, m1.handler, m1.weight);
    addMod(modName, m2.handler, m2.weight);

    const finalValue = await runMods(modName, 1);

    expect(finalValue).toBe(44);
  });

  test("Async", async () => {
    const modName = "fizz_async";

    const args = [1, 3];

    const resolveValueAsync = (duration, value) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(value);
        }, duration);
      });
    };

    const m3 = {
      async handler(value, arg1, arg2) {
        const duration = 1 + Math.round(Math.random() * 1);

        expect(arg2 - arg1).toBe(2);

        return await resolveValueAsync(duration, value + 1);
      },
      weight: 17,
    };

    const m4 = {
      async handler(value, arg1, arg2) {
        const duration = 2 + Math.round(Math.random() * 7);

        expect(arg1 + arg2).toBe(4);

        return await resolveValueAsync(duration, value * 5);
      },
      weight: 5,
    };

    addMod(modName, m3.handler, m3.weight);
    addMod(modName, m4.handler, m4.weight);

    const finalValue = await runMods(modName, 2, ...args);

    expect(finalValue).toBe(11);
  });
});
