var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    postConstants = require('../constants/post_constants');

var _originalIds = [];

var ImageStore = new Store(AppDispatcher);

ImageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case postConstants.START_EDITING_POST:
      ImageStore.setOriginalIds(payload.images);
      break;
  }
};

ImageStore.setOriginalIds = function (images) {
  _originalIds = images.map(function (image) {
    return image.id;
  });
};


module.exports = ImageStore;
