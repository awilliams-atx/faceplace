var React = require('react'),
    ClientActions = require('../../../../actions/client_actions'),
    UserStore = require('../../../../stores/user');

var IntroItemDouble = React.createClass({
  getInitialState: function () {
    return this.initialState();
  },
  render: function () {
    if (this.state.editing) {
      return (
        <form onSubmit={this.onSubmit} >
          <input value={this.state[this.props.item1] || ''}
            ref='autoFocus'
            placeholder={this.props.placeholder1}
            onChange={this.onItem1Change} />
          <input value={this.state[this.props.item2] || ''}
            placeholder={this.props.placeholder2}
            onChange={this.onItem2Change} />
          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.onCancel}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className='intro-item-text' onClick={this.showEdit}>
          {this.props.toFormattedString(this.state)}
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
  initialState: function () {
    var state = { editing: false }
    state[this.props.item1] = UserStore.user()[this.props.item1];
    state[this.props.item2] = UserStore.user()[this.props.item2];
    return state;
  },
  onCancel: function (e) {
    e.preventDefault();
    var state = { editing: false }
    state[this.props.item1] = UserStore.user()[this.props.item1];
    state[this.props.item2] = UserStore.user()[this.props.item2];
    this.setState(state);
  },
  onSubmit: function (e) {
    e.preventDefault();
    var submission = {};
    submission[this.props.item1] = this.state[this.props.item1];
    submission[this.props.item2] = this.state[this.props.item2];
    ClientActions.submitProfile(submission);
    this.setState({ editing: false });
  },
  onItem1Change: function (e) {
    var state = {};
    state[this.props.item1] = e.target.value;
    this.setState(state);
  },
  onItem2Change: function (e) {
    var state = {};
    state[this.props.item2] = e.target.value;
    this.setState(state);
  },
  onUserStoreChange: function (e) {
    var state = {};
    state[this.props.item1] = UserStore.user()[this.props.item1];
    state[this.props.item2] = UserStore.user()[this.props.item2];
    this.setState(state);
  },
  showEdit: function (e) {
    e.preventDefault();
    if (!this.props.authorizedToEdit) { return; }
    this.setState({ editing: true }, function () {
      this.refs.autoFocus.focus();
    });
  }
});

module.exports = IntroItemDouble;
