var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag');

var TagSearch = React.createClass({
  getInitialState: function () {
    return ({
      searchString: '',
      taggedFriends: TagStore.taggedFriends(),
      untaggedFriends: TagStore.untaggedFriends(),
      wasJustTagging: false
    });
  },
  render: function () {
    if (this.props.tagging &&
        Object.keys(this.state.untaggedFriends).length > 0) {
      var untaggedFriends =
        Object.keys(this.state.untaggedFriends).map(function (id) {
        return this.state.untaggedFriends[id];
      }.bind(this));

      tagSearchItems = (
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
    } else {
      tagSearchItems = <div className='empty-tagged-friends-search-results'/>;
    }

    return (
      <div className='tagging-container group'>
        {this.renderTaggedFriends()}
        {this.renderTaggingField()}
        {tagSearchItems}
      </div>
    );
  },
  renderTaggedFriendNames: function () {
    return Object.keys(this.state.taggedFriends).map(function (id) {
      return (
        <div className='tagged-friends-list-item'
          data-userid={id}
          key={id}
          onClick={this.untagFriend}>
          {this.state.taggedFriends[id].fullName}
        </div>
      );
    }.bind(this));
  },
  renderTaggedFriends: function () {
    if (Object.keys(this.state.taggedFriends).length > 0) {
      return (
        <div className='tagged-friends-list group'>
          <div className='tagged-friends-with'>{'— with '}</div>
          {this.renderTaggedFriendNames()}
        </div>
      )
    }
  },
  renderTaggingField: function () {
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
    this.setState({
      taggedFriends: TagStore.taggedFriends(),
      untaggedFriends: TagStore.untaggedFriends()
    });
  },
  onTagFriend: function (e) {
    e.preventDefault();
    var friendId = parseInt(e.currentTarget.dataset.userid);

    this.setState({ searchString: '', }, function () {
      ClientActions.addTaggedFriend(friendId);
      ClientActions.fetchTagSearchResults(this.state.searchString);
    }.bind(this));
  },
  untagFriend: function (e) {
    var friendId = parseInt(e.target.dataset.userid);
    ClientActions.removeTaggedFriend(friendId);
    if (this.props.tagging) {
      ClientActions.fetchTagSearchResults(this.state.searchString);
    }
  }
});

module.exports = TagSearch;
