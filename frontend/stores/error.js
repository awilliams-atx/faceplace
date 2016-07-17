var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    errorConstants = require('../constants/error_constants');

var _loginErrors = {};

var ErrorStore = new Store(AppDispatcher);

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case errorConstants.ERRORS_CLEARED:
      this.clearErrors();
      ErrorStore.__emitChange();
      break;
    case errorConstants.ERRORS_RECEIVED:
      if (payload.errorType === 'login') {
        container = _loginErrors
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
    return this.dupedErrors(_signUp);
  }
};

ErrorStore.setErrors = function (errors, container) {
  this.clearErrors(container);
  Object.keys(errors).forEach(function (key) {
    container[key] = errors[key];
  });
};

module.exports = ErrorStore;
