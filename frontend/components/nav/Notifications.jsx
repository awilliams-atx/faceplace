var React = require('react'),
    NotificationStore = require('../../stores/notification.js'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session.js');

var Notifications = React.createClass({
  getInitialState: function () {
    return { notifications: [], uncheckedNotificationIds: [] };
  },
  render: function () {
    var dropDown = function () {
      if (this.props.dropToggles['notifications']) {
        return(
          <div>{this.state.notifications.length}</div>
        );
      }
    }.bind(this);
    return (
      <div className={this.className() + ' nav-drop-icon'}
        id='notifications-drop'
        onClick={this.toggleNavDrop}>
        <div className='fa-hover-box-25x25'>
          <i className="fa fa-globe" aria-hidden="true"></i>
        </div>
        {dropDown()}
      </div>
    );
  },
  componentDidMount: function () {
    this.notificationListener =
      NotificationStore.addListener(this.onNotificationStoreChange);
    ClientActions.fetchNotifications();
  },
  componentWillUnmount: function () {
    this.notificationListener.remove();
  },
  componentWillReceiveProps: function (props) {
    this.setState({ dropped: props.dropped });
  },
  className: function () {
    if (this.props.dropToggles['notifications']) {
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
    this.setState({ notifications: NotificationStore.all() });
  },
  toggleNavDrop: function () {
    this.markNotificationsChecked();
    this.props.toggleNavDrop('notifications');
    var body = document.getElementsByTagName('body')[0];
    this.navDropClickListener = function (e) {
      var notificationsDrop = document.getElementById('notifications-drop');
      if (!notificationsDrop.contains(e.target)) {
        this.props.toggleNavDrop('null');
        body.removeEventListener('click', this.navDropClickListener);
      }
    }.bind(this);
    body.addEventListener('click', this.navDropClickListener);
  }
});

module.exports = Notifications;
