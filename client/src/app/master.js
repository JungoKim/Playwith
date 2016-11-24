var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { AppBar,
       Snackbar } = require('material-ui');

var AppBar = require('./app_bar.js');

var Master = React.createClass({

  getInitialState: function() {
    return {
      mobileView : null,
      snackbarOpen : false,
      snackbarMsg : ""
    };
  },

  componentWillMount: function(){
    console.log("master componentWillMount");
    var setMobileViewState = function() {
      this.setState({mobileView: (document.body.clientWidth <= 647)});
    }.bind(this);
    setMobileViewState();
    window.onresize = setMobileViewState;
  },

  componentDidMount: function () {
    document.addEventListener("fbLogin",
      function statusChangeCallback(e) {
        console.log('master fbLogin statusChangeCallback');
        console.log(e.detail.res);
        var response = e.detail.res;
        window.loginStatusCallback(response);
      }.bind(this)
    );

    document.addEventListener("fbUserInfo",
      function statusChangeCallback(e) {
        console.log('master fbUserInfo statusChangeCallback');
        var loginMsg = "안녕하세요, " + document.user.name +"님";
        this.setState({snackbarOpen: true, snackbarMsg: loginMsg});
      }.bind(this)
    );
  },

  render: function() {
    var styles = {
      root: {
        width: '100%',
      }
    };

    return (
      <div style={styles.root}>
        <AppBar />
        <RouteHandler />
        <Snackbar
          ref="snackbar"
          open={this.state.snackbarOpen}
          onRequestClose={this._handleSnackBarClose}
          message={this.state.snackbarMsg}
          autoHideDuration={1500} />
      </div>
    );
  },

  _handleSnackBarClose: function() {
     this.setState({snackbarOpen: false});
  },
});

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
