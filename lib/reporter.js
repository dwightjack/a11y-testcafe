const { red, green, reset } = require('chalk');

const createReport = (violations) => {
  if (violations.length !== 0) {
    const report = violations.reduce((acc, { nodes, help }, i) => {
      acc += red(`${i + 1}) ${help}\n`);

      acc += reset(
        nodes.reduce((e, { target }) => {
          const targetNodes = target.map((t) => `"${t}"`).join(', ');
          e += `\t${targetNodes}\n`;
          return e;
        }, ''),
      );

      return acc;
    }, red(`${violations.length} violations found:\n`));

    return reset(report);
  }
  return green('0 violations found');
};

module.exports = createReport;
