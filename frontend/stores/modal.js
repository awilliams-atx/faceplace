var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    modalConstants = require('../constants/modal_constants');

var _modalContent = null;

var ModalStore = new Store(AppDispatcher);

ModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case modalConstants.MODAL_TRIGGERED:
      this.setConfirmation(payload.confirmation);
      ModalStore.__emitChange();
      break;
  }
};

ModalStore.confirmation = function () {
  for (var key in _confirmation) {
    if (_confirmation.hasOwnProperty(key)) {
      return $.extend({}, _confirmation);
    }
  }

  return false;
};

ModalStore.setConfirmation = function (confirmation) {
  _confirmation = confirmation;
};


module.exports = ModalStore;
