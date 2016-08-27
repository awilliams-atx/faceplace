var React = require('react'),
    ClientActions = require('../../../../actions/client_actions'),
    UserStore = require('../../../../stores/user');

var PolyIntroItem = React.createClass({
  getInitialState: function () {
    return this.initialState();
  },
  initialState: function () {
    var state = { editing: false }
    this.props.items.forEach(function (item) {
      state[item.name] = UserStore.user()[item.name];
    });
    return state;
  },
  render: function () {
    if (this.state.editing) {
      return (
        <form id='intro-form' onSubmit={this.onSubmit} >
          {this.renderInputs()}
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
  renderInputs: function () {
    return this.props.items.map(function (item, idx) {
      if (idx === 0) {
        return (
          <input value={this.state[item.name] || ''}
            data-idx={idx}
            key={idx}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            placeholder={this.props.items[idx].placeholder}
            ref='autoFocus' />
        );
      } else {
        return (
          <input value={this.state[item.name] || ''}
            data-idx={idx}
            key={idx}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            placeholder={this.props.items[idx].placeholder} />
        );
      }
    }.bind(this));
  },
  componentDidMount: function () {
    this.UserListener = UserStore.addListener(this.onUserStoreChange);
  },
  componentWillUnmount: function () {
    this.UserListener.remove();
  },
  clickOutListener: function (e) {
    console.log('uh');
    var form = document.getElementById('intro-form');
    if (!this.submittingOrCanceling(e) && !form.contains(e.target)) {
      this.setState({ editing: false }, function () {
        document.removeEventListener('click', this.clickOutListener);
      }.bind(this));
    }
  },
  onCancel: function (e) {
    e.preventDefault();
    var state = { editing: false }
    this.props.items.forEach(function (item) {
      state[item.name] = UserStore.user()[item.name];
    });
    this.setState(state, function () {
      document.removeEventListener('click', this.clickOutListener);
    }.bind(this));
  },
  onChange: function (e) {
    var state = {};
    state[this.props.items[e.currentTarget.dataset.idx].name] = e.target.value;
    this.setState(state);
  },
  onSubmit: function (e) {
    e.preventDefault();
    var submission = {};
    this.props.items.forEach(function (item) {
      submission[item.name] = this.state[item.name];
    }.bind(this));
    ClientActions.submitProfile(submission);
    this.setState({ editing: false }, function () {
      document.removeEventListener('click', this.clickOutListener);
    }.bind(this));
  },
  onUserStoreChange: function (e) {
    var state = {};
    this.props.items.forEach(function (item) {
      state[item.name] = UserStore.user()[item.name];
    });
    this.setState(state);
  },
  showEdit: function (e) {
    e.preventDefault();
    document.addEventListener('click', this.clickOutListener);
    if (!this.props.authorizedToEdit) { return; }
    this.setState({ editing: true }, function () {
      this.refs.autoFocus.focus();
    });
  },
  submittingOrCanceling: function (e) {
    return ['intro-submit', 'intro-cancel'].indexOf(e.target.id) >= 0;
  }
});

module.exports = PolyIntroItem;
