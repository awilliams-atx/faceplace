var ServerActions = require('../actions/server_actions');

var FriendApiUtil = {
  fetchMostRecentlyAddedFriends: function (userId) {
    $.ajax({
      url: 'api/users/' + userId + '/most_recently_added',
      method: 'GET',
      dataType: 'json',
      success: function (friendsData) {
        ServerActions.receiveMostRecentlyAddedFriends(friendsData);
      },
      error: function (errors) {
        console.log('FriendApiUtil#fetchMostRecentlyAddedFriends ERROR');
      }
    });
  }
};

module.exports = FriendApiUtil;
