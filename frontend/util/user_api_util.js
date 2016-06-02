var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions');

var UserApiUtil = {
  signUp: function (user) {
    console.log('UserApiUtil#signUp');
    $.ajax({
      url: 'api/user',
      method: 'POST',
      dataType: 'json',
      data: {user: user},
      success: function (user) {
        console.log('UserApiUtil#signUp success');
        SessionActions.receiveCurrentUser(user);
      },
      error: function (errors) {
        console.log("UserApiUtil#signUp error");
        ErrorActions.clearErrors();
        ErrorActions.setErrors(errors.responseJSON);
      }
    });
  }
};

module.exports = UserApiUtil;
