var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { AppBar,
      AppCanvas,
      Dialog,
      FlatButton,
      FontIcon,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      RaisedButton,
      Styles,
      Snackbar,
      Tab,
      Tabs,
      Paper} = require('material-ui');

var AppBar = require('./app_bar.js');

var Master = React.createClass({
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
