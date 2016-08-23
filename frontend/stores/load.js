var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js');

var _loading = {};

var LoadStore = new Store(AppDispatcher);

LoadStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case loadConstants.LOADING:
      _loading[payload.fileName] = true;
      LoadStore.__emitChange();
      break;
    case loadConstants.LOADED:
      _loading[payload.fileName] = false;
      LoadStore.__emitChange();
      break;
  }
};

LoadStore.finishedLoading = function () {
  var fileNames = Object.keys(_loading);
  for (var i = 0; i < fileNames.length; i++) {
    if (_loading[fileNames[i]]) {
      return false;
    }
  }
  return true;
};

module.exports = LoadStore;
