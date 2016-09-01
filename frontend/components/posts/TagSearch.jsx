var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag');

var TagSearch = React.createClass({
  getInitialState: function () {
    return ({
      searchString: '',
      untaggedFriends: TagStore.untaggedFriends(),
      wasJustTagging: false
    });
  },
  render: function () {
    return (
      <div className='tagging-container group'>
        {this.renderInput()}
        {this.renderSearch()}
      </div>
    );
  },
  renderInput: function () {
    if (this.props.tagging) {
      return (
        <div className='tagging-field-container'>
          <div className='tagging-field-with'>With:</div>
          <div className='tagging-field'>
            <input autoComplete='off'
              className='tagged-friends-input'
              onChange={this.onSearchStringChange}
              placeholder='Who are you with?'
              ref={function (input) {
                if (input != null) {
                  input.focus();
                }
              }}
              value={this.state.searchString} />
          </div>
        </div>
      );
    }
  },
  renderSearch: function () {
    if (this.props.tagging &&
      Object.keys(this.state.untaggedFriends).length > 0) {
      var untaggedFriends =
        Object.keys(this.state.untaggedFriends).map(function (id) {
        return this.state.untaggedFriends[id];
      }.bind(this));

      return (
        <div className='tag-search-anchor-point'>
          <div className='tagging-friends-search-results overlay group'>
          {
            untaggedFriends.map(function (friend) {
              return (
                <div
                  className='search-index-item group'
                  onClick={this.onTagFriend}
                  key={friend.userId}
                  data-userid={friend.userId} >
                  <div className='search-icon'>
                    <img src={friend.postPicUrl} />
                  </div>
                  <div className='search-text'>
                    <strong>{friend.fullName}</strong>
                    <br />
                    <small>{friend.location}</small>
                  </div>
                </div>
              );
            }.bind(this))
          }
          </div>
        </div>
      );
    }
  },
  componentDidMount: function () {
    this.tagListener = TagStore.addListener(this.onTagStoreChange);
  },
  componentWillUnmount: function () {
    this.tagListener.remove();
  },
  componentWillReceiveProps: function (props) {
    var wasJustTagging = this.props.tagging ? true : false;
    this.setState({
      tagging: props.tagging,
      wasJustTagging: wasJustTagging
    }, function () {
      if (!this.state.wasJustTagging && this.props.tagging) {
        ClientActions.fetchTagSearchResults(this.state.searchString);
      }
    }.bind(this));
  },
  onSearchStringChange: function (e) {
    this.setState({searchString: e.target.value}, function () {
      ClientActions.fetchTagSearchResults(this.state.searchString);
    });
  },
  onTagStoreChange: function () {
    if (TagStore.isEditingPost() && !this.props.isEditingPost) { return; }
    this.setState({ untaggedFriends: TagStore.untaggedFriends() });
  },
  onTagFriend: function (e) {
    e.preventDefault();
    var friendId = parseInt(e.currentTarget.dataset.userid);
    this.setState({ searchString: '', }, function () {
      ClientActions.addTaggedFriend(friendId);
      ClientActions.fetchTagSearchResults(this.state.searchString);
    }.bind(this));
  }
});

module.exports = TagSearch;
