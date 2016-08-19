var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    friendRequestConstants = require('../constants/friend_request_constants');

var FriendRequestStore = new Store(AppDispatcher);

_requests = [];

FriendRequestStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_RECEIVED:
    this.addRequest(payload.request);
    FriendRequestStore.__emitChange();
    break;
  case friendRequestConstants.FRIEND_REQUESTS_RECEIVED:
    this.setRequests(payload.requests);
    FriendRequestStore.__emitChange();
    break;
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_ACCEPTED:
    FriendRequestStore.removeRequest(parseInt(payload.userId));
    FriendRequestStore.__emitChange();
    break;
    case friendRequestConstants.RECEIVED_FRIEND_REQUEST_REJECTED:
    FriendRequestStore.removeRequest(parseInt(payload.userId));
    FriendRequestStore.__emitChange();
    break;
  }
};

FriendRequestStore.addRequest = function (request) {
  _requests.push(request);
};

FriendRequestStore.all = function () {
  return _requests.slice();
};

FriendRequestStore.removeRequest = function (userId) {
  for (var i = 0; i < _requests.length; i++) {
    if (_requests[i].user_id === userId) {
      _requests.splice(i, 1);
      return;
    }
  }
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
