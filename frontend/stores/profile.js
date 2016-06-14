var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    profileConstants = require('../constants/profile_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants');

var _profile = {
  id: '',
  description: '',
  position: '',
  company: '',
  major: '',
  school: '',
  location: '',
  hometown: '',
  coverPhotoUrl: '',
  profilePicUrl: '',
  requestPending: null,
  alreadyFriends: null
};

var ProfileStore = new Store(AppDispatcher);

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case profileConstants.PROFILE_RECEIVED:
      _profileFetched = true;
      _profile = payload.profile;
      ProfileStore.__emitChange();
      break;
    case friendRequestConstants.MADE_FRIEND_REQUEST_RECEIVED:
      _profile.requestReceived = true;
      ProfileStore.__emitChange();
      break;
    case friendRequestConstants.FRIEND_REQUEST_ACCEPTED:
      _profile.requestMade = false;
      _profile.alreadyFriends = true;
      ProfileStore.__emitChange();
      break;
    case friendRequestConstants.FRIEND_REQUEST_REJECTED:
      _profile.requestMade = false;
      ProfileStore.__emitChange();
      break;
    case friendRequestConstants.FRIEND_REQUEST_CANCELED:
      _profile.requestReceived = false;
      ProfileStore.__emitChange();
      break;
    case friendshipConstants.FRIENDSHIP_DESTROYED:
      _profile.alreadyFriends = false;
      ProfileStore.__emitChange();
      break;
  }
};

ProfileStore.profile = function () {
  return $.extend({}, _profile);
};

ProfileStore.description = function () { return _profile.description; };

ProfileStore.company = function () { return _profile.company; };

ProfileStore.position = function () { return _profile.position; };

ProfileStore.school = function () { return _profile.school; };

ProfileStore.major = function () { return _profile.major; };

ProfileStore.location = function () { return _profile.location; };

ProfileStore.hometown = function () { return _profile.hometown; };

ProfileStore.alreadyFriends = function () { return _profile.alreadyFriends; };

ProfileStore.requestMade = function () { return _profile.requestMade; };

ProfileStore.requestReceived = function () { return _profile.requestReceived; };

ProfileStore.coverPhotoUrl = function () { return _profile.coverPhotoUrl; };

ProfileStore.profilePicUrl = function () { return _profile.profilePicUrl; };

ProfileStore.profileFetched = function (id) {
  return _profile.userId === id;
};

module.exports = ProfileStore;
