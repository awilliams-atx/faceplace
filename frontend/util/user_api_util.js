var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    SessionApiUtil = require('./session_api_util'),
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
  fetchUsers: function () {
    $.ajax({
      url: 'api/users',
      method: 'GET',
      dataType: 'json',
      success: function (users) {
        ServerActions.receiveUsers(users);
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
        ServerActions
          .receiveUpdatedCoverPhotoUrl(coverPhotoData.coverPhotoUrl);
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
        ServerActions
          .receiveUpdatedProfilePicUrl(profilePicData.profilePicUrl);
      }
    });
  }
};

module.exports = UserApiUtil;
