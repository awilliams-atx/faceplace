var Dispatcher = require('../dispatcher/dispatcher'),
    profileConstants = require('../constants/profile_constants');

var ProfileActions = {
  receiveProfile: function (profile) {
    Dispatcher.dispatch({
      actionType: profileConstants.PROFILE_RECEIVED,
      profile: profile
    });
  }
};

module.exports = ProfileActions;
