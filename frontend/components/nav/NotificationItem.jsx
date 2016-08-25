var React = require('react');

var NotificationItem = React.createClass({
  render: function () {
    return (
      <div className={'nav-drop-item group ' + this.props.checkedClass}>
        <img src={this.props.notif.profile_pic_url}
          className='nav-drop-profile-pic nav-drop-block' />
        <div className='notification-details nav-drop-block'>
          <span className='notifier-name'>
            {this.props.notif.notifier_name}
          </span>
          &nbsp;{this.props.notif.explanation}
        </div>
      </div>
    );
  }
});

module.exports = NotificationItem;
