var Dispatcher = require('../dispatcher/dispatcher'),
    formConstants = require('../constants/form_constants');

var FormActions = {
  open: function (form) {
    console.log('FormActions#openForm ' + form);
    var action = form + '_OPEN';
    Dispatcher.dispatch({
      actionType: formConstants[action]
    });
  },
  close: function (form) {
    var action = form + '_CLOSE';
    Dispatcher.dispatch({
      actionType: formConstants[action]
    });
  },
  closeAll: function () {
    Dispatcher.dispatch({
      actionType: formConstants.CLOSE_ALL
    });
  }
};

module.exports = FormActions;
