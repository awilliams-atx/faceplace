var Dispatcher = require('../dispatcher/dispatcher'),
    sessionConstants = require('../constants/session_constants');

var SessionActions = {
  receiveCurrentUser: function (user) {
    console.log('SessionActions#receiveCurrentUser ' + user.first_name);
    Dispatcher.dispatch({
      actionType: sessionConstants.RECEIVE_CURRENT_USER,
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
