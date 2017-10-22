var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    userConstants = require('../constants/user_constants');

var _user = {};
var _userFetched = false;

var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case userConstants.CLEAR_USER:
    _user = {};
    break; // Not meant to emit change.
  case friendRequestConstants.MADE_FRIEND_REQUEST_CANCELED:
    _user.requestMade = false;
    UserStore.__emitChange();
    break;
  case friendRequestConstants.MADE_FRIEND_REQUEST_RECEIVED:
    _user.requestMade = true;
    UserStore.__emitChange();
    break;
  case userConstants.PROFILE_RECEIVED:
    _userFetched = true;
    _user = payload.profile;
    UserStore.__emitChange();
    break;
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_ACCEPTED:
    if (payload.request.maker_id === _user.userId) {
      _user.requestReceived = false;
      _user.alreadyFriends = true;
      UserStore.__emitChange();
    }
    break;
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_REJECTED:
    if (payload.request.maker_id === _user.userId) {
      _user.requestReceived = false;
      UserStore.__emitChange();
    }
    break;
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
  case friendshipConstants.UNFRIENDED:
    _user.alreadyFriends = false;
    UserStore.__emitChange();
  }
};

UserStore.user = function () {
  return Object.assign({}, _user);
};

UserStore.getFriended = function () {
  _user.alreadyFriends = true;
  _user.requestMade = false;
  _user.requestReceived = false;
}

UserStore.profileFetched = function (id) {
  return _user.userId === id;
};

module.exports = UserStore;
