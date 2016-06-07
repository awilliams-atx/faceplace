var Dispatcher = require('../dispatcher/dispatcher'),
    UserApiUtil = require('../util/user_api_util'),
    FriendRequestApiUtil = require('../util/friend_request_api_util'),
    FriendshipApiUtil = require('../util/friendship_api_util'),
    FriendApiUtil = require('../util/friend_api_util'),
    SearchApiUtil = require('../util/search_api_util'),
    ProfileApiUtil = require('../util/profile_api_util');

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
    FriendRequestApiUtil.respondToFriendRequest(userId, response);
  },
  cancelFriendRequest: function (userId) {
    FriendRequestApiUtil.cancelRequest(userId, 'cancel');
  },
  unfriend: function (userId) {
    FriendshipApiUtil.destroyFriendship(userId);
  },
  fetchSearchResults: function () {
    SearchApiUtil.fetchSearchResults();
  },
  fetchMostRecentlyAddedFriends: function (userId) {
    FriendApiUtil.fetchMostRecentlyAddedFriends(userId);
  },
  fetchProfile: function (userId) {
    ProfileApiUtil.fetchProfile(userId);
  }
};

module.exports = ClientActions;
