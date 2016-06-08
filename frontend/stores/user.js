var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    userConstants = require('../constants/user_constants');

var _users = {};

var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case userConstants.USERS_RECEIVED:
      _users = payload.users;
      UserStore.__emitChange();
      break;
    case userConstants.USER_RECEIVED:
      _users[payload.user.userId] = payload.user;
      UserStore.__emitChange();
      break;
  }
};

UserStore.all = function () {
  return Object.keys(_users).map(function (userId) {
    return _users[userId];
  });
};

UserStore.find = function (userId) {
  if (!_users[userId]) {
    return {
      firstName: ''
    };
  }
  return _users[userId];
};

module.exports = UserStore;
