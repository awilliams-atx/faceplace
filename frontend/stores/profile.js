var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    profileConstants = require('../constants/profile_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants');

var _profile = {};

var ProfileStore = new Store(AppDispatcher);

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case friendRequestConstants.MADE_FRIEND_REQUEST_CANCELED:
    _profile.requestMade = false;
    ProfileStore.__emitChange();
    break;
  case friendRequestConstants.MADE_FRIEND_REQUEST_RECEIVED:
    _profile.requestMade = true;
    ProfileStore.__emitChange();
    break;
  case profileConstants.PROFILE_RECEIVED:
    _profileFetched = true;
    _profile = payload.profile;
    ProfileStore.__emitChange();
    break;
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_ACCEPTED:
    _profile.requestReceived = false;
    _profile.alreadyFriends = true;
    ProfileStore.__emitChange();
    break;
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_REJECTED:
    _profile.requestReceived = false;
    ProfileStore.__emitChange();
    break;
  case friendshipConstants.UNFRIENDED:
    _profile.alreadyFriends = false;
    ProfileStore.__emitChange();
  }
};

ProfileStore.profile = function () {
  return Object.assign({}, _profile);
};

ProfileStore.getFriended = function () {
  _profile.alreadyFriends = true;
  _profile.requestMade = false;
  _profile.requestReceived = false;
}

ProfileStore.profileFetched = function (id) {
  return _profile.userId === id;
};

module.exports = ProfileStore;
