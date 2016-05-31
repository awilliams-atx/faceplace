var UserApiUtil = {
  signUp: function (user) {
    $.ajax({
      url: 'api/user',
      method: 'POST',
      dataType: 'json',
      data: {user: user},
      success: function (user) {
        debugger
      },
      error: function (error) {
        console.log('UserApiUtil#signUp error: ' + error);
      }
    });
  }
};

module.exports = UserApiUtil;
