var Dispatcher = require('../dispatcher/dispatcher'),
    confirmationConstants = require('../constants/confirmation_constants'),
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
  deletePost: function (postId) {
    PostApiUtil.deletePost(postId);
  },
  fetchMostRecentlyAddedFriends: function (userId) {
    FriendApiUtil.fetchMostRecentlyAddedFriends(userId);
  },
  fetchProfile: function (userId) {
    ProfileApiUtil.fetchProfile(userId);
  },
  fetchSearchResults: function (searchString) {
    SearchApiUtil.fetchSearchResults(searchString);
  },
  fetchTimelinePosts: function (profileOwnerId) {
    PostApiUtil.fetchTimelinePosts(profileOwnerId);
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
      userId: userId
    });
  },
  respondToFriendRequest: function (userId, response) {
    FriendRequestApiUtil.respondToFriendRequest(userId, response);
  },
  submitPost: function (post) {
    submissionPost = {
      body: post.body,
      profile_owner_id: post.profileOwnerId,
      tagged_ids: post.taggedFriendIds
    };

    PostApiUtil.submitPost(submissionPost);
  },
  triggerConfirmation: function (opts) {
    Dispatcher.dispatch({
      actionType: confirmationConstants.CONFIRMATION_REQUESTED,
      confirmation: confirmation
    });
  },
  unfriend: function (userId) {
    FriendshipApiUtil.destroyFriendship(userId);
  }
};

module.exports = ClientActions;
