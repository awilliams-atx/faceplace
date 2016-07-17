var Dispatcher = require('../dispatcher/dispatcher'),
    errorConstants = require('../constants/error_constants');

var ErrorActions = {
  clearErrors: function () {
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_CLEARED
    })
  },
  setErrors: function (errors, errorType) {
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_RECEIVED,
      errors: errors,
      errorType: errorType
    });
  }
};

module.exports = ErrorActions;
