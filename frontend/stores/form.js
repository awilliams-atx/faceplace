var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    formConstants = require('../constants/form_constants');

var _openForms = {};

var FormStore = new Store(AppDispatcher);

FormStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case formConstants.CLOSE_ALL:
      _openForms = {};
      FormStore.__emitChange();
      break;
    case formConstants.INTRO_DESCRIPTION_OPEN:
      _openForms[INTRO_DESCRIPTION] = true;
      FormStore.emitChange();
      break;
    case formConstants.INTRO_DESCRIPTION_CLOSE:
      delete _openForms[INTRO_DESCRIPTION];
      FormStore.emitChange();
      break;
    case formConstants.INTRO_WORK_OPEN:
      _openForms[INTRO_WORK] = true;
      FormStore.emitChange();
      break;
    case formConstants.INTRO_WORK_CLOSE:
      delete _openForms[INTRO_WORK];
      FormStore.emitChange();
      break;
    case formConstants.INTRO_SCHOOL_OPEN:
      _openForms[INTRO_SCHOOL] = true;
      FormStore.emitChange();
      break;
    case formConstants.INTRO_SCHOOL_CLOSE:
      delete _openForms[INTRO_SCHOOL];
      FormStore.emitChange();
      break;
    case formConstants.INTRO_LOCATION_OPEN:
      _openForms[INTRO_LOCATION] = true;
      FormStore.emitChange();
      break;
    case formConstants.INTRO_LOCATION_CLOSE:
      delete _openForms[INTRO_LOCATION];
      FormStore.emitChange();
      break;
    case formConstants.INTRO_HOMETOWN_OPEN:
      _openForms[INTRO_HOMETOWN] = true;
      FormStore.emitChange();
      break;
    case formConstants.INTRO_HOMETOWN_CLOSE:
      delete _openForms[INTRO_HOMETOWN];
      FormStore.emitChange();
      break;
  }
};

FormStore.isOpen = function (form) {
  return _openForms[form];
};

module.exports = FormStore;
