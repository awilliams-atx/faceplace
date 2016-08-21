var Dispatcher = require('../dispatcher/dispatcher'),
    userConstants = require('../constants/user_constants');

var UserActions = {
  receiveProfile: function (profile) {
    Dispatcher.dispatch({
      actionType: userConstants.PROFILE_RECEIVED,
      profile: profile
    });
  }
};

module.exports = UserActions;
