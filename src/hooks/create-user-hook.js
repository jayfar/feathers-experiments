// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const logger = require('winston');


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    logger.info('create-user-hook', "params: " + JSON.stringify(hook.params, null, 4) );   


    if(hook.type === 'before' && hook.method === "create") {
        logger.info('create-user-hook', JSON.stringify(hook.data, null, 4));    
        
        hook.data.isValidated = false;
    }

    if(hook.type === 'after' && hook.method === "create") {
        logger.info('create-user-hook', JSON.stringify(hook.result, null, 4));    
        
        logger.info('create-user-hook', "In After Create Send email with this link " + hook.result._id);
        // Remove the _id so it is not sent back to the end user
        delete hook.result._id;
    }


    return Promise.resolve(hook);
  };
};
