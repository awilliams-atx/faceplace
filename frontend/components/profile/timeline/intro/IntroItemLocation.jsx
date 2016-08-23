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
        <form onSubmit={this.onSubmit}>
          <input value={this.state.location || ''}
            ref='autoFocus'
            placeholder={'Where do you live?'}
            onChange={this.onLocationChange} />
          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.onCancel}>Cancel</button>
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
  onCancel: function (e) {
    e.preventDefault();
    this.setState({ location: UserStore.user().location, editing: false });
  },
  onLocationChange: function (e) {
    e.preventDefault();
    this.setState({ location: e.target.value });
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.setState({ editing: false });
    ClientActions.submitProfile({ location: this.state.location });
  },
  onUserStoreChange: function () {
    this.setState({ location: UserStore.user().location });
  },
  showEdit: function (e) {
    e.preventDefault();
    if (!this.props.authorizedToEdit) { return; }
    this.setState({ editing: true }, function () {
      this.refs.autoFocus.focus();
    });
  }
});

module.exports = IntroItemLocation;
