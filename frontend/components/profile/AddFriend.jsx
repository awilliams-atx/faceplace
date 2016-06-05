var React = require('react'),
    UserStore = require('../../stores/user'),
    SessionStore = require('../../stores/session');

var AddFriend = React.createClass({
  getInitialState: function () {
    return({userId: this.props.userId});
  },
  render: function () {
    var buttonContents = <div className='empty-add-friend-button'></div>;

    if (this.props.userId !== SessionStore.currentUser().id) {
      buttonContents = (
        <button onClick={this.clickHandler}>
          <img src={window.add_friend_icon} />
          <strong>Add Friend</strong>
        </button>
      );
    }

    return (
      <div className='add-friend-container'>
        {buttonContents}
      </div>
    );
  },
  clickHandler: function (e) {
    e.preventDefault();

  },
  componentWillReceiveProps: function (newProps) {
    this.setState({userId: newProps.userId});
  }
});


module.exports = AddFriend;
