// Initializes the `validateUser` service on path `/validate-user`
const createService = require('./validate-user.class.js');
const hooks = require('./validate-user.hooks');
const filters = require('./validate-user.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'validate-user',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/validate-user', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('validate-user');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
