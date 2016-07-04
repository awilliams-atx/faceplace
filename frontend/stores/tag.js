var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants'),
    tagConstants = require('../constants/tag_constants');

var _friends = {},
    _friendsFetched = false,
    _taggedFriends = {},
    _untaggedFriends = {};

var TagStore = new Store(AppDispatcher);

TagStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case tagConstants.FRIENDS_RECEIVED_FOR_TAGGING:
      this.setFriends(payload.friends);
      _friendsFetched = true;
      TagStore.__emitChange();
      break;
    case tagConstants.FRIEND_TAGGED:
      this.tagFriend(payload.userId);
      TagStore.__emitChange();
      break;
    case tagConstants.FRIEND_UNTAGGED:
      this.untagFriend(payload.userId);
      TagStore.__emitChange();
      break;
    case postConstants.OWN_POST_RECEIVED:
      this.resetFriends();
      TagStore.__emitChange();
      break;
    case tagConstants.TAG_SEARCH_RESULTS_RECEIVED:
      this.setFriends(payload.searchResults);
      _friendsFetched = true;
      TagStore.__emitChange();
      break;
  }
};

TagStore.friendsFetched = function () {
  return _friendsFetched;
};

TagStore.resetFriends = function () {
  Object.keys(_taggedFriends).forEach(function (userId) {
    delete _taggedFriends[userId];
  });
  Object.keys(_untaggedFriends).forEach(function (userId) {
    delete _untaggedFriends[userId];
  });
};

TagStore.setFriends = function (friends) {
  Object.keys(_untaggedFriends).forEach(function (userId) {
    delete _untaggedFriends[userId];
  });

  friends.forEach(function (friend) {
    if (!_taggedFriends[friend.userId]) {
      _untaggedFriends[friend.userId] = friend;
    }
  });
};

TagStore.tagFriend = function (userId) {
  _taggedFriends[userId] = _untaggedFriends[userId];
  delete _untaggedFriends[userId];
};

TagStore.taggedFriends = function () {
  return $.extend({}, _taggedFriends);
};

TagStore.untagFriend = function (userId) {
  _untaggedFriends[userId] = _taggedFriends[userId];
  delete _taggedFriends[userId];
};

TagStore.untaggedFriends = function () {
  return $.extend({}, _untaggedFriends);
};

module.exports = TagStore;
