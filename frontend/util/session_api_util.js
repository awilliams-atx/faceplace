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
        console.log("SessionApiUtil#login SUCCESS");
        SessionActions.receiveCurrentUser(user);
        cb();
      },
      error: function (errors) {
        console.log("SessionApiUtil#login ERROR");
        ErrorActions.clearErrors();
        ErrorActions.setErrors(error);
      }
    });
  },
  logout: function () {
    $.ajax({
      url: 'api/session',
      method: 'DELETE',
      dataType: 'json',
      success: function () {
        console.log('SessionApiUtil#logout SUCCESS');
        SessionActions.removeCurrentUser();
      },
      error: function (errors) {
        ErrorActions.clearErrors();
        ErrorActions.setErrors(error);
      }
    });
  },
  fetchCurrentUser: function (cb) {
    $.ajax({
      url: 'api/session',
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        console.log('SessionApiUtil#fetchCurrentUser SUCCESS');
        SessionActions.receiveCurrentUser(user);
      },
      error: function (errors) {
        ErrorActions.clearErrors();
        ErrorActions.setErrors(error);
      },
      complete: function () {
        cb();
      }
    });
  }
};

module.exports = SessionApiUtil;
