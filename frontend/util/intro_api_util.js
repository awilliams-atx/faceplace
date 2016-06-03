var SessionActions = require('../actions/session_actions'),
    ErrorActions = require('../actions/error_actions'),
    IntroActions = require('../actions/intro_actions');

var IntroApiUtil = {
  fetchIntro: function (id) {
    console.log('IntroApiUtil#fetchIntro');
    $.ajax({
      url: 'api/users/' + SessionStore.currentUser().id,
      method: 'GET',
      dataType: 'json',
      data: id,
      success: function (intro) {
        console.log('IntroApiUtil#fetchIntro SUCCESS');
        IntroActions.receiveIntro(intro);
      },
      error: function (errors) {
        console.log('IntroApiUtil#fetchIntro ERROR');
      }
    });
  }
};

module.exports = IntroApiUtil;
