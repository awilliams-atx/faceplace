var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    friendRequestConstants = require('../constants/friend_request_constants');

var FriendRequestStore = new Store(AppDispatcher);

var _friendRequests = [];

FriendRequestStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

  }
};

FriendRequestStore.all = function () {
  return _notifications.slice();
};

module.exports = FriendRequestStore;
