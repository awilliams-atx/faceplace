var React = require('react'),
    Util = require('../../util/general'),
    SearchIndex = require('./SearchIndex'),
    ClientActions = require('../../actions/client_actions'),
    SearchStore = require('../../stores/search'),
    SearchIndexItem = require('./SearchIndexItem'),
    SessionStore = require('../../stores/session');

var SearchIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return({
      searching: false,
      searchString: '',
      selectedItem: undefined,
      users: SearchStore.all()
    });
  },
  render: function () {
    return (
      <div id='search-bar-container'>
        <form onSubmit={this.onSubmit}>
          <input autoComplete='off'
            id='search-bar'
            onChange={this.onSearchStringChange}
            onFocus={this.showIndexItems}
            placeholder='Search Faceplace'
            ref='searchBar'
            value={this.state.searchString} />
        </form>
        <div id='search-index' className='overlay'>
          {this.renderSearchIndexItems()}
        </div>
      </div>
    );
  },
  renderSearchIndexItems: function () {
    if (this.state.searching) {
      return this.state.users.map(function (user, idx) {
        return(
          <SearchIndexItem idx={idx}
            key={idx}
            onFollowLink={this.onFollowLink}
            onMouseOver={this.onMouseOver}
            selectedItem={this.state.selectedItem}
            user={user} />
        );
      }.bind(this));
    }
  },
  componentDidMount: function () {
    this.SearchListener = SearchStore.addListener(this.onSearchStoreChange);
  },
  componentWillUnmount: function () {
    this.SearchListener.remove();
  },
  clickOutListener: function (e) {
    if (!this.refs.searchBar.contains(e.target)) {
      this.hideIndexItems();
    }
  },
  arrowListener: function (e) {
    if (e.key === 'ArrowUp') {
      var difference = -1;
    } else if (e.key === 'ArrowDown') {
      var difference = 1;
    } else {
      return
    }
    this.arrowScroll(difference);
  },
  arrowScroll: function (difference) {
    if (this.state.selectedItem === undefined) {
      var selectedItem = difference - 1;
    } else {
      var selectedItem = this.state.selectedItem + difference;
    }
    if (selectedItem < 0) {
      selectedItem = undefined;
    } else if (selectedItem + 1 > this.state.users.length) {
      selectedItem = this.state.users.length - 1;
    }
    this.setState({ selectedItem: selectedItem });
  },
  hideIndexItems: function (e) {
    document.removeEventListener('click', this.clickOutListener);
    document.removeEventListener('keyup', this.arrowListener);
    this.setState({ searching: false, selectedItem: undefined });
  },
  onFollowLink: function () {
    if (this.state.selectedItem === undefined) { return }
    document.removeEventListener('click', this.clickOutListener);
    document.removeEventListener('keyup', this.arrowListener);
    var id = this.state.users[this.state.selectedItem].userId;
    this.setState({
      searching: false,
      searchString: '',
      selectedItem: undefined
    }, function () {
      this.refs.searchBar.blur();
      this.context.router.push('/users/' + id);
      Util.jumpToTop();
    }.bind(this));
  },
  onMouseOver: function (e) {
    if (parseInt(e.target.dataset.idx) !== this.state.selectedItem) {
      this.setState({ selectedItem: parseInt(e.target.dataset.idx) });
    }
  },
  onSearchStoreChange: function (e) {
    this.setState({ users: SearchStore.all() }, this.setSelectedItem);
  },
  onSearchStringChange: function (e) {
    this.setState({ searchString: e.target.value }, function () {
      ClientActions.fetchSearchResults(this.state.searchString);
    });
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.onFollowLink();
  },
  setSelectedItem: function () {
    if (this.state.selectedItem === undefined) { return }
    if (this.state.users.length === 0
      && this.state.selectedItem !== undefined) {
      this.setState({ selectedItem: undefined })
    } else if (this.state.selectedItem >= this.state.users.length) {
      this.setState({ selectedItem: this.state.users.length - 1 })
    }
  },
  showIndexItems: function (e) {
    if (this.state.searching) { return }
    ClientActions.fetchSearchResults(this.state.searchString);
    this.setState({ searching: true }, function () {
      document.addEventListener('click', this.clickOutListener);
      document.addEventListener('keyup', this.arrowListener);
    });
  }
});

module.exports = SearchIndex;
