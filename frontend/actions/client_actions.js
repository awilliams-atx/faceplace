var Dispatcher = require('../dispatcher/dispatcher'),
    UserApiUtil = require('../util/user_api_util');

var ClientActions = {
  fetchUsers: function () {
    UserApiUtil.fetchUsers();
  },
  fetchUser: function (id) {
    UserApiUtil.fetchUser(id);
  }
};

module.exports = ClientActions;
