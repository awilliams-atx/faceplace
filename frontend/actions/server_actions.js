var Dispatcher = require('../dispatcher/dispatcher'),
    friendConstants = require('../constants/friend_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    postConstants = require('../constants/post_constants'),
    searchConstants = require('../constants/search_constants'),
    tagConstants = require('../constants/tag_constants'),
    userConstants = require('../constants/user_constants');

var ServerActions = {
  receiveDestroyedFriendship: function (friendship) {
    Dispatcher.dispatch({
      actionType: friendshipConstants.FRIENDSHIP_DESTROYED,
      profileOwnerId: parseInt(friendship.userId)
    });
  },
  receiveFriendRequest: function (response) {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.MADE_FRIEND_REQUEST_RECEIVED,
      response: response
    });
  },
  receiveFriendRequestCancelation: function () {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.FRIEND_REQUEST_CANCELED
    });
  },
  receiveFriendRequestResponse: function (friendRequestResponse) {
    var actionType;

    if (friendRequestResponse.response === 'accept') {
      actionType = friendRequestConstants.FRIEND_REQUEST_ACCEPTED;
    } else if (friendRequestResponse.response === 'reject') {
      actionType = friendRequestConstants.FRIEND_REQUEST_REJECTED;
    }

    Dispatcher.dispatch({
      actionType: actionType,
      userId: friendRequestResponse.userId
    });
  },
  receiveFriendsForTagging: function (friends) {
    Dispatcher.dispatch({
      actionType: tagConstants.FRIENDS_RECEIVED_FOR_TAGGING,
      friends: friends
    });
  },
  receiveMostRecentlyAddedFriends: function (friendsData) {
    Dispatcher.dispatch({
      actionType: friendConstants.MOST_RECENTLY_ADDED_FRIENDS_RECEIVED,
      friends: friendsData.friends,
      profileOwnerId: friendsData.profileOwnerId
    });
  },
  receiveOwnPost: function (post) {
    Dispatcher.dispatch({
      actionType: postConstants.OWN_POST_RECEIVED,
      post: post
    });
  },
  receiveProfilePosts: function (opts) {
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
  receiveUsers: function (users) {
    Dispatcher.dispatch({
      actionType: userConstants.USERS_RECEIVED,
      users: users
    });
  },
  receiveUser: function (user, cb) {
    Dispatcher.dispatch({
      actionType: userConstants.USER_RECEIVED,
      user: user
    });
  }
};

module.exports = ServerActions;
