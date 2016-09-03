var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    friendshipConstants = require('../constants/friendship_constants'),
    socketConstants = require('../constants/socket_constants'),
    SessionStore = require('../stores/session');

var FriendRequestStore = new Store(AppDispatcher);

_accepted = [];
_pending = [];

FriendRequestStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case friendRequestConstants.CHECKED_FRIEND_REQUESTS_RECEIVED:
    FriendRequestStore.markRequestsChecked(payload.requests);
    FriendRequestStore.__emitChange();
    break;
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
  var req = FriendRequestStore.removePending(maker_id);
  _accepted.push(req);
};

FriendRequestStore.addRequest = function (request) {
  for (var i = 0; i < _pending.length; i++) {
    if (_pending[i].maker_id === request.maker_id) {
      return
    }
  }
  _pending.push(request);
};

FriendRequestStore.allNotifiedAccepted = function () {
  return _accepted.filter(function (req) {
    return req.maker_id === SessionStore.currentUser().id &&
      !req.acceptance_checked;
  }).map(function (req) {
    return req.id;
  });
};

FriendRequestStore.allUnchecked = function () {
  return _pending.filter(function (req) {
    return !req.checked;
  }).map(function (req) {
    return req.id;
  });
};

FriendRequestStore.markRequestsChecked = function (requests) {
  requests.forEach(function (req) {
    if (req.acceptance_checked) {
      for (var i = 0; i < _accepted.length; i++) {
        if (_accepted[i].id === req.id) {
          _accepted[i].acceptance_checked = true;
          return
        }
      }
    } else if (req.checked) {
      for (var j = 0; j < _pending.length; j++) {
        if (_pending[j].id === req.id) {
          _pending[j].checked = true;
          return
        }
      }
    }
  });
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

module.exports = FriendRequestStore;
