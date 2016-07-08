var Dispatcher = require('../dispatcher/dispatcher'),
    errorConstants = require('../constants/error_constants');

var ErrorActions = {
  clearErrors: function () {
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_CLEARED
    })
  },
  setErrors: function (errors) {
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_RECEIVED,
      errors: errors
    });
  }
};

module.exports = ErrorActions;
