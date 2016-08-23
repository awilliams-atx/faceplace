var React = require('react'),
    ClientActions = require('../../../../actions/client_actions'),
    UserStore = require('../../../../stores/user'),
    FormStore = require('../../../../stores/form');

var IntroItemDescription = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      description: UserStore.user().description
    });
  },
  render: function () {
    if (this.state.editing) {
      return (
        <div id='description-form group'>
          <form onSubmit={this.onSubmit}>
            <textarea value={this.state.description || ''}
              ref='autoFocus'
              placeholder='Tell everyone about yourself.'
              onChange={this.onDescriptionChange} />

            <div className='buttons' >
              <button>Submit</button>
              <button onClick={this.onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className='intro-item-text-empty' onClick={this.showEdit}>
          {this.state.description ? this.state.description : 'Tell everyone about yourself.'}
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
  toggleEdit: function () {
    this.setState({editing: !this.state.editing});
  },
  onCancel: function (e) {
    e.preventDefault();
    this.setState({
      description: UserStore.user().description,
      editing: false
    });
  },
  onDescriptionChange: function (e) {
    this.setState({ description: e.target.value });
  },
  onSubmit: function (e) {
    e.preventDefault();
    ClientActions.submitProfile({ description: this.state.description });
    this.setState({ editing: false });
  },
  onUserStoreChange: function (e) {
    this.setState({ description: UserStore.user().description });
  },
  showEdit: function (e) {
    e.preventDefault();
    if (!this.props.authorizedToEdit) { return; }
    this.unchangedDescription = this.state.description;
    this.setState({ editing: true }, function () {
      this.refs.autoFocus.focus();
    });
  }
});

module.exports = IntroItemDescription;
