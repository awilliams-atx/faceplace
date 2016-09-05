var React = require('react'),
    TagSearchItem = require('./TagSearchItem'),
    UI = require('../../util/ui'),
    Util = require('../../util/general'),
    ClientActions = require('../../actions/client_actions'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag');

var TagSearch = React.createClass({
  getInitialState: function () {
    return ({
      cursor: 0,
      searchString: '',
      tagging: UI.now('tagging'),
      untaggedFriends: TagStore.untaggedFriends()
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
    if (this.state.tagging) {
      return (
        <div className='tagging-field-container group'>
          <div className='tagging-field-with'>
            With:
          </div>
          <form onSubmit={this.onSubmit}>
            <input autoComplete='off'
              className='tagged-friends-input'
              onChange={this.onSearchStringChange}
              onKeyDown={Util.preventSelectionChange}
              onKeyPress={Util.preventSelectionChange}
              onKeyUp={this.arrowListener}
              placeholder='Who are you with?'
              ref={function (input) {
                if (input != null) {
                  input.focus();
                }
              }}
              value={this.state.searchString} />
          </form>
        </div>
      );
    }
  },
  renderSearch: function () {
    if (this.state.tagging && this.state.untaggedFriends.length > 0) {
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
    UI.addListener(this.onUIChange);
  },
  componentWillUnmount: function () {
    this.tagListener.remove();
    UI.removeListener(this.onUIChange);
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
  onSubmit: function (e) {
    this.onTag(e);
  },
  onTag: function (e) {
    e.preventDefault();
    var cursor = this.state.cursor;
    this.setState({ cursor: 0, searchString: '' }, function () {
      if (this.state.untaggedFriends.length > 0) {
        ClientActions
          .addTaggedFriend(this.state.untaggedFriends[cursor].userId);
      }
      ClientActions.fetchTagSearchResults(this.state.searchString);
    }.bind(this));
  },
  onTagStoreChange: function () {
    if (TagStore.isEditingPost() && !this.props.isEditingPost) { return }
    this.setState({ untaggedFriends: TagStore.untaggedFriends() });
  },
  onUIChange: function () {
    if (UI.now('editingPost') !== this.props.isEditingPost) { return }
    this.setState({ tagging: UI.now('tagging') });
  }
});

module.exports = TagSearch;
