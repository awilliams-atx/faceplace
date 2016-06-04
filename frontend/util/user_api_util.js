var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    SessionApiUtil = require('./session_api_util'),
    ServerActions = require('../actions/server_actions');

var UserApiUtil = {
  signUp: function (user, redirectCB) {
    console.log('UserApiUtil#signUp');
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
  fetchUsers: function () {
    $.ajax({
      url: 'api/users',
      method: 'GET',
      dataType: 'json',
      success: function (users) {
        console.log('UserApiUtil#fetchUsers SUCCESS');
        ServerActions.receiveUsers(users);
      },
      error: function (errors) {
        console.log('UserApiUtil#fetchUsers ERROR');
      }
    });
  },
  fetchUser: function (id) {
    $.ajax({
      url: 'api/users/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        console.log('UserApiUtil#fetchUser SUCCESS');
        ServerActions.receiveUser(user);
      },
      error: function (errors) {
        console.log('UserApiUtil#fetchUser ERROR');
      }
    });
  }
};

module.exports = UserApiUtil;
