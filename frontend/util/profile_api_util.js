var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    ProfileActions = require('../actions/profile_actions');

var ProfileApiUtil = {
  fetchProfile: function (id) {
    console.log('ProfileApiUtil#fetchProfile');
    $.ajax({
      url: 'api/users/' + id,
      method: 'GET',
      dataType: 'json',
      data: id,
      success: function (profile) {
        console.log('ProfileApiUtil#fetchProfile SUCCESS');
        ProfileActions.receiveProfile(profile);
      },
      error: function (errors) {
        console.log('ProfileApiUtil#fetchProfile ERROR');
      }
    });
  },
  setProfile: function (profile, cb) {
    $.ajax({
      url: 'api/user',
      method: 'PATCH',
      dataType: 'json',
      data: {profile: profile},
      success: function (profile) {
        console.log('ProfileApiUtil#setProfile SUCCESS');
        ProfileActions.receiveProfile(profile);
        if (cb) { cb(); }
      },
      error: function (errors) {
        console.log('ProfileApiUtil#setProfile ERROR');
      }
    });
  }
};

module.exports = ProfileApiUtil;
