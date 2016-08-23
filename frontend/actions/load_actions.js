var Dispatcher = require('../dispatcher/dispatcher'),
    loadConstants = require('../constants/load_constants');

var LoadActions = {
  finishLoading: function (fileName) {
    Dispatcher.dispatch({
      actionType: loadConstants.LOADED,
      fileName: fileName
    });
  }
};

module.exports = LoadActions;
