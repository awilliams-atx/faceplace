var Dispatcher = require('../dispatcher/dispatcher'),
    commentConstants = require('../constants/comment_constants'),
    friendConstants = require('../constants/friend_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    notificationConstants = require('../constants/notification_constants'),
    postConstants = require('../constants/post_constants'),
    searchConstants = require('../constants/search_constants'),
    sessionConstants = require('../constants/session_constants'),
    tagConstants = require('../constants/tag_constants'),
    userConstants = require('../constants/user_constants');

var ServerActions = {
  receiveAcceptedFriendRequest: function (request) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.RECEIVED_FRIEND_REQUEST_ACCEPTED,
      request: request
    });
  },
  receiveCheckedNotificationIds: function (checked_ids) {
    Dispatcher.dispatch({
      actionType: notificationConstants.CHECKED_NOTIFICATION_IDS_RECEIVED,
      checked_ids: checked_ids
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
  receiveCurrentUser: function (user) {
    Dispatcher.dispatch({
      actionType: sessionConstants.RECEIVE_CURRENT_USER,
      user: user
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
  receiveMadeFriendRequest: function (request) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.MADE_FRIEND_REQUEST_RECEIVED,
      request: request
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
  receiveProfile: function (profile) {
    Dispatcher.dispatch({
      actionType: userConstants.PROFILE_RECEIVED,
      profile: profile
    });
  },
  receiveReadNotificationId: function (id) {
    Dispatcher.dispatch({
      actionType: notificationConstants.READ_NOTIFICATION_ID_RECEIVED,
      id: id
    });
  },
  receiveReceivedFriendRequest: function (request) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.RECEIVED_FRIEND_REQUEST_RECEIVED,
      request: request
    });
  },
  receiveRejectedFriendRequest: function (request) {
    // console.log('store is looking for a maker_id here');
    // console.log(request);
    Dispatcher.dispatch({
      actionType: friendRequestConstants.RECEIVED_FRIEND_REQUEST_REJECTED,
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
  receiveCoverPhotoUrl: function (coverPhotoUrl) {
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
  receiveProfilePicUrl: function (profilePicUrl) {
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
  },
  removeCurrentUser: function () {
    Dispatcher.dispatch({
      actionType: sessionConstants.LOGOUT
    });
  },
};

module.exports = ServerActions;
