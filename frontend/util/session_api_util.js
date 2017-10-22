var ErrorActions = require('../actions/error_actions'),
    ErrorStore = require('../stores/error'),
    ServerActions = require('../actions/server_actions');

var SessionApiUtil = {
  login: function (credentials, cb) {
    $.ajax({
      url: '/api/session',
      method: 'POST',
      dataType: 'json',
      data: {user: credentials},
      success: function (user) {
        ServerActions.receiveCurrentUser(user);
        cb();
      },
      error: function (errors) {
        ErrorActions.setErrors(errors.responseJSON, 'login');
      }
    });
  },
  logout: function (cb) {
    $.ajax({
      url: '/api/session',
      method: 'DELETE',
      dataType: 'json',
      success: function () {
        ServerActions.removeCurrentUser();
        cb();
      }
    });
  },
  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/session',
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        ServerActions.receiveCurrentUser(user);
      },
      complete: function () {
        cb();
      }
    });
  }
};

module.exports = SessionApiUtil;
