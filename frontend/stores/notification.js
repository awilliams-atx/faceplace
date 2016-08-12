var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    notificationConstants = require('../constants/notification_constants');

var NotificationStore = new Store(AppDispatcher);

_notifications = [];

NotificationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case notificationConstants.NOTIFICATIONS_RECEIVED:
    this.setNotifications(payload.notifications);
    NotificationStore.__emitChange();
  }
};

NotificationStore.all = function () {
  return _notifications.slice();
};

NotificationStore.setNotifications = function (notifications) {
  while (_notifications.length > 0) {
    _notifications.pop();
  }
  for (var i = 0; i < notifications.length; i++) {
    _notifications.push(notifications[i]);
  }
};

module.exports = NotificationStore;
