var Dispatcher = require('../dispatcher/dispatcher'),
    commentConstants = require('../constants/comment_constants'),
    friendConstants = require('../constants/friend_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    notificationConstants = require('../constants/notification_constants'),
    postConstants = require('../constants/post_constants'),
    searchConstants = require('../constants/search_constants'),
    tagConstants = require('../constants/tag_constants'),
    userConstants = require('../constants/user_constants');

var ServerActions = {
  receiveAcceptedMadeFriendRequest: function (request) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.MADE_FRIEND_REQUEST_ACCEPTED,
      userId: request.receiver_id
    });
  },
  receiveCheckedRequestIds: function (checked_ids) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.CHECKED_FRIEND_REQUEST_IDS_RECEIVED,
      checked_ids: checked_ids
    });
  },
  receiveComment: function (comment) {
    Dispatcher.dispatch({
      actionType: commentConstants.COMMENT_RECEIVED,
      comment: comment
    });
  },
  receiveComments: function (comments) {
    if (comments.length < 1) { return; }
    Dispatcher.dispatch({
      actionType: commentConstants.COMMENTS_RECEIVED,
      comments: comments
    });
  },
  receiveDeletedFriendship: function (friendship) {
    Dispatcher.dispatch({
      actionType: friendshipConstants.UNFRIENDED,
      friend_id: parseInt(friendship.user_id)
    });
  },
  receiveDeletedPost: function (post) {
    Dispatcher.dispatch({
      actionType: postConstants.DELETED_POST_RECEIVED,
      post: post
    });
  },
  receiveFriendRequestCancelation: function () {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.MADE_FRIEND_REQUEST_CANCELED
    });
  },
  receiveFriendRequestResponse: function (response) {
    var actionType;
    if (response['accept']) {
      actionType = friendRequestConstants.RECEIVED_FRIEND_REQUEST_ACCEPTED;
    } else if (response['reject']) {
      actionType = friendRequestConstants.RECEIVED_FRIEND_REQUEST_REJECTED;
    }

    Dispatcher.dispatch({
      actionType: actionType,
      response: response
    });
  },
  receiveFriendRequests: function (requests) {
    console.log(requests);
    Dispatcher.dispatch({
      actionType: friendRequestConstants.FRIEND_REQUESTS_RECEIVED,
      requests: requests
    });
  },
  receiveFriendsForTagging: function (friends) {
    Dispatcher.dispatch({
      actionType: tagConstants.FRIENDS_RECEIVED_FOR_TAGGING,
      friends: friends
    });
  },
  receiveMadeFriendRequest: function (response) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.MADE_FRIEND_REQUEST_RECEIVED,
      response: response
    });
  },
  receiveMostRecentlyAddedFriends: function (friendsData) {
    Dispatcher.dispatch({
      actionType: friendConstants.MOST_RECENTLY_ADDED_FRIENDS_RECEIVED,
      friends: friendsData.friends,
      profileOwnerId: friendsData.profileOwnerId
    });
  },
  receiveNotifications: function (notifications) {
    Dispatcher.dispatch({
      actionType: notificationConstants.NOTIFICATIONS_RECEIVED,
      notifications: notifications
    });
  },
  receiveOwnPost: function (post) {
    Dispatcher.dispatch({
      actionType: postConstants.OWN_POST_RECEIVED,
      post: post
    });
  },
  receiveReceivedFriendRequest: function (request) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.RECEIVED_FRIEND_REQUEST_RECEIVED,
      request: request
    });
  },
  receiveTimelinePosts: function (opts) {
    Dispatcher.dispatch({
      actionType: postConstants.POSTS_RECEIVED,
      posts: opts.posts,
      userId: opts.userId
    });
  },
  receiveSearchResults: function (searchResults) {
    Dispatcher.dispatch({
      actionType: searchConstants.SEARCH_RESULTS_RECEIVED,
      searchResults: searchResults
    });
  },
  receiveTaggedFriends: function (friends) {
    Dispatcher.dispatch({
      actionType: postConstants.TAGGED_FRIENDS_RECEIVED,
      friends: friends
    });
  },
  receiveTagSearchResults: function (searchResults) {
    Dispatcher.dispatch({
      actionType: tagConstants.TAG_SEARCH_RESULTS_RECEIVED,
      searchResults: searchResults
    });
  },
  receiveUpdatedCoverPhotoUrl: function (coverPhotoUrl) {
    Dispatcher.dispatch({
      actionType: userConstants.UPDATED_COVER_PHOTO_URL_RECEIVED,
      coverPhotoUrl: coverPhotoUrl
    });
  },
  receiveUpdatedPost: function (post) {
    Dispatcher.dispatch({
      actionType: postConstants.UPDATED_POST_RECEIVED,
      post: post
    });
  },
  receiveUpdatedProfilePicUrl: function (profilePicUrl) {
    Dispatcher.dispatch({
      actionType: userConstants.UPDATED_PROFILE_PIC_URL_RECEIVED,
      profilePicUrl: profilePicUrl
    });
  },
  receiveUsers: function (users) {
    Dispatcher.dispatch({
      actionType: userConstants.USERS_RECEIVED,
      users: users
    });
  },
  receiveUser: function (user) {
    Dispatcher.dispatch({
      actionType: userConstants.USER_RECEIVED,
      user: user
    });
  }
};

module.exports = ServerActions;
