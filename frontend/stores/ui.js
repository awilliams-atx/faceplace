var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    uiConstants = require('../constants/ui_constants');

var UIStore = new Store(AppDispatcher);

_ui = { scrollPostId: undefined }

UIStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case uiConstants.SET_SCROLL_POST:
    _ui.scrollPostId = payload.id;
    break;
  }
};

UIStore.ui = function () {
  return Object.assign({}, _ui);
};

window.ui = UIStore.ui;

module.exports = UIStore;
