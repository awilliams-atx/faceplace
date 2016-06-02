var Dispatcher = require('../dispatcher/dispatcher'),
    errorConstants = require('../constants/error_constants');

var ErrorActions = {
  setErrors: function (errors) {
    console.log('ErrorActions#setErrors, actionType: ' + errorConstants.ERRORS_RECEIVED);
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_RECEIVED,
      errors: errors
    });
  },
  clearErrors: function () {
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_CLEARED
    });
  }
};

module.exports = ErrorActions;
