/* eslint-disable no-unused-vars */

const logger = require('winston');
const errors =  require('feathers-errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    return Promise.resolve([]);
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update (id, data, params) {

    logger.info('validate-user-class', "Inside the update service");   
    logger.info('validate-user-class', "id: " + id );   
    logger.info('validate-user-class', "data: " + JSON.stringify(data, null, 4) );   
    logger.info('validate-user-class', "params: " + JSON.stringify(params, null, 4) );   

    const usersService = this.app.service('users');
    
    var retData = {};

    return usersService.find({
        query: {
            _id: id
        }
    }).then(foundUsers => {
        
        console.log("------------");
        console.log(foundUsers);
        if(foundUsers.total == 0)
        {
            retData.error = false;
            retData.message = "strExpiredValidation";
            return Promise.resolve(retData);
        }
        else if(foundUsers.data[0].isValidated == true)
        {
            retData.error = false;
            retData.message = "strAlreadyValidated";
            return Promise.resolve(retData);
        }
        else
        {
            return this._updateUserValidation(usersService, id);
            // return users.patch(null, {
            //     isValidated: true
            // },
            // { query: {
            //     _id: id
            // }})
            // .then(userUpdated => {
            //     console.log(userUpdated);
            //     retData.error = false;
            //     retData.message = "strUserValidated";
            //     retData.user = userUpdated[0].email;
            //     return retData;
            // })
            // .catch(ex => {
            //     logger.error('validate-user-class', "Catch Error 2");
            //     logger.error('validate-user-class', ex);
            //     retData.error = true;
            //     retData.message = "Validation Write Error: " + ex;
            //     return retData;
            // });
        }
    }).catch(ex => {
        logger.error('validate-user-class', "Catch Error 1");
        logger.error('validate-user-class', ex);

        return new errors.GeneralError(new Error("Validation Read Error: " + ex));
    });

    //return Promise.resolve(data);
  }

  _updateUserValidation(usersService, id) {
    
    var retData = {};

    return usersService.patch(null, {
        isValidated: true
    },
    { query: {
        _id: id
    }})
    .then(userUpdated => {
        console.log(userUpdated);
        retData.error = false;
        retData.message = "strUserValidated";
        retData.user = userUpdated[0].email;
        return retData;
    })
    .catch(ex => {
        logger.error('validate-user-class', "Validation Write Error");
        logger.error('validate-user-class', ex);
        return new errors.GeneralError(new Error("Validation Write Error: " + ex));;
    });
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  remove (id, params) {
    return Promise.resolve({ id });
  }

  setup(app) {
    // Setup the this.app so we can use it in the other methods
    // https://docs.feathersjs.com/api/services.html#setupapp-path
    logger.info('validate-user-class', "Setup Called");  
    this.app = app;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
