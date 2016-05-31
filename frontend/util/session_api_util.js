var ErrorActions = require('../actions/error_actions');

SessionApiUtil = {
  login: function (credentials) {
    $.ajax({
      url: 'api/session',
      method: 'POST',
      dataType: 'json',
      data: {user: credentials},
      success: function (user) {
        debugger
      },
      error: function (errors) {
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
        debugger
      },
      error: function (errors) {
        ErrorActions.clearErrors();
        ErrorActions.setErrors(error);
      }
    });
  },
  fetchCurrentUser: function () {
    $.ajax({
      url: 'api/session',
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        debugger
      },
      error: function (errors) {
        ErrorActions.clearErrors();
        ErrorActions.setErrors(error);
      }
    });
  }
};

module.exports = SessionApiUtil;
