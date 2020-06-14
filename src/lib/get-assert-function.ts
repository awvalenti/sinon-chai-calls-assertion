import { checkCallCount } from './check-call-count';
import { checkCallErrors } from './check-call-errors';
import { info, ids } from './colors';

export function getAssertFunction(
  _chai: Chai.ChaiStatic,
  utils: Chai.ChaiUtils,
  compareFunc: (actual: unknown, expected: unknown) => string,
) {
  return function fn(this: Chai.AssertionStatic, ...expectedCalls: object[][]) {
    const actualCalls: sinon.SinonStub = utils.flag(this, 'object');
    let errors = checkCallCount(actualCalls, expectedCalls);

    errors += checkCallErrors(actualCalls, expectedCalls, compareFunc);

    if (errors) {
      _chai.assert.fail(info(`On ${ids(actualCalls.name)}${errors}`));
    }
  };
}
