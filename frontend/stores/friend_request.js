var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    socketConstants = require('../constants/socket_constants');

var FriendRequestStore = new Store(AppDispatcher);

_accepted = [];
_justCheckedIds = [];
_pending = [];

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
    FriendRequestStore.acceptRequest(payload.request.maker_id);
    FriendRequestStore.__emitChange();
    break;
  case friendRequestConstants.RECEIVED_FRIEND_REQUEST_REJECTED:
    FriendRequestStore.removePending(payload.request.maker_id);
    FriendRequestStore.__emitChange();
    break;
  case friendshipConstants.UNFRIENDED:
    FriendRequestStore.removeAccepted(payload.friend_id);
    FriendRequestStore.__emitChange();
    break;
  }
};

FriendRequestStore.accepted = function () {
  return _accepted.slice();
};

FriendRequestStore.acceptRequest = function (maker_id) {
  _accepted.push(FriendRequestStore.removePending(maker_id));
};

FriendRequestStore.addRequest = function (request) {
  for (var i = 0; i < _pending.length; i++) {
    if (_pending[i].maker_id === request.maker_id) {
      return;
    }
  }
  _pending.push(request);
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
  for (var i = 0; i < _pending.length; i++) {
    if (checked_ids.indexOf(_pending[i].id) >= 0) {
      _pending[i].checked = true;
    }
  }
};

FriendRequestStore.pending = function () {
  return _pending.slice();
};

FriendRequestStore.removeAccepted = function (id) {
  for (var i = 0; i < _accepted.length; i++) {
    if (_accepted[i].maker_id === id || _accepted[i].receier_id === id) {
      return _accepted.splice(i, 1)[0];
    }
  }
};

FriendRequestStore.removePending = function (maker_id) {
  for (var i = 0; i < _pending.length; i++) {
    if (_pending[i].maker_id === maker_id) {
      return _pending.splice(i, 1)[0];
    }
  }
};

FriendRequestStore.setJustCheckedIds = function (checked_ids) {
  for (var i = 0; i < checked_ids.length; i++) {
    _justCheckedIds.push(checked_ids[i]);
  }
};

FriendRequestStore.setRequests = function (requests) {
  _pending = [];
  _accepted = [];
  for (var i = 0; i < requests.length; i++) {
    if (requests[i].accepted) {
      _accepted.push(requests[i]);
    } else {
      _pending.push(requests[i]);
    }
  }
};

FriendRequestStore.uncheckedRequestIds = function () {
  return _pending.filter(function (request) {
    return !request.checked;
  }).map(function (request) {
    return request.id;
  });
};

module.exports = FriendRequestStore;
