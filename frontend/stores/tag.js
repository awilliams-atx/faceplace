var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants'),
    tagConstants = require('../constants/tag_constants');

var _friends = {},
    _taggedFriendIds = {},
    _friendsFetched = false;

var TagStore = new Store(AppDispatcher);

TagStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case tagConstants.FRIENDS_RECEIVED_FOR_TAGGING:
      this.setFriends(payload.friends);
      _friendsFetched = true;
      TagStore.__emitChange();
      break;
    case tagConstants.FRIEND_TAGGED:
      _taggedFriendIds[payload.userId] = true;
      break;
    case tagConstants.FRIEND_UNTAGGED:
      delete _taggedFriendIds[payload.userId];
      break;
    case postConstants.OWN_POST_RECEIVED:
      _taggedFriendIds = {};
      TagStore.__emitChange();
      break;
  }
};

TagStore.allFriends = function () {
  return $.extend({}, _friends);
};

TagStore.allTaggedFriendIds = function (opts) {
  if (opts && opts.keysOnly) {
    return Object.keys(_taggedFriendIds);
  } else {
    return $.extend({}, _taggedFriendIds);
  }
};

TagStore.find = function (id) {
  return $.extend({}, _friends[id]);
};

TagStore.friendsFetched = function () {
  return _friendsFetched;
};

TagStore.setFriends = function (friends) {
  friends.forEach(function (friend) {
    _friends[friend.userId] = friend;
  });
};

window.TagStore = TagStore;
module.exports = TagStore;
