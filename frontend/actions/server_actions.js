var Dispatcher = require('../dispatcher/dispatcher'),
    userConstants = require('../constants/user_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants');

var ServerActions = {
  receiveUsers: function (users) {
    Dispatcher.dispatch({
      actionType: userConstants.USERS_RECEIVED,
      users: users
    });
  },
  receiveUser: function (user, cb) {
    Dispatcher.dispatch({
      actionType: userConstants.USER_RECEIVED,
      user: user
    });
  },
  receiveFriendRequest: function (response) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.MADE_FRIEND_REQUEST_RECEIVED,
      response: response
    });
  },
  receiveFriendRequestResponse: function (friendRequestResponse) {
    var actionType;

    if (friendRequestResponse.response === 'accept') {
      actionType = friendRequestConstants.FRIEND_REQUEST_ACCEPTED;
    } else if (friendRequestResponse.response === 'reject') {
      actionType = friendRequestConstants.FRIEND_REQUEST_REJECTED;
    }

    Dispatcher.dispatch({
      actionType: actionType
    });
  },
  receiveFriendRequestCancelation: function () {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.FRIEND_REQUEST_CANCELED
    });
  },
  receiveDestroyedFriendship: function (friendship) {
    Dispatcher.dispatch({
      actionType: friendshipConstants.FRIENDSHIP_DESTROYED
    });
  }
};

module.exports = ServerActions;
