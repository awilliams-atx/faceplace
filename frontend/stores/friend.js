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
  }
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
