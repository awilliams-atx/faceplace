var ServerActions = require('../actions/server_actions');

var FriendRequestApiUtil = {
  makeFriendRequest: function (userId) {
    $.ajax({
      url: 'api/friend_requests',
      method: 'POST',
      dataType: 'json',
      data: {request_receiver_id: userId},
      success: function (friendRequest) {
        ServerActions.receiveFriendRequest(friendRequest);
      },
      error: function (errors) {
        console.log('FriendRequestApiUtil#makeFriendRequest ERROR');
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
      },
      error: function (errors) {
        console.log('FriendRequestApiUtil#respondToFriendRequest ERROR');
      }
    });
  },
  cancelRequest: function (userId, response) {
    $.ajax({
      url: 'api/friend_request',
      method: 'DELETE',
      dataType: 'json',
      data: {friend_request: {receiver_id: userId, response: response}},
      success: function () {
        ServerActions.receiveFriendRequestCancelation();
      },
      error: function (errors) {
        console.log('FriendRequestApiUtil#respondToFriendRequest ERROR');
      }
    });
  }
};

module.exports = FriendRequestApiUtil;
