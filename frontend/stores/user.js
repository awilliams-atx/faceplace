var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    userConstants = require('../constants/user_constants');

var _user = {};

var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case userConstants.UPDATED_COVER_PHOTO_URL_RECEIVED:
      _user.coverPhotoUrl = payload.coverPhotoUrl;
      UserStore.__emitChange();
      break;
    case userConstants.UPDATED_PROFILE_PIC_URL_RECEIVED:
      _user.profilePicUrl = payload.profilePicUrl;
      UserStore.__emitChange();
      break;
    case userConstants.USER_RECEIVED:
      _user = payload.user;
      UserStore.__emitChange();
      break;
    case friendshipConstants.FRIENDSHIP_DESTROYED:
      _user.isFriendOfCurrentUser = false;
      UserStore.__emitChange();
      break;
    case friendRequestConstants.FRIEND_REQUEST_ACCEPTED:
      _user.isFriendOfCurrentUser = true;
      UserStore.__emitChange();
      break;
  }
};

UserStore.user = function () {
  return $.extend({}, _user);
};

UserStore.authorizedToPost = function () {

};

module.exports = UserStore;
