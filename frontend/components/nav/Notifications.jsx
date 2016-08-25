var React = require('react'),
    NotificationStore = require('../../stores/notification.js'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session.js');

var Notifications = React.createClass({
  getInitialState: function () {
    return { notifications: [], uncheckedNotificationIds: [] };
  },
  render: function () {
    return (
      <div className={this.className() + ' nav-drop-icon'}
        id='notifications-drop'
        onClick={this.toggleNavDrop}>
        <div className='fa-hover-box-25x25'>
          <i className="fa fa-globe" aria-hidden="true"></i>
          {this.renderNotificationCounter()}
        </div>
        {this.renderDropDown()}
      </div>
    );
  },
  renderDropDown: function () {
    if (this.props.dropToggles['notifications']) {
      return (
        <div id='notification-overlay'>
          <div id='notification-overlay-title'>
            <strong>Notifications</strong>
          </div>
          {this.renderNotifications()}
        </div>
      );
    }
  },
  renderNotificationCounter: function () {
    if (this.state.uncheckedNotificationIds.length > 0) {
      return (
        <mark>{this.state.uncheckedNotificationIds.length}</mark>
      );
    }
  },
  renderNotifications: function () {
    if (this.state.notifications.length === 0) {
      return (
        <div id='empty-notifications'>
          <aside>No notifications</aside>
        </div>
      );
    } else {
      return this.state.notifications.map(function (notif, idx) {
        return (
          <NotificationItem
            notif={notif}
            key={idx}
            checkedClass={this.checkedClass(req.id)} />
        );
      }.bind(this));
    }
  },
  componentDidMount: function () {
    this.notificationListener =
      NotificationStore.addListener(this.onNotificationStoreChange);
    ClientActions.fetchNotifications();
  },
  componentWillUnmount: function () {
    this.notificationListener.remove();
  },
  checkedClass: function (id) {
    return NotificationStore.justChecked(id) ? 'unchecked-alert' : '';
  },
  className: function () {
    if (this.state.uncheckedNotitificationIds > 0) {
      return 'nav-drop-active';
    } else if (this.props.dropToggles['notifications']) {
      return 'nav-drop-active';
    } else {
      return 'nav-drop-inactive';
    }
  },
  markNotificationsChecked: function () {
    if (this.state.uncheckedNotificationIds.length > 0) {
      ClientActions
        .markNotificationsChecked(this.state.uncheckedNotificationIds);
    }
  },
  onNotificationStoreChange: function () {
    this.setState({
      notifications: NotificationStore.all(),
      uncheckedNotificationIds: NotificationStore.uncheckedNotificationIds()
    });
  },
  toggleNavDrop: function () {
    this.markNotificationsChecked();
    this.props.toggleNavDrop('notifications');
    var body = document.getElementsByTagName('body')[0];
    this.navDropClickListener = function (e) {
      var notificationsDrop = document.getElementById('notifications-drop');
      if (!notificationsDrop.contains(e.target)) {
        // ClientActions.emptyJustCheckedIds();
        this.props.toggleNavDrop('null');
        body.removeEventListener('click', this.navDropClickListener);
      }
    }.bind(this);
    body.addEventListener('click', this.navDropClickListener);
  }
});

module.exports = Notifications;
