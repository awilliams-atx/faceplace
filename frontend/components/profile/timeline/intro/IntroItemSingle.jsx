var React = require('react'),
    ClientActions = require('../../../../actions/client_actions'),
    UserStore = require('../../../../stores/user');

var IntroItemHometown = React.createClass({
  getInitialState: function () {
    var state = { editing: false };
    return this.initialState();
  },
  render: function () {
    if (this.state.editing) {
      return (
        <form onSubmit={this.onSubmit}>
          <input value={this.state.hometown || ''}
            ref='autoFocus'
            placeholder={'Where are you from?'}
            onChange={this.onHometownChange} />

          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.onCancel}>Cancel</button>
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
  onCancel: function (e) {
    e.preventDefault();
    this.setState({ hometown: UserStore.user().hometown }, function () {
      this.toggleEdit();
    });
  },
  initialState: function () {
    var state = { editing: false }
    state[this.props.item] = UserStore.user()[this.props.item];
    return state;
  },
  onHometownChange: function (e) {
    this.setState({ hometown: e.target.value });
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.toggleEdit();
    ClientActions.submitProfile({ hometown: this.state.hometown });
  },
  onUserStoreChange: function (e) {
    this.setState({ hometown: UserStore.user().hometown });
  },
  showEdit: function (e) {
    e.preventDefault();
    if (!this.props.authorizedToEdit) { return; }
    this.setState({ editing: true }, function () {
      this.refs.autoFocus.focus();
    });
  },
  toggleEdit: function () {
    this.setState({ editing: !this.state.editing });
  }
});

module.exports = IntroItemHometown;
