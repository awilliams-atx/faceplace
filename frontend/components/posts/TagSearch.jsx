var React = require('react'),
    TagSearchItem = require('./TagSearchItem'),
    Util = require('../../util/general'),
    ClientActions = require('../../actions/client_actions'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag');

var TagSearch = React.createClass({
  getInitialState: function () {
    return ({
      cursor: undefined,
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
        <div className='tagging-field-container group'>
          <div className='tagging-field-with'>
            With:
          </div>
          <input autoComplete='off'
            className='tagged-friends-input'
            onChange={this.onSearchStringChange}
            onSubmit={this.onSubmit}
            placeholder='Who are you with?'
            ref={function (input) {
              if (input != null) {
                input.focus();
              }
            }}
            value={this.state.searchString} />
        </div>
      );
    }
  },
  renderSearch: function () {
    if (this.props.tagging && this.state.untaggedFriends.length > 0) {
      return (
        <div className='tag-search-anchor-point'>
          <div className='tagging-friends-search-results overlay group'>
            {this.renderUntaggedFriends()}
          </div>
        </div>
      );
    }
  },
  renderUntaggedFriends: function () {
    return this.state.untaggedFriends.map(function (friend, idx) {
      return (
        <TagSearchItem friend={friend}
          cursor= {this.state.cursor}
          idx={idx}
          key={idx}
          onTag={this.onTag}
          onMouseEnter={this.onMouseEnter} />
      );
    }.bind(this));
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
      if (this.props.tagging) {
        document.addEventListener('keyup', this.arrowListener);
        if (!this.state.wasJustTagging) {
          ClientActions.fetchTagSearchResults(this.state.searchString);
        }
      } else {
        document.removeEventListener('keyup', this.arrowListener);
      }
    }.bind(this));
  },
  arrowListener: function (e) {
    var difference = Util.dirToDifference(e);
    if (!difference) { return }
    var cursor = Util.applyCursorDifference(difference, this.state.cursor);
    cursor = Util.resetCursor(cursor, this.state.untaggedFriends);
    if (cursor !== this.state.cursor) {
      this.setState({ cursor: cursor });
    }
  },
  onMouseEnter: function (e) {
    if (parseInt(e.target.dataset.idx) !== this.state.cursor) {
      this.setState({ cursor: parseInt(e.currentTarget.dataset.idx) });
    }
  },
  onSearchStringChange: function (e) {
    this.setState({cursor: 0, searchString: e.target.value}, function () {
      ClientActions.fetchTagSearchResults(this.state.searchString);
    });
  },
  onTag: function (e) {
    e.preventDefault();
    var friendId = parseInt(e.currentTarget.dataset.userid);
    this.setState({ cursor: 0, searchString: '' }, function () {
      ClientActions.addTaggedFriend(friendId);
      ClientActions.fetchTagSearchResults(this.state.searchString);
    }.bind(this));
  },
  onTagStoreChange: function () {
    if (TagStore.isEditingPost() && !this.props.isEditingPost) { return; }
    this.setState({ untaggedFriends: TagStore.untaggedFriends() });
  },
});

module.exports = TagSearch;
