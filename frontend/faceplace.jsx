var React = require('react'),
    ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,
    Redirect = ReactRouter.Redirect

    LogInForm = require('./components/LogInForm'),
    Main = require('./components/Main'),
    Profile = require('./components/profile/Profile'),
    Timeline = require('./components/profile/timeline/Timeline'),

    ModalStore = require('./stores/modal'),
    SessionStore = require('./stores/session'),
    SessionApiUtil = require('./util/session_api_util');

var App = React.createClass({
  getInitialState: function () {
    return ({
      modal: ModalStore.confirmation(),
      isModalDisplayed: false
    });
  },
  render: function () {
    var confirmation =
      <div id='modal-background' className='modal-transparent' />;

    if (this.state.isModalDisplayed) {
      var opts = this.state.modal;

      var cancelText = opts.cancelText,
          cancelCallback = opts.cancelCallback,
          confirmText = opts.confirmText,
          confirmCallback = opts.confirmCallback,
          message = opts.message,
          title = opts.title;

      var wrapUp = function (response) {

        this.setState({isModalDisplayed: false}, function () {
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
        <div id='modal-background' className='modal-opaque'>
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
    this.modalListener =
      ModalStore.addListener(this.onModalStoreChange);
  },
  componentWillUnmount: function () {
    this.modalListener.remove();
  },
  onModalStoreChange: function () {
    var isModalDisplayed = !!ModalStore.confirmation();
  onConfirmationStoreChange: function () {
    var confirming = !!ConfirmationStore.confirmation();
    this.setState({
      modal: ModalStore.confirmation(),
      isModalDisplayed: true
    });
  }
});

var routes = (
  <Route path='/' component={ App } >
    <IndexRoute component={ Main } onEnter={ redirectToProfile } />
    <Route path='login' component={ LogInForm } onEnter={ ensureNotLoggedIn }/>
    <Route path='main' component={ Main } onEnter={ redirectToProfile } />
    <Route path='users/:userId' component={ Profile } onEnter={ ensureLoggedIn } >
      <IndexRoute component= { Timeline } />
      <Route path='timeline' component= { Timeline } />
    </Route>
  </Route>
);

function ensureLoggedIn (nextState, replace, asyncDoneCallback) {
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

function ensureNotLoggedIn (nextState, replace, asyncDoneCallback) {
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

function redirectToProfile (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn () {
    if (SessionStore.isUserLoggedIn()) {
      replace('/users/' + SessionStore.currentUser().id);
    } else {
      replace('/login')
    }

    asyncDoneCallback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  var router = <Router history={hashHistory} routes={routes} />;
  ReactDOM.render(router, root);
});
