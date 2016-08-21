var React = require('react'),
    ProfileApiUtil = require('../../../../util/profile_api_util'),
    ProfileStore = require('../../../../stores/profile');

var IntroItemHometown = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      hometown: ProfileStore.profile().hometown
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
    this.ProfileListener = ProfileStore.addListener(this.onProfileStoreChange);
  },
  componentWillUnmount: function () {
    this.ProfileListener.remove();
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
      hometown: ProfileStore.profile().hometown
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
    ProfileApiUtil.setProfile({
      hometown: this.state.hometown
    });
  },
  onFormChange: function (e) {
    this.setState({hometown: e.target.value});
  },
  onProfileStoreChange: function (e) {
    this.setState({hometown: ProfileStore.profile().hometown});
  }
});

module.exports = IntroItemHometown;
