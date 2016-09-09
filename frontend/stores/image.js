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

ImageStore.filterForEdit = function (images) {
  var add = images.filter(function (image) {
    return image instanceof File;
  });
  var remove = [];
  _originalIds.forEach(function (id) {
    var removed = true;
    for (var i = 0; i < images.length; i++) {
      if (!(images[i] instanceof File) && images[i].id === id) {
        removed = false;
      }
    }
    if (removed) { remove.push(id) }
  });
  return { add: add, remove: remove };
};

ImageStore.setOriginalIds = function (images) {
  _originalIds = images.map(function (image) {
    return image.id;
  });
};


module.exports = ImageStore;
