var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    ProfileActions = require('../actions/profile_actions');

var ProfileApiUtil = {
  fetchProfile: function (id) {
    $.ajax({
      url: 'api/users/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (profile) {
        ProfileActions.receiveProfile(profile);
      },
      error: function (errors) {
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
        ProfileActions.receiveProfile(profile);
        if (cb) { cb(); }
      },
      error: function (errors) {
      }
    });
  }
};

module.exports = ProfileApiUtil;
