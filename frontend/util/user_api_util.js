var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    SessionApiUtil = require('./session_api_util'),
    ServerActions = require('../actions/server_actions');

var UserApiUtil = {
  fetchProfilePosts: function (userId) {
    $.ajax({
      url: 'api/users/' + userId + '/posts',
      method: 'GET',
      dataType: 'json',
      data: {profilePosts: true},
      success: function (posts) {
        ServerActions.receiveProfilePosts({
          userId: userId,
          posts: posts
        });
      },
      error: function (errors) {
        console.log('UserApiUtil#fetchProfilePosts ERROR');
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
      },
      error: function (errors) {
      }
    });
  },
  fetchUser: function (id) {
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
  }
};

module.exports = UserApiUtil;
