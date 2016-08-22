var React = require('react'),
    ClientActions = require('../../../../actions/client_actions'),
    UserStore = require('../../../../stores/user');

var IntroItemLocation = React.createClass({
  getInitialState: function () {
    return ({ editing: false, location: UserStore.user().location });
  },
  render: function () {
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.location || ''}
            ref='autoFocus'
            placeholder={'Where do you live?'}
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
          {this.state.location ? this.state.location : 'Where do you live?'}
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
    this.setState({ editing: true }, function () {
      this.refs.autoFocus.focus();
    });
  },
  cancel: function (e) {
    e.preventDefault();
    this.setState({ location: UserStore.user().location }, this.toggleEdit);
  },
  toggleEdit: function () {
    this.setState({ editing: !this.state.editing });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.toggleEdit();
    ClientActions.submitProfile({ location: this.state.location });
  },
  onFormChange: function (e) {
    e.preventDefault();
    this.setState({ location: e.target.value });
  },
  onUserStoreChange: function () {
    this.setState({ location: UserStore.user().location });
  }
});

module.exports = IntroItemLocation;
