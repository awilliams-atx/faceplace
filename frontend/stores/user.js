var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    userConstants = require('../constants/user_constants');

var _user = {};

var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case userConstants.USER_RECEIVED:
      _user = payload.user;
      UserStore.__emitChange();
      break;
    case friendshipConstants.FRIENDSHIP_DESTROYED:
      _user.isFriendsWithCurrentUser = false;
      UserStore.__emitChange();
      break;
    case friendRequestConstants.FRIEND_REQUEST_ACCEPTED:
      _user.isFriendsWithCurrentUser = true;
      UserStore.__emitChange();
      break;
  }
};

UserStore.user = function () {
  return $.extend({}, _user);
};

module.exports = UserStore;
