var ServerActions = require('../actions/server_actions');

var TagApiUtil = {
  fetchFriendsForTagging: function (userId) {
    $.ajax({
      url: 'api/users/' + userId + '/friends_for_tagging',
      method: 'GET',
      dataType: 'json',
      success: function (friends) {
        ServerActions.receiveFriendsForTagging(friends);
      }
    });
  }
};

module.exports = TagApiUtil;
