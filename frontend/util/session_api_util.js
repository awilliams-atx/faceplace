var ErrorActions = require('../actions/error_actions'),
    ErrorStore = require('../stores/error'),
    SessionActions = require('../actions/session_actions');

SessionApiUtil = {
  login: function (credentials, cb) {
    $.ajax({
      url: 'api/session',
      method: 'POST',
      dataType: 'json',
      data: {user: credentials},
      success: function (user) {
        SessionActions.receiveCurrentUser(user);
        cb();
      },
      error: function (errors) {
        ErrorActions.setErrors(errors.responseJSON, 'login');
      }
    });
  },
  logout: function (cb) {
    $.ajax({
      url: 'api/session',
      method: 'DELETE',
      dataType: 'json',
      success: function () {
        SessionActions.removeCurrentUser();
        cb();
      }
    });
  },
  fetchCurrentUser: function (cb) {
    $.ajax({
      url: 'api/session',
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        SessionActions.receiveCurrentUser(user);
      },
      complete: function () {
        cb();
      }
    });
  }
};

module.exports = SessionApiUtil;
