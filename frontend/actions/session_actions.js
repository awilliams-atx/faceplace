var Dispatcher = require('../dispatcher/dispatcher'),
    sessionConstants = require('../constants/session_constants'),
    Sessionstore = require('../stores/session');

var SessionActions = {
  receiveCurrentUser: function (user) {
    Dispatcher.dispatch({
      actionType: sessionConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  },
  removeCurrentUser: function () {
    Dispatcher.dispatch({
      actionType: sessionConstants.LOGOUT
    });
  },
  checkUserPrivileges: function (id) {
    var actionType;
    if (SessionStore.currentUser().id === id) {
      actionType = sessionConstants.VISIT_OWNED_PAGE;
    } else {
      actionType = sessionConstants.VISIT_UNOWNED_PAGE;
    }

    Dispatcher.dispatch({
      actionType: actionType
    });
  }
};

module.exports = SessionActions;
