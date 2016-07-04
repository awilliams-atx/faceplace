var Dispatcher = require('../dispatcher/dispatcher'),
    modalConstants = require('../constants/modal_constants'),
    CommentApiUtil = require('../util/comment_api_util'),
    postConstants = require('../constants/post_constants'),
    tagConstants = require('../constants/tag_constants'),
    FriendApiUtil = require('../util/friend_api_util'),
    FriendshipApiUtil = require('../util/friendship_api_util'),
    FriendRequestApiUtil = require('../util/friend_request_api_util'),
    PostApiUtil = require('../util/post_api_util'),
    ProfileApiUtil = require('../util/profile_api_util'),
    SearchApiUtil = require('../util/search_api_util'),
    TagApiUtil = require('../util/tag_api_util'),
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
  cancelModal: function () {
    Dispatcher.dispatch({
      actionType: modalConstants.MODAL_CANCELED
    });
  },
  deletePost: function (postId) {
    PostApiUtil.deletePost(postId);
  },
  editPost: function () {
    Dispatcher.dispatch({
      actionType: postConstants.EDITING_POST
    })
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
  fetchTaggedFriends: function (postId) {
    PostApiUtil.fetchTaggedFriends(postId);
  },
  fetchTagSearchResults: function (searchString) {
    TagApiUtil.fetchSearchResults(searchString);
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
  finishEditingPost: function () {
    Dispatcher.dispatch({
      actionType: postConstants.EDITING_FINISHED
    });
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
  submitComment: function (comment) {
    CommentApiUtil.submitComment(comment);
  },
  submitPost: function (post) {
    var submissionPost = {
      body: post.body,
      profile_owner_id: post.profileOwnerId,
      tagged_ids: post.taggedFriendIds
    };

    PostApiUtil.submitPost(submissionPost);
  },
  triggerModal: function (modalContent) {
    Dispatcher.dispatch({
      actionType: modalConstants.MODAL_TRIGGERED,
      modalContent: modalContent
    });
  },
  unfriend: function (userId) {
    FriendshipApiUtil.destroyFriendship(userId);
  },
  updatePost: function (post) {
    var submissionPost = {
      id: post.id,
      body: post.body,
      tagged_ids: post.taggedFriendIds
    };
    PostApiUtil.updatePost(submissionPost);
  }
};

module.exports = ClientActions;
