var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    UserActions = require('../actions/user_actions');

var ProfileApiUtil = {
  fetchProfile: function (id) {
    $.ajax({
      url: 'api/users/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (profile) {
        UserActions.receiveProfile(profile);
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
        UserActions.receiveProfile(profile);
        if (cb) { cb(); }
      },
      error: function (errors) {
      }
    });
  }
};

module.exports = ProfileApiUtil;
