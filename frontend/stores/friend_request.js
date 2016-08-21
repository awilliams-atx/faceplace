var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    socketConstants = require('../constants/socket_constants');

var FriendRequestStore = new Store(AppDispatcher);

_requests = [];
_justCheckedIds = [];

FriendRequestStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case friendRequestConstants.CHECKED_FRIEND_REQUEST_IDS_RECEIVED:
    FriendRequestStore.markRequestsChecked(payload.checked_ids);
    FriendRequestStore.__emitChange();
    break;
  case friendRequestConstants.CHECKING_REQUESTS_NOW:
    FriendRequestStore.emptyJustCheckedIds();
    break; // Not meant to emit change.
  case friendRequestConstants.FRIEND_REQUESTS_RECEIVED:
    FriendRequestStore.setRequests(payload.requests);
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

FriendRequestStore.emptyJustCheckedIds = function () {
  while (_justCheckedIds.length > 0) {
    _justCheckedIds.pop();
  }
};

FriendRequestStore.justChecked = function (id) {
  return _justCheckedIds.indexOf(id) >= 0;
};

FriendRequestStore.justCheckedIds = function () {
  return _justCheckedIds.slice();
};

FriendRequestStore.markRequestsChecked = function (checked_ids) {
  FriendRequestStore.setJustCheckedIds(checked_ids);
  for (var i = 0; i < _requests.length; i++) {
    if (checked_ids.indexOf(_requests[i].id) >= 0) {
      _requests[i].checked = true;
    }
  }
};

FriendRequestStore.removeRequest = function (maker_id) {
  for (var i = 0; i < _requests.length; i++) {
    if (_requests[i].maker_id === maker_id) {
      _requests.splice(i, 1);
      return;
    }
  }
};

FriendRequestStore.setJustCheckedIds = function (checked_ids) {
  for (var i = 0; i < checked_ids.length; i++) {
    _justCheckedIds.push(checked_ids[i]);
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

FriendRequestStore.uncheckedRequestIds = function () {
  return _requests.filter(function (request) {
    return !request.checked;
  }).map(function (request) {
    return request.id;
  });
};

module.exports = FriendRequestStore;
