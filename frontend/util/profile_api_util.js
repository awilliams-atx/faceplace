var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions');

var ProfileApiUtil = {
  fetchIntro: function (id) {
    console.log('ProfileApiUtil#fetchIntro');
    $.ajax({
      url: 'api/user/' + SessionStore.currentUser().id,
      method: 'GET',
      dataType: 'json',
      data: id,
      success: function (intro) {
        console.log('ProfileApiUtil#fetchIntro SUCCESS');
        profileActions.receiveIntro(intro);
      },
      error: function (errors) {
        console.log('ProfileApiUtil#fetchIntro ERROR');
      }
    });
  }
};

module.exports = ProfileApiUtil;
