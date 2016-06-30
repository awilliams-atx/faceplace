var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    modalConstants = require('../constants/modal_constants');

var _modalContent = null;

var ModalStore = new Store(AppDispatcher);

ModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case modalConstants.MODAL_TRIGGERED:
      this.setModal(payload.confirmation);
      ModalStore.__emitChange();
      break;
  }
};

ModalStore.modalContent = function () {
  return _modalContent;
};

ModalStore.setModal = function (confirmation) {
  _confirmation = confirmation;
};


module.exports = ModalStore;
