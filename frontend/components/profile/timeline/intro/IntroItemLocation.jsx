var React = require('react'),
    ProfileApiUtil = require('../../../../util/profile_api_util'),
    ProfileStore = require('../../../../stores/profile');

var IntroItemLocation = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      location: ProfileStore.location()
    });
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
    this.ProfileListener = ProfileStore.addListener(this.onProfileStoreChange);
    this.FormListener = FormStore.addListener(this.onFormStoreChange);
  },
  componentWillUnmount: function () {
    this.ProfileListener.remove();
    this.FormListener.remove();
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
      location: ProfileStore.location()
    }, this.toggleEdit);
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
      location: this.state.location
    });
  },
  onFormChange: function (e) {
    e.preventDefault();
    this.setState({location: e.target.value});
  },
  onProfileStoreChange: function () {
    this.setState({location: ProfileStore.location()});
  },
  onFormStoreChange: function (e) {
    if (FormStore.isOpen('INTRO_LOCATION') && !this.state.editing) {
      this.setState({editing: true});
    } else if (!FormStore.isOpen('INTRO_LOCATION') && this.state.editing) {
      this.setState({editing: false});
    }
  }
});

module.exports = IntroItemLocation;
