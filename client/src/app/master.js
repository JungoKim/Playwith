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
      appBar: {
        backgroundColor: '#fafafa',
        position: 'fixed',
        height: 48,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%'
      },
      appBarIconButton: {
        marginLeft : "calc((100% - 48px)/2)",
        padding : 8,
      },
      appBarIconButtonContainer: {
        width: '25%',
        float: 'left',
      }
    };

    return (
      <div>
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
