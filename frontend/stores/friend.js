var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    friendConstants = require('../constants/friend_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    ClientActions = require('../actions/client_actions'),
    SessionStore = require('../stores/session');

var _friends = {};

var FriendStore = new Store(AppDispatcher);

FriendStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case friendConstants.MOST_RECENTLY_ADDED_FRIENDS_RECEIVED:
      this.setFriends({
        profileOwnerId: payload.profileOwnerId,
        friends: payload.friends
      });
      FriendStore.__emitChange();
      break;
    case friendRequestConstants.FRIEND_REQUEST_ACCEPTED:
      this.setOrFindFriend({profileOwnerId: payload.userId});
      break;
    case friendshipConstants.FRIENDSHIP_DESTROYED:
      this.removeFriend(payload.profileOwnerId);
  }
};

FriendStore.removeFriend = function (profileOwnerId) {
  var currentUserId = SessionStore.currentUser().id;
  delete _friends[profileOwnerId][currentUserId];
  ClientActions.fetchMostRecentlyAddedFriends(profileOwnerId);
};

FriendStore.setOrFindFriend = function (opts) {
  if (!_friends[opts.profileOwnerId].hasOwnProperty(opts.profileOwnerId)) {
    ClientActions.fetchMostRecentlyAddedFriends(opts.profileOwnerId);
  }
};

FriendStore.setFriends = function (opts) {
  _friends[opts.profileOwnerId] = _friends[opts.profileOwnerId] || {};
  opts.friends.forEach(function (friend) {
    _friends[opts.profileOwnerId][friend.userId] = friend;
  });
};

FriendStore.all = function (profileOwnerId) {
  if (!_friends.hasOwnProperty(profileOwnerId)) { return []; }
  return Object.keys(_friends[profileOwnerId]).map(function (userId) {
    return _friends[profileOwnerId][userId];
  });
};

FriendStore.friendsFetched = function (profileOwnerId) {
  return _friends.hasOwnProperty(profileOwnerId);
};

module.exports = FriendStore;
