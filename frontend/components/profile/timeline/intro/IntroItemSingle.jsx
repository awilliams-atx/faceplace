var React = require('react'),
    ClientActions = require('../../../../actions/client_actions'),
    UserStore = require('../../../../stores/user');

var IntroItemSingle = React.createClass({
  getInitialState: function () {
    var state = { editing: false };
    return this.initialState();
  },
  render: function () {
    if (this.state.editing) {
      return (
        <form onSubmit={this.onSubmit}>
          <input value={this.state[this.props.item] || ''}
            ref='autoFocus'
            placeholder={this.props.placeholder}
            onChange={this.onChange} />

          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.onCancel}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className='intro-item-text' onClick={this.showEdit}>
          {this.state[this.props.item] ? this.state[this.props.item] :
            this.props.prompt}
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
    var state = { editing: false }
    state[this.props.item] = UserStore.user()[this.props.item];
    this.setState(state);
  },
  initialState: function () {
    var state = { editing: false }
    state[this.props.item] = UserStore.user()[this.props.item];
    return state;
  },
  onChange: function (e) {
    var state = {};
    state[this.props.item] = e.target.value;
    this.setState(state);
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.toggleEdit();
    var submission = {};
    submission[this.props.item] = this.state[this.props.item];
    ClientActions.submitProfile(submission);
  },
  onUserStoreChange: function (e) {
    var state = {};
    state[this.props.item] = UserStore.user()[this.props.item];
    this.setState(state);
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

module.exports = IntroItemSingle;
