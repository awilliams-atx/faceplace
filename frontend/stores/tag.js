var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    tagConstants = require('../constants/tag_constants');

var _friends = {};

var TagStore = new Store(AppDispatcher);

TagStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case tagConstants.FRIENDS_RECEIVED_FOR_TAGGING:
      this.setFriends(payload.friends);
      _friendsFetched = true;
      TagStore.__emitChange();
      break;
  }
};

TagStore.all = function () {
  return $.extend({}, _friends);
};

TagStore.find = function (id) {
  console.log(_friends);
  return $.extend({}, _friends[id]);
};

TagStore.setFriends = function (friends) {
  friends.forEach(function (friend) {
    _friends[friend.userId] = friend;
  });
};

module.exports = TagStore;
