var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    friendConstants = require('../constants/friend_constants');

var _friends = [];

var FriendStore = new Store(AppDispatcher);

FriendStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  }
};

FriendStore.all = function () {
  
};

FriendStore.find = function (id) {
  return _users[id];
};

window.FriendStore = FriendStore;
module.exports = FriendStore;
