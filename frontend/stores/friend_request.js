var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    socketConstants = require('../constants/socket_constants');

var FriendRequestStore = new Store(AppDispatcher);

_requests = [];

FriendRequestStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case friendRequestConstants.FRIEND_REQUESTS_RECEIVED:
    this.setRequests(payload.requests);
    FriendRequestStore.__emitChange();
    break;
  case socketConstants.PUSH_FRIEND_REQUEST:
    FriendRequestStore.addRequest(payload.request);
    FriendRequestStore.__emitChange();
    break;
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_ACCEPTED:
    FriendRequestStore.removeRequest(payload.response.maker_id);
    FriendRequestStore.__emitChange();
    break;
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_REJECTED:
    FriendRequestStore.removeRequest(payload.response.maker_id);
    FriendRequestStore.__emitChange();
    break;
  }
};

FriendRequestStore.addRequest = function (request) {
  for (var i = 0; i < _requests.length; i++) {
    if (_requests[i].maker_id === request.maker_id) {
      return;
    }
  }
  _requests.push(request);
};

FriendRequestStore.all = function () {
  return _requests.slice();
};

FriendRequestStore.removeRequest = function (maker_id) {
  for (var i = 0; i < _requests.length; i++) {
    if (_requests[i].maker_id === maker_id) {
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
