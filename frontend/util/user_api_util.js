var SessionActions = require('../actions/session_actions');

var UserApiUtil = {
  signUp: function (user) {
    $.ajax({
      url: 'api/user',
      method: 'POST',
      dataType: 'json',
      data: {user: user},
      success: function (user) {
        SessionActions.removeCurrentUser(user);
      },
      error: function (errors) {
        debugger
        ErrorActions.clearErrors();
        ErrorActions.setErrors(error);
      }
    });
  }
};

module.exports = UserApiUtil;
