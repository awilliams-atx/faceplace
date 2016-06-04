var Dispatcher = require('../dispatcher/dispatcher'),
    UserApiUtil = require('../util/user_api_util');

var ClientActions = {
  fetchUsers: function () {
    UserApiUtil.fetchUsers();
  }
};

module.exports = ClientActions;
