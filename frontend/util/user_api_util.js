var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    SessionApiUtil = require('./session_api_util');

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
  }
};

module.exports = UserApiUtil;
