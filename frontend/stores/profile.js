var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    profileConstants = require('../constants/profile_constants');

var _profile = {
  description: '',
  company: '',
  position: '',
  school: '',
  major: '',
  location: '',
  hometown: '',
  coverPhotoUrl: '',
  profilePicUrl: ''
};
_profileIsFetched = false;

var ProfileStore = new Store(AppDispatcher);

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case profileConstants.PROFILE_RECEIVED:
    console.log('ProfileStore, PROFILE_RECEIVED');
      _profileIsFetched = true;
      _profile = payload.profile;
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

ProfileStore.coverPhotoUrl = function () { return _profile.coverPhotoUrl; };

ProfileStore.profilePicUrl = function () { return _profile.profilePicUrl; };

ProfileStore.profileIsFetched = function () { return _profileIsFetched; };

window.ProfileStore = ProfileStore;
module.exports = ProfileStore;
