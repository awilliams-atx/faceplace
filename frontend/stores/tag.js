var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants'),
    tagConstants = require('../constants/tag_constants');

var _friends = {},
    _friendsFetched = false,
    _isEditingPost = false,
    _taggedFriends = {},
    _untaggedFriends = {},
    _extraTaggedFriends = {};

var TagStore = new Store(AppDispatcher);

TagStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case tagConstants.FREEZE_TAGS:
      _isEditingPost = true;
      this.freezeTags();
      break;
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
    case postConstants.TAGGED_FRIENDS_RECEIVED:
      this.setTaggedFriends(payload.friends);
      TagStore.__emitChange();
      break;
    case tagConstants.TAG_SEARCH_RESULTS_RECEIVED:
      this.setFriends(payload.searchResults);
      _friendsFetched = true;
      TagStore.__emitChange();
      break;
    case tagConstants.UNFREEZE_TAGS:
      _isEditingPost = false;
      this.unfreezeTags();
      break;
  }
};

TagStore.isEditingPost = function () {
  return !!_isEditingPost;
};

TagStore.freezeTags = function () {
  Object.keys(_taggedFriends).forEach(function (userId) {
    _extraTaggedFriends[userId] = _taggedFriends[userId];
    delete _taggedFriends[userId];
  });
};

TagStore.friendsFetched = function () {
  return _friendsFetched;
};

TagStore.resetFriends = function () {
  _taggedFriends = {};
  _untaggedFriends = {};
};

TagStore.setFriends = function (friends) {
  _untaggedFriends = {};

  friends.forEach(function (friend) {
    if (!_taggedFriends[friend.userId]) {
      _untaggedFriends[friend.userId] = friend;
    }
  });
};

TagStore.setTaggedFriends = function (friends) {
  friends.forEach(function (friend) {
    _taggedFriends[friend.userId] = friend;
  });
};

TagStore.tagFriend = function (userId) {
  _taggedFriends[userId] = _untaggedFriends[userId];
  delete _untaggedFriends[userId];
};

TagStore.taggedFriends = function () {
  return $.extend({}, _taggedFriends);
};

TagStore.unfreezeTags = function () {
  _taggedFriends = {};
  Object.keys(_extraTaggedFriends).forEach(function (userId) {
    _taggedFriends[userId] = _extraTaggedFriends[userId];
    delete _extraTaggedFriends[userId];
  });
};

TagStore.untagFriend = function (userId) {
  delete _taggedFriends[userId];
};

TagStore.untaggedFriends = function () {
  return $.extend({}, _untaggedFriends);
};

module.exports = TagStore;
