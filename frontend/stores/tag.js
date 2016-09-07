var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants'),
    tagConstants = require('../constants/tag_constants');

var _friendsFetched = false,
    _isEditingPost = false,
    _taggedFriends = [],
    _untaggedFriends = [],
    _extraTaggedFriends = [],
    _originalTags = []; // for running tags diff on post update

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
  if (set.length === 0) { return false }
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

TagStore.filterForEdit = function () {
  var update = { add: [], remove: [] };
  var uids = TagStore.uids();
  uids.forEach(function (uid) {
    if (_originalTags.indexOf(uid) < 0) { update.add.push(uid) }
  });
  _originalTags.forEach(function (uid) {
    if (uids.indexOf(uid) < 0) { update.remove.push(uid) }
  });
  return update;
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
      return set.splice(i, 1)[0];
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
  _originalTags = _taggedFriends.map(function (user) {
    return user.userId
  });
};

TagStore.tagFriend = function (userId) {
  var user = TagStore.remove(_untaggedFriends, userId);
  _taggedFriends.push(user);
};

TagStore.taggedFriends = function () {
  return _taggedFriends.slice();
};

// returns editingBool ? { add: [*], remove: [*] } : [*]
TagStore.uids = function (editingBool) {
  if (editingBool) {
    return TagStore.filterForEdit();
  } else {
    return _taggedFriends.map(function (user) { return user.userId } );
  }
};

TagStore.unfreezeTags = function () {
  _taggedFriends = _extraTaggedFriends.slice();
  _extraTaggedFriends = [];
};

TagStore.untagFriend = function (userId) {
  TagStore.remove(_taggedFriends, userId);
};

TagStore.untaggedFriends = function () {
  return _untaggedFriends.slice();
};

module.exports = TagStore;
