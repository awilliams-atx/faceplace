var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    notificationConstants = require('../constants/notification_constants');

var NotificationStore = new Store(AppDispatcher);

_notifications = [];

NotificationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  }
};

NotificationStore.all = function () {
  return _notifications.slice();
};

module.exports = NotificationStore;
