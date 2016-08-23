var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    loadConstants = require('../constants/load_constants');

var _loading = {};

var LoadStore = new Store(AppDispatcher);

LoadStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case loadConstants.LOADING:
      payload.fileNames.forEach(function (fileName) {
        _loading[fileName] = true;
      });
      LoadStore.__emitChange();
      break;
    case loadConstants.LOADED:
      _loading[payload.fileName] = false;
      LoadStore.__emitChange();
      break;
    case 'USER_RECEIVED':
      LoadStore.__emitChange();
      break;
  }
};

LoadStore.loading = function () {
  var fileNames = Object.keys(_loading);
  for (var i = 0; i < fileNames.length; i++) {
    if (_loading[fileNames[i]]) {
      return true;
    }
  }
  return false;
};

module.exports = LoadStore;
