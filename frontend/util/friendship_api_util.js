var ServerActions = require('../actions/server_actions');

var FriendRequestApiUtil = {
  destroyFriendship: function (userId) {
    $.ajax({
      url: 'api/friendships/' + userId,
      method: 'DELETE',
      dataType: 'json',
      success: function (friendship) {
        ServerActions.receiveDeletedFriendship(friendship);
      }
    });
  }
};

module.exports = FriendRequestApiUtil;
