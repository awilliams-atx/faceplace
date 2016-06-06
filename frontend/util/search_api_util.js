var ServerActions = require('../actions/server_actions');

var SearchApiUtil = {
  fetchSearchResults: function (id) {
    $.ajax({
      url: 'api/users',
      method: 'GET',
      dataType: 'json',
      data: { search: 'true' },
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
