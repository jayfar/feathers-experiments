const assert = require('assert');
const app = require('../../src/app');

describe('\'validateUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('validate-user');

    assert.ok(service, 'Registered the service');
  });
});
