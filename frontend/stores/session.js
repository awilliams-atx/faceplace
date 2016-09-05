var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    sessionConstants = require('../constants/session_constants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;

var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case sessionConstants.RECEIVE_CURRENT_USER:
      SessionStore.login(payload.user);
      SessionStore.__emitChange();
      break;
    case sessionConstants.LOGOUT:
      SessionStore.logout();
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.authorizedToCommentOn = function (post) {
  var profileOwnerId = post.profileOwner ? post.profileOwner.id : undefined;
  return SessionStore.friendsWith(post.authorId, profileOwnerId) ||
    _currentUser.id === post.authorId;
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

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

SessionStore.login = function (currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
};

SessionStore.logout = function () {
  Object.keys(_currentUser).forEach(function (key) {
    _currentUser[key] = undefined;
  });
};

module.exports = SessionStore;
