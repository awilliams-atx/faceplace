var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    errorConstants = require('../constants/error_constants');

var _errors = {};

var ErrorStore = new Store(AppDispatcher);

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case errorConstants.ERRORS_CLEARED:
      this.clearErrors();
      ErrorStore.__emitChange();
      break;
    case errorConstants.ERRORS_RECEIVED:
      this.setErrors(payload.errors);
      ErrorStore.__emitChange();
      break;
  }
};

ErrorStore.clearErrors = function () {
  Object.keys(_errors).forEach(function (key) {
    delete _errors[key];
  });
};

ErrorStore.dupedErrors = function () {
  var dupedErrors = {};
  Object.keys(_errors).forEach(function (key) {
    dupedErrors[key] = _errors[key];
  });

  return dupedErrors;
};

ErrorStore.errors = function () {
  if (Object.keys(_errors).length === 0) {
    return false;
  } else {
    return this.dupedErrors();
  }
};

ErrorStore.setErrors = function (errors) {
  this.clearErrors();
  Object.keys(errors).forEach(function (key) {
    _errors[key] = errors[key];
  });
};

module.exports = ErrorStore;
