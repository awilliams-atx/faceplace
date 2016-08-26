var React = require('react'),
    NotificationItem = require('./NotificationItem'),
    NotificationStore = require('../../stores/notification.js'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session.js');

var Notifications = React.createClass({
  getInitialState: function () {
    return {
      notifications: [],
      uncheckedNotificationIds: [],
      droppedDown: false
    };
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
        <div className='nav-drop-overlay'>
          <div className='nav-drop-title'>
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
            checkedClass={this.checkedClass(notif.id)} />
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
  navDropClickListener: function (e) {
    var notificationsDrop = document.getElementById('notifications-drop');
    if (!notificationsDrop.contains(e.target)) {
      // ClientActions.emptyJustCheckedIds();
      this.props.toggleNavDrop('null');
      document.body.removeEventListener('click', this.navDropClickListener);
      this.setState({ droppedDown: false });
    }
  },
  onNotificationStoreChange: function () {
    this.setState({
      notifications: NotificationStore.all(),
      uncheckedNotificationIds: NotificationStore.uncheckedNotificationIds()
    });
  },
  toggleNavDrop: function () {
    if (this.state.droppedDown) { return }
    this.markNotificationsChecked();
    this.props.toggleNavDrop('notifications');
    document.body.addEventListener('click', this.navDropClickListener);
  }
});

module.exports = Notifications;
