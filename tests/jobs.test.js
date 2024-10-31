const { addJob, runJobs } = require("../jobs");

describe("Jobs", () => {
  test("Sync", async () => {
    let x = 50;

    const jobName = "bar_sync";
    const args = [5, 6, 11];

    const h1 = {
      handler() {
        x += 3;
      },
      weight: 121,
    };

    const h2 = {
      handler(arg1, arg2, arg3) {
        expect(arg1).toBe(args[0]);
        expect(arg2).toBe(args[1]);
        expect(arg3).toBe(args[2]);

        x /= 2;
      },
      weight: 89,
    };

    addJob(jobName, h1.handler, h1.weight);
    addJob(jobName, h2.handler, h2.weight);

    await runJobs(jobName, ...args);

    expect(x).toBe(28);
  });

  test("Async", async () => {
    let y = 4;

    const jobName = "bar_async";

    const doTaskAsync = (duration, callback) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          callback();
          resolve();
        }, duration);
      });
    };

    const h3 = {
      async handler() {
        const duration = 2 + Math.round(Math.random() * 10);
        await doTaskAsync(duration, () => {
          y *= 2;
        });
      },
      weight: 10,
    };

    const h4 = {
      async handler() {
        const duration = 1 + Math.round(Math.random() * 4);

        await doTaskAsync(duration, () => {
          y -= 7;
        });
      },
      weight: 23,
    };

    addJob(jobName, h3.handler, h3.weight);
    addJob(jobName, h4.handler, h4.weight);

    await runJobs(jobName);

    expect(y).toBe(1);
  });
});
