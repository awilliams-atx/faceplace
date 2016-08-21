var ServerActions = require('../actions/server_actions');

var FriendRequestApiUtil = {
  cancelRequest: function (cancellation) {
    $.ajax({
      url: 'api/friend_request',
      method: 'DELETE',
      dataType: 'json',
      data: { cancellation: cancellation },
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
      data: { receiver_id: userId },
      success: function (friendRequest) {
        ServerActions.receiveMadeFriendRequest(friendRequest);
      }
    });
  },
  markRequestsChecked: function (checkedIds) {
    $.ajax({
      url: 'api/friend_requests/mark_checked',
      method: 'POST',
      dataType: 'json',
      data: { checked_ids : JSON.stringify(checkedIds) },
      success: function (checked_ids) {
        ServerActions.receiveCheckedRequestIds(checked_ids);
      }
    })
  },
  respondToFriendRequest: function (response) {
    $.ajax({
      url: 'api/friend_request',
      method: 'DELETE',
      dataType: 'json',
      data: { response: response },
      success: function (friendRequestResponse) {
        ServerActions.receiveFriendRequestResponse(friendRequestResponse);
      }
    });
  }
};

module.exports = FriendRequestApiUtil;
