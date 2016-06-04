var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    userConstants = require('../constants/user_constants');

var _users = {};

var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case userConstants.USERS_RECEIVED:
    console.log('UserStore, USERS_RECEIVED');
      _users = payload.users;
      UserStore.__emitChange();
      break;
    case userConstants.USER_RECIEVED:
      console.log('UserStore, USER_RECEIVED');
      _users[payload.user.id] = payload.user;
      UserStore.__emitChange();
      break;
  }
};

UserStore.all = function () {
  return Object.keys(_users).map(function (id) {
    return _users[id];
  });
};



window.UserStore = UserStore;
module.exports = UserStore;
