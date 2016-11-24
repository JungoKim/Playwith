var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { AppBar } = require('material-ui');

var AppBar = require('./app_bar.js');

var Master = React.createClass({

  getInitialState: function() {
    return {
      mobileView : null,
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
      </div>
    );
  },
});

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
