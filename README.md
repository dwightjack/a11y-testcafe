# a11y-testcafe

> run aXe tests with TestCafe

Adapted from [axe-testcafe](https://www.npmjs.com/package/axe-testcafe)

## Installation

a11y-testcafe requires testcafe@^0.21.0 as peer dependency

Right now the module is a WIP and it's not yet published on npm.

To install it run:

```
npm install testcafe@^0.21.0 dwightjack/a11y-testcafe --save-dev
```

## Usage

```js
import { axeCheck, createReport } from 'a11y-testcafe';

fixture('TestCafe tests with Axe').page('http://mydomain/');

test('Automated accessibility testing', async (t) => {
  const { error, violations } = await axeCheck(t, {
    /* axe-core options */
  });

  await t.expect(violations.length === 0).ok(createReport(violations));
});
```

`axeCheck` accepts the following three arguments:

- `t`: testcafe [test controller](https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html#test-controller)
- `options`: axe.run [`options` parameter](https://www.deque.com/axe/documentation/#options-parameter)
- `context`: axe.run [`context` parameter](https://www.deque.com/axe/documentation/#context-parameter)
