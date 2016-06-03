var Dispatcher = require('../dispatcher/dispatcher'),
    introConstants = require('../constants/intro_constants');

var IntroActions = {
  receiveIntro: function (intro) {
    Dispatcher.dispatch({
      actionType: introConstants.INTRO_RECEIVED,
      intro: intro
    });
  }
};

module.exports = IntroActions;
