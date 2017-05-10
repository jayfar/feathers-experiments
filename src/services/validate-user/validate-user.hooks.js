const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [commonHooks.disallow()],
    get: [commonHooks.disallow()],
    create: [commonHooks.disallow()],
    update: [],
    patch: [commonHooks.disallow()],
    remove: [commonHooks.disallow()]
  },

  after: {
    all: [],
    find: [commonHooks.disallow()],
    get: [commonHooks.disallow()],
    create: [commonHooks.disallow()],
    update: [],
    patch: [commonHooks.disallow()],
    remove: [commonHooks.disallow()]
  },

  error: {
    all: [],
    find: [commonHooks.disallow()],
    get: [commonHooks.disallow()],
    create: [commonHooks.disallow()],
    update: [],
    patch: [commonHooks.disallow()],
    remove: [commonHooks.disallow()]
  }
};
