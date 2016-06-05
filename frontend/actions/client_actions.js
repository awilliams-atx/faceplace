var Dispatcher = require('../dispatcher/dispatcher'),
    UserApiUtil = require('../util/user_api_util'),
    FriendRequestApiUtil = require('../util/friend_request_api_util'),
    FriendshipApiUtil = require('../util/friendship_api_util');

var ClientActions = {
  fetchUsers: function () {
    UserApiUtil.fetchUsers();
  },
  fetchUser: function (id) {
    UserApiUtil.fetchUser(id);
  },
  makeFriendRequest: function (userId) {
    FriendRequestApiUtil.makeFriendRequest(userId);
  },
  respondToFriendRequest: function (userId, response) {
    console.log('ClientActions response: ' + response);
    FriendRequestApiUtil.respondToFriendRequest(userId, response);
  },
  cancelFriendRequest: function (userId) {
    FriendRequestApiUtil.cancelRequest(userId, 'cancel');
  },
  unfriend: function (userId) {
    FriendshipApiUtil.destroyFriendship(userId);
  }
};

module.exports = ClientActions;
