var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    introConstants = require('../constants/intro_constants');

var _intro = {
  description: '',
  company: '',
  position: '',
  school: '',
  major: '',
  location: '',
  hometown: ''
};

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

IntroStore.description = function () { return _intro.description; };

IntroStore.company = function () { return _intro.company; };

IntroStore.position = function () { return _intro.position; };

IntroStore.school = function () { return _intro.school; };

IntroStore.major = function () { return _intro.major; };

IntroStore.location = function () { return _intro.location; };

IntroStore.hometown = function () { return _intro.hometown; };

window.IntroStore = IntroStore;
module.exports = IntroStore;
