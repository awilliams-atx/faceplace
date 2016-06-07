var Dispatcher = require('../dispatcher/dispatcher'),
    userConstants = require('../constants/user_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    searchConstants = require('../constants/search_constants'),
    friendConstants = require('../constants/friend_constants');

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
      actionType: actionType,
      userId: friendRequestResponse.userId
    });
  },
  receiveFriendRequestCancelation: function () {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.FRIEND_REQUEST_CANCELED
    });
  },
  receiveDestroyedFriendship: function (friendship) {
    Dispatcher.dispatch({
      actionType: friendshipConstants.FRIENDSHIP_DESTROYED,
      profileOwnerId: parseInt(friendship.userId)
    });
  },
  receiveSearchResults: function (searchResults) {
    Dispatcher.dispatch({
      actionType: searchConstants.SEARCH_RESULTS_RECEIVED,
      searchResults: searchResults
    });
  },
  receiveMostRecentlyAddedFriends: function (friendsData) {
    Dispatcher.dispatch({
      actionType: friendConstants.MOST_RECENTLY_ADDED_FRIENDS_RECEIVED,
      friends: friendsData.friends,
      profileOwnerId: friendsData.profileOwnerId
    });
  }
};

module.exports = ServerActions;
