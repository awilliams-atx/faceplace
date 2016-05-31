var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    userConstants = require('../constants/userConstants');

var _currentUser = {};
var _userHasBeenFetched = false;

var SessionStore = new Store(AppDispatcher);

SessionStore.isUserLoggedIn = function () {
  if (_currentUser.id) {
    return true;
  } else {
    return false;
  }
};

SessionStore.current_user = function () {
  if (_currentUser) {
    return _currentUser;
  }

  return null;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case userConstants.CURRENT_USER_RECEIVED:
      _currentUser = payload.user;
      SessionStore.__emitChange();
      break;
    case userConstants.CURRENT_USER_REMOVED:
      _currentUser = {};
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
