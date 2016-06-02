var Dispatcher = require('../dispatcher/dispatcher'),
    sessionConstants = require('../constants/session_constants');

var SessionActions = {
  receiveCurrentUser: function (user) {
    console.log('SessionActions#receiveCurrentUser ' + user.email);
    Dispatcher.dispatch({
      actionType: sessionConstants.LOGIN,
      user: user
    });
  },
  removeCurrentUser: function () {
    Dispatcher.dispatch({
      actionType: sessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;
