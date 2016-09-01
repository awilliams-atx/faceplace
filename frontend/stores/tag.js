var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants'),
    tagConstants = require('../constants/tag_constants');

var _friends = [],
    _friendsFetched = false,
    _isEditingPost = false,
    _taggedFriends = [],
    _untaggedFriends = [],
    _extraTaggedFriends = [];

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

TagStore.find = function (set, id) {
  for (var i = 0; i < set.length; i++) {
    if (set[i].userId === id) {
      return set[i];
    }
  }
};

TagStore.exists = function (set, friend) {
  for (var i = 0; i < set.length; i++) {
    if (set[i].userId === friend.userId) {
      return true;
    }
  }
  return false;
};

TagStore.isEditingPost = function () {
  return !!_isEditingPost;
};

TagStore.freezeTags = function () {
  _extraTaggedFriends = _taggedFriends.slice();
  _taggedFriends = [];
};

TagStore.friendsFetched = function () {
  return _friendsFetched;
};

TagStore.remove = function (set, id) {
  for (var i = 0; i < set.length; i++) {
    if (set[i].userId === id) {
      var user = set[i];
      set.splice(i, 1);
      return user;
    }
  }
};

TagStore.resetFriends = function () {
  _taggedFriends = [];
  _untaggedFriends = [];
};

TagStore.setFriends = function (friends) {
  _untaggedFriends = [];
  friends.forEach(function (friend) {
    if (!TagStore.exists(_taggedFriends, friend)) {
      _untaggedFriends.push(friend);
    }
  });
};

TagStore.setTaggedFriends = function (friends) {
  friends.forEach(function (friend) {
    _taggedFriends.push(friend);
  });
};

TagStore.tagFriend = function (userId) {
  var user = TagStore.remove(_untaggedFriends, userId);
  _taggedFriends.push(user);
};

TagStore.taggedFriends = function () {
  return _taggedFriends.slice();
};

TagStore.unfreezeTags = function () {
  _taggedFriends = _extraTaggedFriends.slice();
  _extraTaggedFriends = [];
};

TagStore.untagFriend = function (userId) {
  delete _taggedFriends[userId];
};

TagStore.untaggedFriends = function () {
  return _untaggedFriends.slice();
};

module.exports = TagStore;
