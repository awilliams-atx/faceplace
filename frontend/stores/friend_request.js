var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    friendRequestConstants = require('../constants/friend_request_constants');

var FriendRequestStore = new Store(AppDispatcher);

_requests = [];

FriendRequestStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case friendRequestConstants.FRIEND_REQUESTS_RECEIVED:
    this.setRequests(payload.requests);
    FriendRequestStore.__emitChange();
  }
};

FriendRequestStore.all = function () {
  return _requests.slice();
};

FriendRequestStore.setRequests = function (requests) {
  while (_requests.length > 0) {
    _requests.pop();
  }
  for (var i = 0; i < requests.length; i++) {
    _requests.push(requests[i]);
  }
};

module.exports = FriendRequestStore;
