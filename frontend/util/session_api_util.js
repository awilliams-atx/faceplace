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
      error: function (error) {
        console.log(error);
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
      error: function (error) {
        console.log(error);
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
      error: function (error) {
        console.log(error);
      }
    });
  }
};

window.SessionApiUtil = SessionApiUtil;
module.exports = SessionApiUtil;
