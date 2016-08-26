var ServerActions = require('../actions/server_actions');

var FriendApiUtil = {
  fetchMostRecentlyAddedFriends: function (userId) {
    $.ajax({
      url: '/api/users/' + userId + '/most_recently_added',
      method: 'GET',
      dataType: 'json',
      success: function (friendsData) {
        ServerActions.receiveMostRecentlyAddedFriends(friendsData);
      }
    });
  }
};

module.exports = FriendApiUtil;
