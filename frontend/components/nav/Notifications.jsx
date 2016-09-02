var React = require('react'),
    NotificationItem = require('./NotificationItem'),
    NotificationStore = require('../../stores/notification.js'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session.js');

var Notifications = React.createClass({
  getInitialState: function () {
    return {
      droppedDown: false,
      notifications: NotificationStore.all(),
      uncheckedNotificationIds: NotificationStore.uncheckedNotificationIds()
    };
  },
  render: function () {
    return (
      <div className={this.className() + ' nav-drop-icon'}
        id='notifications-drop'
        onClick={this.dropDown}>
        <div className='fa-hover-box-25x25'>
          <i className="fa fa-globe" aria-hidden="true"></i>
          {this.renderNotificationCounter()}
        </div>
        {this.renderDropDown()}
      </div>
    );
  },
  renderDropDown: function () {
    if (this.state.droppedDown) {
      return (
        <aside id='nav-drop-overlay'>
          <div className='nav-drop-title'>
            <strong>Notifications</strong>
          </div>
          <div id='nav-drop-index'>
            {this.renderNotifications()}
          </div>
          {this.renderLoadMore()}
        </aside>
      );
    }
  },
  renderLoadMore: function () {
    if (this.state.notifications.length > 0 && !NotificationStore.nomore()) {
      return (
        <footer onClick={this.fetchNotifications}>
          Load more notifications
        </footer>
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
        <div id='empty-nav-drop'>
          <aside>No notifications</aside>
        </div>
      );
    } else {
      return this.state.notifications.map(function (notif, idx) {
        return (
          <NotificationItem
            rollUp={this.rollUp}
            key={idx}
            notif={notif} />
        );
      }.bind(this));
    }
  },
  componentDidMount: function () {
    this.notificationListener =
      NotificationStore.addListener(this.onNotificationStoreChange);
    ClientActions.fetchNotifications(NotificationStore.pagination());
  },
  componentWillUnmount: function () {
    this.notificationListener.remove();
  },
  className: function () {
    if (this.state.droppedDown) {
      return 'nav-drop-active';
    } else if (this.state.uncheckedNotificationIds.length > 0) {
      return 'nav-drop-unchecked';
    } else {
      return 'nav-drop-inactive';
    }
  },
  dropDown: function (e) {
    if (!this.state.droppedDown) {
      this.setState({ droppedDown: true }, function () {
        this.markNotificationsChecked();
        document.body.addEventListener('click', this.navDropClickListener);
      }.bind(this));
    } else if (!document.getElementById('nav-drop-overlay')
      .contains(e.target)) {
      this.rollUp();
    }
  },
  fetchNotifications: function () {
    if (NotificationStore.nomore()) { return }
    ClientActions.fetchNotifications(NotificationStore.pagination());
  },
  markNotificationsChecked: function () {
    if (this.state.uncheckedNotificationIds.length > 0) {
      ClientActions
        .markNotificationsChecked(this.state.uncheckedNotificationIds);
    }
  },
  navDropClickListener: function (e) {
    var navDropIcon = document.getElementById('notifications-drop');
    var overlay = document.getElementById('nav-drop-overlay');
    if (!overlay.contains(e.target)
      && e.target.parentNode.parentNode !== navDropIcon) {
      this.rollUp();
    }
  },
  onNotificationStoreChange: function () {
    this.setState({
      notifications: NotificationStore.all(),
      uncheckedNotificationIds: NotificationStore.uncheckedNotificationIds()
    }, function () {
      if (this.state.droppedDown) {
        this.markNotificationsChecked()
      }
    }.bind(this));
  },
  rollUp: function () {
    this.setState({ droppedDown: false }, function () {
      document.body.removeEventListener('click', this.navDropClickListener);
    }.bind(this));
  }
});

module.exports = Notifications;
