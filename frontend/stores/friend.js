var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    friendConstants = require('../constants/friend_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    ClientActions = require('../actions/client_actions'),
    SessionStore = require('../stores/session');

var _friends = [];

var FriendStore = new Store(AppDispatcher);

FriendStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case friendConstants.MOST_RECENTLY_ADDED_FRIENDS_RECEIVED:
      FriendStore.setFriends(payload.friends);
      FriendStore.__emitChange();
      break;
    case friendRequestConstants.RECEIVED_FRIEND_REQUEST_ACCEPTED:
      this.setOrFindFriend(payload.user_id);
      break;
    case friendshipConstants.FRIENDSHIP_DESTROYED:
      this.removeFriend();
      FriendStore.__emitChange();
  }
};

FriendStore.removeFriend = function () {
  currentUserId = SessionStore.currentUser().id;
  for (var i = 0; i < _friends.length; i++) {
    if (_friends[i].user_id === currentUserId) {
      _friends.splice(i, 1);
    }
  }
};

FriendStore.setOrFindFriend = function (profileOwnerId) {
  ClientActions.fetchMostRecentlyAddedFriends(profileOwnerId);
};

FriendStore.setFriends = function (friends) {
  while (_friends.length > 0) {
    _friends.pop();
  }
  friends.forEach(function (friend) {
    _friends.push(friend);
  });
};

FriendStore.all = function (profileOwnerId) {
  return _friends.slice();
};

FriendStore.friendsFetched = function (profileOwnerId) {
  return _friends.hasOwnProperty(profileOwnerId);
};

module.exports = FriendStore;
