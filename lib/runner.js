const fs = require('fs');
const path = require('path');
const { ClientFunction } = require('testcafe');

var AXE_DIR_PATH = path.dirname(require.resolve('axe-core'));
const AXE_SCRIPT = fs.readFileSync(
  path.join(AXE_DIR_PATH, 'axe.min.js'),
  'utf8',
);

const hasAxe = ClientFunction(() => !!(window.axe && window.axe.run));

const injectAxe = ClientFunction(
  () => {
    eval(AXE_SCRIPT);
  },
  { dependencies: { AXE_SCRIPT } },
);

const runAxe = ClientFunction((context, options = {}) => {
  return new Promise((resolve) => {
    window.axe.run(context || document, options, (error, { violations }) => {
      resolve({ error, violations });
    });
  });
});

const axeCheck = async (t, options, context) => {
  const hasScript = await hasAxe.with({ boundTestRun: t })();
  if (!hasScript) {
    await injectAxe.with({ boundTestRun: t })();
  }

  try {
    return await runAxe.with({ boundTestRun: t })(context, options);
  } catch (e) {
    return { error: e };
  }
};

module.exports = axeCheck;
