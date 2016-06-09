var ServerActions = require('../actions/server_actions');

var SearchApiUtil = {
  fetchSearchResults: function (searchString) {
    $.ajax({
      url: 'api/users/search',
      method: 'GET',
      dataType: 'json',
      data: { search_string: searchString },
      success: function (searchResults) {
        ServerActions.receiveSearchResults(searchResults);
      },
      error: function (errors) {
        console.log("SearchApiUtil#fetchSearchResults ERROR");
      }
    });
  }
};

module.exports = SearchApiUtil;
