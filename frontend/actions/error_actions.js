var Dispatcher = require('../dispatcher/dispatcher')
    errorConstants = require('../constants/error_constants');

function _extractErrors (errors) {
  debugger
}

var ErrorActions = {
  setErrors: function (errors) {
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_RECEIVED,
      errors: _extractErrors(errors)
    });
  },
  clearErrors: function () {
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_CLEARED
    });
  }
};

module.exports = ErrorActions;
