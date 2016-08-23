var ErrorActions = require('../actions/error_actions'),
    ServerActions = require('../actions/server_actions');

var UserApiUtil = {
  fetchUser: function (id) {
    $.ajax({
      url: 'api/users/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        ServerActions.receiveUser(user);
      }
    });
  },
  submitProfile: function (profile, cb) {
    $.ajax({
      url: 'api/user',
      method: 'PATCH',
      dataType: 'json',
      data: { profile: profile },
      success: function (profile) {
        ServerActions.receiveProfile(profile);
        cb && cb();
      }
    });
  },
  signUp: function (user, redirectCB) {
    $.ajax({
      url: 'api/user',
      method: 'POST',
      dataType: 'json',
      data: {user: user},
      success: function (user) {
        SessionActions.receiveCurrentUser(user);
        redirectCB();
      },
      error: function (errors) {
        ErrorActions.clearErrors('signUp');
        ErrorActions.setErrors(errors.responseJSON, 'signUp');
      }
    });
  },
  submitCoverPhoto: function (formData) {
    $.ajax({
      url: 'api/user/cover_photo',
      method: 'POST',
      dataType: 'json',
      data: formData,
      contentType: false,
      processData: false,
      success: function (coverPhotoData) {
        ServerActions.receiveCoverPhotoUrl(coverPhotoData.coverPhotoUrl);
      }
    });
  },
  submitProfilePic: function (formData) {
    $.ajax({
      url: 'api/user/profile_pic',
      method: 'POST',
      dataType: 'json',
      data: formData,
      contentType: false,
      processData: false,
      success: function (profilePicData) {
        ServerActions.receiveProfilePicUrl(profilePicData.profilePicUrl);
      }
    });
  }
};

module.exports = UserApiUtil;
