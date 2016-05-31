var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    error_constants = require('../constants/error_constants');

var _errors = {};

var ErrorStore = new Store(AppDispatcher);

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case error_constants.ERRORS_CLEARED:
      this._clearErrors();
      ErrorStore.__emitChange();
      break;
    case error_constants.ERRORS_RECEIVED:
      this._setErrors(payload.errors);
      ErrorStore.__emitChange();
      break;
  }
};

ErrorStore._clearErrors = function () {
  _errors = {};
};

ErrorStore._setErrors = function (errors) {
  
};

module.exports = SessionStore;
