var Store = require('flux/utils').Store,
    SessionStore = require('./session'),
    AppDispatcher = require('../dispatcher/dispatcher'),
    notificationConstants = require('../constants/notification_constants'),
    socketConstants = require('../constants/socket_constants');

var NotificationStore = new Store(AppDispatcher);

_justCheckedIds = [];
_notifications = [];
_pagination = { offset: 0, page: 1, nomore: false }; // for next request

NotificationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case notificationConstants.CHECKED_NOTIFICATION_IDS_RECEIVED:
    NotificationStore.markNotificationsChecked(payload.checked_ids);
    NotificationStore.__emitChange();
    break;
  case notificationConstants.NOTIFICATIONS_RECEIVED:
    if (_notifications[0] && _notifications[0].notified_id !==
      SessionStore.currentUser().id) {
      NotificationStore.setNotifications(payload.notifications);
    } else {
      NotificationStore.addNotifications(payload.notifications);
    }
    NotificationStore.__emitChange();
    break;
  case socketConstants.PUSH_NOTIFICATION:
    NotificationStore.addNewNotification(payload.notification);
    NotificationStore.__emitChange();
    break;
  case notificationConstants.READ_NOTIFICATION_ID_RECEIVED:
    NotificationStore.markNotificationRead(payload.id);
    NotificationStore.__emitChange();
    break;
  }
};

NotificationStore.addNewNotification = function (notification) {
  _notifications.unshift(notification);
  _pagination.offset += 1;
};

NotificationStore.addNotifications = function (notifications) {
  for (var i = 0; i < notifications.length; i++) {
    _notifications.push(notifications[i]);
  }
  _pagination.page += 1;
  _pagination.nomore = notifications.length === 0;
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

NotificationStore.markNotificationRead = function (id) {
  for (var i = 0; i < _notifications.length; i++) {
    if (_notifications[i].id === id) {
      _notifications[i].read = true;
      return
    }
  }
};

NotificationStore.markNotificationsChecked = function (checked_ids) {
  NotificationStore.setJustCheckedIds(checked_ids);
  for (var i = 0; i < _notifications.length; i++) {
    if (checked_ids.indexOf(_notifications[i].id) >= 0) {
      _notifications[i].checked = true;
    }
  }
};

NotificationStore.mostRecent = function () {
  return Object.assign({}, _notifications[0]);
};

NotificationStore.nomore = function () {
  return _pagination.nomore;
};

NotificationStore.pagination = function () {
  NotificationStore.resetPagination();
  return Object.assign({}, _pagination);
};

NotificationStore.resetPagination = function () {
  if (_notifications.length === 0) { return }
  if (_notifications[0].notified_id !== SessionStore.currentUser().id) {
    _pagination.offset = 0;
    _pagination.page = 1;
    _pagination.nomore = false;
  }
};

NotificationStore.setJustCheckedIds = function (checked_ids) {
  for (var i = 0; i < checked_ids.length; i++) {
    _justCheckedIds.push(checked_ids[i]);
  }
};

NotificationStore.setNotifications = function (notifications) {
  [_notifications, _justCheckedIds].forEach(function (arr) {
    while (arr.length > 0) {
      arr.pop();
    }
  });
  notifications.forEach(function (notification) {
    _notifications.push(notification);
  });
  _pagination.page = 2;
  _pagination.offset = 0;
  _pagination.nomore = false;
};

NotificationStore.uncheckedNotificationIds = function () {
  return _notifications.filter(function (notif) {
    return !notif.checked;
  }).map(function (notif) {
    return notif.id;
  });
};

module.exports = NotificationStore;
