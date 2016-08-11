var React = require('react');

var FriendRequests = React.createClass({
  render: function () {
    var dropDown = function () {
      if (this.props.dropToggles['friendRequests']) {
        return(
          <div>FRIEND REQUESTS</div>
        );
      }
    }.bind(this);
    return (
      <div className={this.className()}
        id='friends-drop'
        onClick={this.toggleDrop}>
        <i className="fa fa-user-plus" aria-hidden="true"></i>
        {dropDown()}
      </div>
    );
  },
  componentWillReceiveProps: function (props) {
    this.setState({ dropped: props.dropped });
  },
  className: function () {
    if (this.props.dropToggles['friendRequests']) {
      return 'nav-drop-active';
    } else {
      return 'nav-drop-inactive';
    }
  },
  toggleDrop: function () {
    this.props.toggleDrop('friendRequests');
    var body = document.getElementsByTagName('body')[0];
    this.navDropClickListener = function (e) {
      var friendsDrop = document.getElementById('friends-drop');
      if (!friendsDrop.contains(e.target)) {
        this.props.toggleDrop('null');
        body.removeEventListener('click', this.navDropClickListener);
      }
    }.bind(this);
    body.addEventListener('click', this.navDropClickListener);
  }
});

module.exports = FriendRequests;
