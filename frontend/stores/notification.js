var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    notificationConstants = require('../constants/notification_constants');

var NotificationStore = new Store(AppDispatcher);

_justCheckedIds = [];
_notifications = [];

NotificationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case notificationConstants.CHECKED_NOTIFICATION_IDS_RECEIVED:
    NotificationStore.markNotificationsChecked(payload.checked_ids);
    NotificationStore.__emitChange();
    break;
  case notificationConstants.NOTIFICATIONS_RECEIVED:
    this.setNotifications(payload.notifications);
    NotificationStore.__emitChange();
  }
};

NotificationStore.all = function () {
  return _notifications.slice();
};

NotificationStore.justChecked = function (id) {
  return _justCheckedIds.indexOf(id) >= 0;
};

NotificationStore.justCheckedIds = function () {
  return _justCheckedIds.slice();
};

NotificationStore.markNotificationsChecked = function (checked_ids) {
  NotificationStore.setJustCheckedIds(checked_ids);
  for (var i = 0; i < _notifications.length; i++) {
    if (checked_ids.indexOf(_notifications[i].id) >= 0) {
      _notifications[i].checked = true;
    }
  }
};

NotificationStore.setJustCheckedIds = function (checked_ids) {
  for (var i = 0; i < checked_ids.length; i++) {
    _justCheckedIds.push(checked_ids[i]);
  }
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
