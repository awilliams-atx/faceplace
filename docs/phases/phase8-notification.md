# Phase 4: Notification (1.25 days)

## Rails
### Models
* Notification

### Controllers
* Api::NotificationsController (create, destroy, index)

### Views
* notifications/index.json.jbuilder

## Flux
### Views (React Components)
* `NotificationsIndex`
  * `NotificationsIndexItem`

### Stores
* Notifications

### Actions/Utils
* ServerActions.receiveAllNotifications
* ServerActions.deleteNotification
* ClientActions.fetchNotifications
* ClientActions.createNotification
* ClientActions.destroyNotification

### ApiUtil
* ApiUtil.fetchAllNotifications
* ApiUtil.createNotification
* ApiUtil.destroyNotification

## Gems/Libraries
