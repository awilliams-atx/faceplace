var React = require('react'),
    UserApiUtil = require('../../../../util/user_api_util'),
    UserStore = require('../../../../stores/user');

var IntroItemHometown = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      hometown: UserStore.user().hometown
    });
  },
  render: function () {
    if (this.state.editing)
    {
      return (
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.hometown || ''}
            ref='autoFocus'
            placeholder={'Where are you from?'}
            onChange={this.onFormChange} />

          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className='intro-item-text' onClick={this.showEdit}>
          {this.state.hometown ? this.state.hometown : 'Where are you from?'}
        </div>
      );
    }
  },
  componentDidMount: function () {
    this.UserListener = UserStore.addListener(this.onUserStoreChange);
  },
  componentWillUnmount: function () {
    this.UserListener.remove();
  },
  showEdit: function (e) {
    e.preventDefault();
    if (!this.props.authorizedToEdit) { return; }
    this.setState({
      editing: true
    }, function () {
      this.refs.autoFocus.focus();
    });
  },
  cancel: function (e) {
    e.preventDefault();
    this.setState({
      hometown: UserStore.user().hometown
    }, function () {
      this.toggleEdit();
    });
  },
  toggleEdit: function () {
    this.setState({
      editing: !this.state.editing
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.toggleEdit();
    UserApiUtil.setProfile({
      hometown: this.state.hometown
    });
  },
  onFormChange: function (e) {
    this.setState({hometown: e.target.value});
  },
  onUserStoreChange: function (e) {
    this.setState({hometown: UserStore.user().hometown});
  }
});

module.exports = IntroItemHometown;
