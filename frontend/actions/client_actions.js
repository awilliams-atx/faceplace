var Dispatcher = require('../dispatcher/dispatcher'),
    FriendApiUtil = require('../util/friend_api_util'),
    FriendshipApiUtil = require('../util/friendship_api_util'),
    FriendRequestApiUtil = require('../util/friend_request_api_util'),
    PostApiUtil = require('../util/post_api_util'),
    ProfileApiUtil = require('../util/profile_api_util'),
    SearchApiUtil = require('../util/search_api_util'),
    UserApiUtil = require('../util/user_api_util');

var ClientActions = {
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
  fetchMostRecentlyAddedFriends: function (userId) {
    FriendApiUtil.fetchMostRecentlyAddedFriends(userId);
  },
  fetchProfile: function (userId) {
    ProfileApiUtil.fetchProfile(userId);
  },
  fetchSearchResults: function () {
    SearchApiUtil.fetchSearchResults();
  },
  fetchUser: function (id) {
    UserApiUtil.fetchUser(id);
  },
  fetchUsers: function () {
    UserApiUtil.fetchUsers();
  },
  fetchProfilePosts: function (profileOwnerId) {
    UserApiUtil.fetchProfilePosts(profileOwnerId);
  },
  submitPost: function (post) {
    PostApiUtil.submitPost(post);
  }
};

module.exports = ClientActions;
