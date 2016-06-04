var Dispatcher = require('../dispatcher/dispatcher'),
    userConstants = require('../constants/user_constants');

var ServerActions = {
  receiveUsers: function (users) {
    Dispatcher.dispatch({
      actionType: userConstants.USERS_RECEIVED,
      users: users
    });
  },
  receiverUser: function (user) {
    Dispatcher.dispatch({
      actionType: userConstants.USER_RECEIVED,
      user: user
    });
  }
};

module.exports = ServerActions;
