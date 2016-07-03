var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { CircularProgress } = require('material-ui');

var Map = React.createClass({

  render: function() {
    var tagLigeMarginTop = (window.innerHeight - 48) / 2;

    var styles = {
      root: {
        marginTop: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
      },
    };

    return (
      <div style={styles.root}>
        Map
      </div>
    );
  }
});

Map.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Map;
