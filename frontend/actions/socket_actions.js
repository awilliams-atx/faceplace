var Dispatcher = require('../dispatcher/dispatcher'),
    socketConstants = require('../constants/socket_constants'),
    Sessionstore = require('../stores/session');

var SocketActions = {
  pushFriendRequest: function (request) {
    Dispatcher.dispatch({
      actionType: socketConstants.PUSH_FRIEND_REQUEST,
      request: request
    });
  },
  pushNotification: function (notification) {
    Dispatcher.dispatch({
      actionType: socketConstants.PUSH_NOTIFICATION,
      notification: notification
    });
  }
};

module.exports = SocketActions;
