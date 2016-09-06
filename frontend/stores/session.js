var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    sessionConstants = require('../constants/session_constants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;

var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case sessionConstants.LOGOUT:
      SessionStore.logout();
      break;
    case sessionConstants.RECEIVE_CURRENT_USER:
      SessionStore.login(payload.user);
      SessionStore.__emitChange();
      break;
    case friendRequestConstants.RECEIVED_FRIEND_REQUEST_ACCEPTED:
      SessionStore.addFriend(payload.request.maker_id);
      SessionStore.__emitChange();
      break;
    case friendshipConstants.UNFRIENDED:
      SessionStore.unfriend(payload.friend_id);
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.addFriend = function (id) {
  _currentUser.friends.push(id);
};

SessionStore.authorizedToCommentOn = function (post) {
  var profileOwnerId = post.profileOwner ? post.profileOwner.id : undefined;

  if (_currentUser.id === post.authorId ||
      _currentUser.id === profileOwnerId ||
      SessionStore.taggedIn(post) ||
      SessionStore.friendsWith(post.authorId, profileOwnerId)) {
    return true;
  }

  return false;
};

SessionStore.authorizedToPostOnTimeline = function (uid) {
  return _currentUser.id === uid || SessionStore.friendsWith(uid);
};

SessionStore.currentUser = function () {
  return $.extend({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.friendsWith = function () {
  var ids = [].slice.call(arguments);
  for (var i = 0; i < _currentUser.friends.length; i++) {
    for (var j = 0; j < ids.length; j++) {
      if (_currentUser.friends[i] === ids[j]) {
        return true;
      }
    }
  }
  return false;
};

SessionStore.fullName = function () {
  if (Object.keys(_currentUser).length > 0) {
    return _currentUser.first_name + ' ' + _currentUser.last_name;
  } else {
    return '';
  }
};

SessionStore.isMadeRequest = function (req) {
  return _currentUser.id === req.maker_id;
};

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

SessionStore.login = function (currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
};

SessionStore.logout = function () {
  _currentUser = {};
};

SessionStore.taggedIn = function (post) {
  for (var i = 0; i < post.taggedFriends.length; i++) {
    if (_currentUser.id === post.taggedFriends[i].taggedId) {
      return true;
    }
  }
  return false;
};

SessionStore.unfriend = function (id) {
  for (var i = 0; i < _currentUser.friends.length; i++) {
    if (_currentUser.friends[i] === id) {
      return _currentUser.friends.splice(i, 1);
    }
  }
};

module.exports = SessionStore;
