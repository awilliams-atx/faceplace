window.ClientActions = require('./actions/client_actions');
window.CommentStore = require('./stores/comment');

// FILES REQUIRED ABOVE ARE FOR TESTING PURPOSES ONLY AND SHOULD BE REMOVED FROM PRODUCTION.

var React = require('react'),
    ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,

    LogInForm = require('./components/LogInForm'),
    Main = require('./components/Main'),
    Profile = require('./components/profile/Profile'),
    Timeline = require('./components/profile/timeline/Timeline'),

    ConfirmationStore = require('./stores/confirmation'),
    SessionStore = require('./stores/session'),
    SessionApiUtil = require('./util/session_api_util');

var App = React.createClass({
  getInitialState: function () {
    return ({
      confirmation: ConfirmationStore.confirmation(),
      confirming: false
    });
  },
  render: function () {
    var confirmation = <div className='empty-confirmation-container' />;

    if (this.state.confirming) {
      var opts = this.state.confirmation;

      var cancelText = opts.cancelText,
          cancelCallback = opts.cancelCallback,
          confirmText = opts.confirmText,
          confirmCallback = opts.confirmCallback,
          message = opts.message,
          title = opts.title;

      var wrapUp = function (response) {

        this.setState({confirming: false}, function () {
          if (response.confirm) {
            confirmCallback();
          } else if (response.cancel) {
            cancelCallback();
          }
        });
      }.bind(this);

      var clickConfirm = function () {
        wrapUp({confirm: true});
      };

      var clickCancel = function () {
        wrapUp({cancel: true});
      };

      confirmation = (
        <div className='modal-background'>
          <aside className='modal-container group'>
            <header className='modal-header'>
              <strong>{title}</strong>
            </header>
            <div className='modal-message-container'>
              <mark>{message}</mark>
            </div>
            <br />
            <hr />
            <footer className='modal-footer'>
              <div className='modal-button-container group'>
                <button className='button button-blue modal-confirm-button'
                  onClick={clickConfirm}>{confirmText}
                </button>
                <button className='button button-gray modal-cancel-button'
                  onClick={clickCancel}>{cancelText}
                </button>
              </div>
            </footer>
          </aside>
        </div>
      );
    }

    return (
      <div id='app'>
        {confirmation}
        {this.props.children}
      </div>
    );
  },
  componentDidMount: function () {
    this.confirmationListener =
      ConfirmationStore.addListener(this.onConfirmationStoreChange);
  },
  componentWillUnmount: function () {
    this.confirmationListener.remove();
  },
  toggleModal: function (e) {
    e.preventDefault();
    this.setState({confirming: false});
  },
  onConfirmationStoreChange: function () {
    var confirming = !!ConfirmationStore.confirmation();
    this.setState({
      confirmation: ConfirmationStore.confirmation(),
      confirming: true
    });
  }
});

var routes = (
  <Route path='/' component={ App } >
    <IndexRoute component={ Main } onEnter={ _ensureLoggedIn } />
    <Route path='login' component={ LogInForm } onEnter={ _ensureNotLoggedIn }/>
    <Route path='main' component={ Main } onEnter={ _ensureLoggedIn } />
    <Route path='users/:userId' component={ Profile } onEnter={ _ensureLoggedIn } >
      <IndexRoute component= { Timeline } />
      <Route path='timeline' component= { Timeline } />
    </Route>
  </Route>
);

function _ensureLoggedIn (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn () {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }

    asyncDoneCallback();
  }
}

function _ensureNotLoggedIn (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfLoggedIn);
  }

  function redirectIfLoggedIn () {
    if (SessionStore.isUserLoggedIn()) {
      replace('/');
    }

    asyncDoneCallback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  var router = <Router history={hashHistory} routes={routes} />;
  ReactDOM.render(router, root);
});
