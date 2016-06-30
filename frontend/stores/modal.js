var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    modalConstants = require('../constants/modal_constants');

var _modalContent = null;
var _isModalDisplayed = false;

var ModalStore = new Store(AppDispatcher);

ModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case modalConstants.MODAL_TRIGGERED:
      this.setModalContent(payload.modalContent);
      ModalStore.__emitChange();
      break;
  }
};

ModalStore.isModalDisplayed = function () {
  return !!_isModalDisplayed;
};

ModalStore.modalContent = function () {
  return _modalContent;
};

ModalStore.setModalContent = function (modalContent) {
  _modalContent = modalContent;
};


module.exports = ModalStore;
