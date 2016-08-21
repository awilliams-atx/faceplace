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

ProfileStore.alreadyFriends = function () { return _profile.alreadyFriends; };

ProfileStore.company = function () { return _profile.company; };

ProfileStore.coverPhotoUrl = function () { return _profile.coverPhotoUrl; };

ProfileStore.getFriended = function () {
  _profile.alreadyFriends = true;
  _profile.requestMade = false;
  _profile.requestReceived = false;
}

ProfileStore.hometown = function () { return _profile.hometown; };

ProfileStore.location = function () { return _profile.location; };

ProfileStore.major = function () { return _profile.major; };

ProfileStore.position = function () { return _profile.position; };

ProfileStore.profileFetched = function (id) {
  return _profile.userId === id;
};

ProfileStore.profilePicUrl = function () { return _profile.profilePicUrl; };

ProfileStore.requestMade = function () { return _profile.requestMade; };

ProfileStore.requestReceived = function () { return _profile.requestReceived; };

ProfileStore.school = function () { return _profile.school; };

module.exports = ProfileStore;
