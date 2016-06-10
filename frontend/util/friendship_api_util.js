var ServerActions = require('../actions/server_actions');

var FriendRequestApiUtil = {
  destroyFriendship: function (userId) {
    $.ajax({
      url: 'api/friendships/' + userId,
      method: 'DELETE',
      dataType: 'json',
      success: function (friendship) {
        ServerActions.receiveDeletedFriendship(friendship);
      },
      error: function (errors) {
        console.log('FriendRequestApiUtil#destroyFriendship ERROR');
      }
    });
  }
};

module.exports = FriendRequestApiUtil;
