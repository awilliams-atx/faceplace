var Dispatcher = require('../dispatcher/dispatcher'),
    userConstants = require('../constants/userConstants');

var SessionActions = {
  receiveCurrentUser: function (user) {
    Dispatcher.dispatch({
      actionType: userConstants.CURRENT_USER_RECEIVED,
      user: user
    });
  },
  removeCurrentUser: function () {
    Dispatcher.dispatch({
      actionType: userConstants.CURRENT_USER_REMOVED
    });
  }
};

module.exports = SessionActions;
