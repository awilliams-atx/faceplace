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

ErrorStore.clearErrors = function () {
  Object.keys(_loginErrors).forEach(function (key) {
    delete _loginErrors[key];
  });
};

ErrorStore.dupedErrors = function () {
  var dupedErrors = {};
  Object.keys(_loginErrors).forEach(function (key) {
    dupedErrors[key] = _loginErrors[key];
  });

  return dupedErrors;
};

ErrorStore.errors = function () {
  if (Object.keys(_loginErrors).length === 0) {
    return false;
  } else {
    return this.dupedErrors();
  }
};

ErrorStore.setErrors = function (errors) {
  this.clearErrors();
  Object.keys(errors).forEach(function (key) {
    _loginErrors[key] = errors[key];
  });
};

module.exports = ErrorStore;
