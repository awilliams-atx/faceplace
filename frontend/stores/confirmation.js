var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    confirmationConstants = require('../constants/confirmation_constants');

var _confirmation = {};

var ConfirmationStore = new Store(AppDispatcher);

ConfirmationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case confirmationConstants.CONFIRMATION_REQUESTED:
      this.setConfirmation(payload.confirmation);
      ConfirmationStore.__emitChange();
      break;
  }
};

ConfirmationStore.confirmation = function () {
  for (var key in _confirmation) {
    if (_confirmation.hasOwnProperty(key)) {
      return $.extend({}, _confirmation);
    }
  }

  return false;
};

ConfirmationStore.setConfirmation = function (confirmation) {
  _confirmation = confirmation;
};


module.exports = ConfirmationStore;
