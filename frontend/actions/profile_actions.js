var Dispatcher = require('../dispatcher/dispatcher'),
    profileConstants = require('../constants/profile_constants'),
    ProfileApiUtil = require('../util/profile_api_util');

var ProfileActions = {
  fetchProfile: function () {
    console.log('ProfileActions#fetchIntro');
    ProfileApiUtil.fetchIntro();
  },
  receiveProfileIntro: function (intro) {
    console.log("ProfileActions#receiveIntro");
    Dispatcher.dispatch({
      actionType: profileConstants.INTRO_RECEIVED,
      intro: intro
    });
  }
};

module.exports = ProfileActions;
