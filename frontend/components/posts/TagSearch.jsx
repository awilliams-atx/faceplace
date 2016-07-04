var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag');

var TagSearch = React.createClass({
  getInitialState: function () {
    return ({
      searchString: '',
      taggedFriends: TagStore.taggedFriends(),
      tagging: this.props.tagging,
      untaggedFriends: TagStore.untaggedFriends(),
      wasJustTagging: false
    });
  },
  render: function () {

    var taggedFriends;

    var taggedIds = Object.keys(this.state.taggedFriends);

    if (taggedIds.length > 0) {

      taggedFriends = (
        <div className='tagged-friends-list group'>
          <div className='tagged-friends-with'>{'— with '}</div>
          {
            taggedIds.map(function (id) {
              var friend = this.state.taggedFriends[id];

              return (
                <div className='tagged-friends-list-item'
                  data-userid={id}
                  key={id}
                  onClick={this.untagFriend}>
                  {friend.fullName}
                </div>
              );
            }.bind(this))
          }
        </div>
      );
    } else {
      taggedFriends = <div className='empty-tagged-friends' />;
    }

    var taggingField;

    if (this.state.tagging) {
      taggingField = (
        <div className='tagging-field-container'>
          <div className='tagging-field-with'>With:</div>
          <div className='tagging-field'>
            <input className='tagged-friends-input'
              placeholder='Who are you with?'
              onChange={this.onSearchStringChange}
              value={this.state.searchString}
              ref='autoFocus' />
          </div>
        </div>
      );
    } else {
      taggingField = <div className='emptyTaggingField' />;
    }

    var filteredFriends;

    if (this.state.tagging &&
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
        {taggedFriends}
        {taggingField}
        {tagSearchItems}
      </div>
    );
  },
  componentDidMount: function () {
    this.tagListener = TagStore.addListener(this.onTagStoreChange);
    this.postListener = PostStore.addListener(this.onPostStoreChange)
  },
  componentWillUnmount: function () {
    this.tagListener.remove();
    this.postListener.remove();
  },
  componentWillReceiveProps: function (props) {
    var wasJustTagging = this.state.tagging ? true : false;

    this.setState({
      tagging: props.tagging,
      wasJustTagging: wasJustTagging
    }, function () {
      if (!this.state.wasJustTagging && this.state.tagging) {
        this.refs.autoFocus.focus();
      }
    }.bind(this));
  },
  onPostStoreChange: function () {
    if (PostStore.isEditing() && !this.props.isEditing) {
      this.tagListener.remove();
    } else if (!PostStore.isEditing() && !this.props.isEditing) {
      if (!this.tagListener) {
        this.tagListener = TagStore.addListener(this.onTagStoreChange);
      }
    }
  },
  onSearchStringChange: function (e) {
    this.setState({searchString: e.target.value}, function () {
      ClientActions.fetchTagSearchResults(this.state.searchString);
    });
  },
  onTagStoreChange: function () {
    this.setState({
      taggedFriends: TagStore.taggedFriends(),
      untaggedFriends: TagStore.untaggedFriends()
    }, function () {
      if (this.state.tagging) {
        this.refs.autoFocus.focus();
      }
    }.bind(this));
  },
  onTagFriend: function (e) {
    e.preventDefault();
    var friendId = parseInt(e.currentTarget.dataset.userid);

    this.setState({
      searchString: '',
    }, function () {
      ClientActions.addTaggedFriend(friendId);
      ClientActions.fetchTagSearchResults(this.state.searchString);
      this.refs.autoFocus.focus();
    }.bind(this));
  },
  untagFriend: function (e) {
    var friendId = parseInt(e.target.dataset.userid);
    ClientActions.removeTaggedFriend(friendId);
    ClientActions.fetchTagSearchResults(this.state.searchString);
    if (this.state.tagging) {
      this.refs.autoFocus.focus();
    }
  }
});

module.exports = TagSearch;
