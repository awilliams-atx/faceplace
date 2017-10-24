var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    searchConstants = require('../constants/search_constants');

var _users = {};

var SearchStore = new Store(AppDispatcher);

SearchStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case searchConstants.SEARCH_RESULTS_RECEIVED:
      this.setSearchResults(payload.searchResults);
      SearchStore.__emitChange();
      break;
  }
};

SearchStore.setSearchResults = function (searchResults) {
  _users = {};
  
  Object.keys(searchResults).forEach(function (userId) {
    _users[userId] = searchResults[userId];
  });
};

SearchStore.all = function () {
  return Object.keys(_users).map(function (userId) {
    return _users[userId];
  });
};

module.exports = SearchStore;
