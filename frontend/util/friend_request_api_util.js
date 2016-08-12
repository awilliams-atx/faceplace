var ServerActions = require('../actions/server_actions');

var FriendRequestApiUtil = {
  cancelRequest: function (userId, response) {
    $.ajax({
      url: 'api/friend_request',
      method: 'DELETE',
      dataType: 'json',
      data: {friend_request: {receiver_id: userId, response: response}},
      success: function () {
        ServerActions.receiveFriendRequestCancelation();
      }
    });
  },
  fetchFriendRequests: function () {
    $.ajax({
      url: 'api/friend_requests',
      method: 'GET',
      dataType: 'json',
      success: function (friendRequests) {
        ServerActions.receiveFriendRequests(friendRequests);
      }
    });
  },
  makeFriendRequest: function (userId) {
    $.ajax({
      url: 'api/friend_requests',
      method: 'POST',
      dataType: 'json',
      data: {request_receiver_id: userId},
      success: function (friendRequest) {
        ServerActions.receiveFriendRequest(friendRequest);
      }
    });
  },
  respondToFriendRequest: function (userId, response) {
    $.ajax({
      url: 'api/friend_request',
      method: 'DELETE',
      dataType: 'json',
      data: {friend_request: {maker_id: userId, response: response}},
      success: function (friendRequestResponse) {
        ServerActions.receiveFriendRequestResponse(friendRequestResponse);
      }
    });
  }
};

module.exports = FriendRequestApiUtil;
