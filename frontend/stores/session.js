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

SessionStore.currentUser = function () {
  return $.extend({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
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
