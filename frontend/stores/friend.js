var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    friendConstants = require('../constants/friend_constants');

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

window.FriendStore = FriendStore;
module.exports = FriendStore;
