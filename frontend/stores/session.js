var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    sessionConstants = require('../constants/session_constants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;

var SessionStore = new Store(AppDispatcher);

function _login(currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
}

function _logout() {
  _currentUser = {};
}

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case sessionConstants.RECEIVE_CURRENT_USER:
      console.log('SessionStore, RECEIVE_CURRENT_USER');
      _login(payload.user);
      SessionStore.__emitChange();
      break;
    case sessionConstants.LOGOUT:
      _logout();
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.current_user = function () {
  return $.extend({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

module.exports = SessionStore;
