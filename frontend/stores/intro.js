var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    introConstants = require('../constants/intro_constants');

var _intro = {};

var IntroStore = new Store(AppDispatcher);

IntroStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case introConstants.INTRO_RECEIVED:
    console.log('IntroStore, INTRO_RECEIVED');
      _intro = payload.intro;
      IntroStore.__emitChange();
      break;
  }
};

IntroStore.intro = function () {
  return $.extend({}, _intro);
};

window.IntroStore = IntroStore;
module.exports = IntroStore;
