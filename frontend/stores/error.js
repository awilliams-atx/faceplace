var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    errorConstants = require('../constants/error_constants');

var _loginErrors = {};
var _signUpErrors = {};
var _lastAction = null;

var ErrorStore = new Store(AppDispatcher);

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case errorConstants.LOGIN_ERRORS_CLEARED:
      _lastAction = errorConstants.LOGIN_ERRORS_CLEARED;
      this.clearErrors(_loginErrors);
      ErrorStore.__emitChange();
      break;
    case errorConstants.ERRORS_RECEIVED:
      if (payload.errorType === 'login') {
        _lastAction = 'LOGIN_ERRORS_RECEIVED';
        container = _loginErrors;
      } else if (payload.errorType = 'signUp') {
        _lastAction = 'SIGN_UP_ERRORS_RECEIVED';
        container = _signUpErrors;
      }
      this.setErrors(payload.errors, container);
      ErrorStore.__emitChange();
      break;
  }
};

ErrorStore.clearErrors = function (container) {
  Object.keys(container).forEach(function (key) {
    delete container[key];
  });
};

ErrorStore.dupedErrors = function (container) {
  if (Object.keys(container).length === 0) {
    return false;
  }
  var dupedErrors = {};
  Object.keys(container).forEach(function (key) {
    dupedErrors[key] = container[key];
  });

  return dupedErrors;
};

ErrorStore.errors = function (errorType) {
  if (errorType === 'login') {
    return this.dupedErrors(_loginErrors);
  } else if (errorType === 'signUp') {
    return this.dupedErrors(_signUpErrors);
  }
};

ErrorStore.lastAction = function (lastAction) {
  return _lastAction === lastAction;
};

ErrorStore.setErrors = function (errors, container) {
  this.clearErrors(container);
  Object.keys(errors).forEach(function (key) {
    if (errors[key] instanceof Array) {
      container[key] = errors[key][0];
    } else {
      container[key] = errors[key];
    }
  });
};

module.exports = ErrorStore;
