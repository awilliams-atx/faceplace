var Dispatcher = require('../dispatcher/dispatcher'),
    tagConstants = require('../constants/tag_constants'),
    FriendApiUtil = require('../util/friend_api_util'),
    FriendshipApiUtil = require('../util/friendship_api_util'),
    FriendRequestApiUtil = require('../util/friend_request_api_util'),
    PostApiUtil = require('../util/post_api_util'),
    ProfileApiUtil = require('../util/profile_api_util'),
    SearchApiUtil = require('../util/search_api_util'),
    UserApiUtil = require('../util/user_api_util');

var ClientActions = {
  addTaggedFriend: function (userId) {
    Dispatcher.dispatch({
      actionType: tagConstants.FRIEND_TAGGED,
      userId: userId
    });
  },
  cancelFriendRequest: function (userId) {
    FriendRequestApiUtil.cancelRequest(userId, 'cancel');
  },
  fetchMostRecentlyAddedFriends: function (userId) {
    FriendApiUtil.fetchMostRecentlyAddedFriends(userId);
  },
  fetchProfile: function (userId) {
    ProfileApiUtil.fetchProfile(userId);
  },
  fetchProfilePosts: function (profileOwnerId) {
    UserApiUtil.fetchProfilePosts(profileOwnerId);
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
  makeFriendRequest: function (userId) {
    FriendRequestApiUtil.makeFriendRequest(userId);
  },
  removeTaggedFriend: function (userId) {
    Dispatcher.dispatch({
      actionType: tagConstants.FRIEND_UNTAGGED,
      userid: userId
    });
  },
  respondToFriendRequest: function (userId, response) {
    FriendRequestApiUtil.respondToFriendRequest(userId, response);
  },
  submitPost: function (post) {
    PostApiUtil.submitPost(post);
  },
  unfriend: function (userId) {
    FriendshipApiUtil.destroyFriendship(userId);
  }
};

module.exports = ClientActions;
