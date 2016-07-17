var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm'),
    ErrorActions = require('../actions/error_actions'),
    ErrorStore = require('../stores/error'),
    SessionStore = require('../stores/session');

var LogInForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      email: "",
      password: "",
      errors: ErrorStore.errors(),
      loginInputClass: 'login-input'
    };
  },
  render: function () {
    var logInButton = <button className='login-button'>Log In</button>;
    if (this.state.email === "" && this.state.password === "") {
      logInButton = (
        <button onClick={this.guestLogin} className='login-button'>
          Guest
        </button>
      );
    }

    var omniauthButton = (
      <a href='/auth/facebook' className='login-button'>
        Log In with Facebook
      </a>
    );

    var errorsContent;

    if (this.state.errors) {
      errorsContent = (
        <aside id='login-errors-container'>
          {this.state.errors.login}
        </aside>
      );
    } else {
      errorsContent = <div id='empty-errors-content' />;
    }

    return (
      <div className='content'>
        <header className='welcome-header'>
          <nav className='welcome-header-nav group'>
            <a href="/"><img src={window.logoUrl} className='header-logo' /></a>
            <form onSubmit={this.handleSubmit}
                  className='log-in-form'>
              <table>
                <thead>
                  <tr>
                    <td>
                      <label htmlFor="email" ref='autoFocus'>Email</label>
                      </td>
                    <td><label htmlFor="password">Password</label></td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td><input onChange={this.emailChange}
                      onFocus={this.onFocusLoginInput}
                      value={this.state.email}
                      id="email"
                      className={this.state.loginInputClass} /></td>
                    <td><input type="password"
                      onChange={this.passwordChange}
                      onFocus={this.onFocusLoginInput}
                      value={this.state.password}
                      id="password"
                      className={this.state.loginInputClass} /></td>
                    <td>{logInButton}</td>
                    <td>{omniauthButton}</td>
                  </tr>
                </tbody>
              </table>
              {errorsContent}
            </form>
          </nav>
        </header>
        <SignUpForm />
      </div>
    );
  },
  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.onErrorStoreChange);
    this.refs.autoFocus.focus();
  },
  componentWillUnmount: function () {
    this.errorListener.remove();
  },
  emailChange: function (e) {
    this.setState({email: e.target.value}, function () {
      if (this.state.loginInputClass === 'login-input-error') {
        this.setState({
          loginInputClass: 'login-input',
          errors: false
        });
      }
    });
  },
  passwordChange: function (e) {
    this.setState({password: e.target.value}, function () {
      if (this.state.loginInputClass === 'login-input-error') {
        this.setState({
          loginInputClass: 'login-input',
          errors: false
        });
      }
    });
  },
  handleSubmit: function (e, options) {
    var credentials = {};
    e.preventDefault();

    if (options) {
      credentials = options.credentials;
    } else {
      credentials.email = this.state.email;
      credentials.password = this.state.password;
    }
    this.setState({
      email: '',
      password: ''
    }, function () {
      ErrorActions.clearErrors();
      SessionApiUtil.login(credentials, this._redirectToTimeline);
    }.bind(this))
  },
  guestLogin: function (e) {
    var credentials = {email: 'jeff', password: 'starwars'};
    this.handleSubmit(e, {credentials: credentials});
  },
  onErrorStoreChange: function () {
    var errors = ErrorStore.errors();
    var loginInputClass = errors ? 'login-input-error' : 'login-input';
    this.setState({
      errors: errors,
      loginInputClass: loginInputClass
    }, function () {
      this.refs.autoFocus.focus();
    }.bind(this));
  },
  _redirectToTimeline: function () {
    this.context.router.push('/users/' + SessionStore.currentUser().id);
  }
});

module.exports = LogInForm;
