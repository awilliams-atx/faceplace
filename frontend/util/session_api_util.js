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
        ErrorActions.clearErrors();
        ErrorActions.setErrors(errors.responseJSON);
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
      },
      error: function (errors) {
        ErrorActions.clearErrors();
        ErrorActions.setErrors(errors.responseJSON);
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
      error: function (errors) {
      },
      complete: function () {
        cb();
      }
    });
  }
};

window.SessionApiUtil = SessionApiUtil;
module.exports = SessionApiUtil;
