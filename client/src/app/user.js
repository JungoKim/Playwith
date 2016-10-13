var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { CircularProgress } = require('material-ui');

var User = React.createClass({

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
        User
      </div>
    );
  }
});

User.contextTypes = {
  router: React.PropTypes.func
};

module.exports = User;