var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    profileConstants = require('../constants/profile_constants');

var _intro = {};

var ProfileStore = new Store(AppDispatcher);

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case profileConstants.INTRO_RECEIVED:
    console.log('ProfileStore, INTRO_RECEIVED');
      _intro = payload.intro;
      break;
  }
};

ProfileStore.intro = function () {
  return _intro;
};

window.ProfileStore = ProfileStore;
module.exports = ProfileStore;
