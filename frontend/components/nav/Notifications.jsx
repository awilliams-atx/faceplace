var React = require('react');

var Notifications = React.createClass({
  render: function () {
    var dropDown = function () {
      if (this.props.dropToggles['notifications']) {
        return(
          <div>NOTIFICATIONS</div>
        );
      }
    }.bind(this);
    return (
      <div className={this.className()}
        id='notifications-drop'
        onClick={this.toggleDrop}>
        <i className="fa fa-globe" aria-hidden="true"></i>
        {dropDown()}
      </div>
    );
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
  toggleDrop: function () {
    this.props.toggleDrop('notifications');
    var body = document.getElementsByTagName('body')[0];
    this.navDropClickListener = function (e) {
      var notificationsDrop = document.getElementById('notifications-drop');
      if (!notificationsDrop.contains(e.target)) {
        this.props.toggleDrop('null');
        body.removeEventListener('click', this.navDropClickListener);
      }
    }.bind(this);
    body.addEventListener('click', this.navDropClickListener);
  }
});

module.exports = Notifications;
