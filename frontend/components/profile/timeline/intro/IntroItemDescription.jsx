var React = require('react'),
    ProfileApiUtil = require('../../../../util/profile_api_util'),
    ProfileStore = require('../../../../stores/profile'),
    FormStore = require('../../../../stores/form');

var IntroItemDescription = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      description: ProfileStore.description()
    });
  },
  render: function () {
    if (this.state.editing)
    {
      return (
        <div id='description-form group'>
          <form onSubmit={this.handleSubmit}>
            <textarea value={this.state.description || ''}
              cols='46'
              rows='5'
              ref='autoFocus'
              placeholder='Tell everyone about yourself.'
              onChange={this.onFormChange} />

            <div className='buttons' >
              <button>Submit</button>
              <button onClick={this.cancel}>Cancel</button>
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
    this.unchangedDescription = this.state.description;
    this.setState({
      editing: true
    }, function () {
      this.refs.autoFocus.focus();
    });
  },
  toggleEdit: function () {
    this.setState({
      editing: !this.state.editing
    });
  },
  cancel: function (e) {
    e.preventDefault();
    this.setState({
      description: ProfileStore.description()
    }, this.toggleEdit);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.toggleEdit();
    ProfileApiUtil.setProfile({
      description: this.state.description
    });
  },
  onFormChange: function (e) {
    this.setState({description: e.target.value});
  },
  onProfileStoreChange: function (e) {
    this.setState({description: ProfileStore.description()});
  },
  onFormStoreChange: function (e) {
    if (FormStore.isOpen('INTRO_DESCRIPTION') && !this.state.editing) {
      this.setState({editing: true});
    } else if (!FormStore.isOpen('INTRO_DESCRIPTION') && this.state.editing) {
      this.setState({editing: false});
    }
  }
});

module.exports = IntroItemDescription;
