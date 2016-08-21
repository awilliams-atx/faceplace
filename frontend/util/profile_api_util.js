var ServerActions = require('../actions/server_actions');

var ProfileApiUtil = {
  fetchProfile: function (id) {
    $.ajax({
      url: 'api/users/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (profile) {
        ServerActions.receiveProfile(profile);
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
        ServerActions.receiveProfile(profile);
        cb && cb();
      }
    });
  }
};

module.exports = ProfileApiUtil;
