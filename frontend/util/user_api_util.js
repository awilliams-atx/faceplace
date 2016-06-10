var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    SessionApiUtil = require('./session_api_util'),
    ServerActions = require('../actions/server_actions');

var UserApiUtil = {
  fetchUsers: function () {
    $.ajax({
      url: 'api/users',
      method: 'GET',
      dataType: 'json',
      success: function (users) {
        ServerActions.receiveUsers(users);
      },
      error: function (errors) {
      }
    });
  },
  fetchUser: function (id) {
    // NOPE
    $.ajax({
      url: 'api/users/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        ServerActions.receiveUser(user);
      },
      error: function (errors) {
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
        ErrorActions.clearErrors();
        ErrorActions.setErrors(errors.responseJSON);
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
        ServerActions.receiveUpdatedCoverPhotoUrl(coverPhotoData.coverPhotoUrl);
      }
    });
  }
};

module.exports = UserApiUtil;
