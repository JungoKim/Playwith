var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { CircularProgress } = require('material-ui');

var Home = React.createClass({

  render: function() {
    var tagLigeMarginTop = (window.innerHeight - 45) / 2;

    var styles = {
      root: {
        textAlign: 'center',
        marginTop: tagLigeMarginTop,
      },
    };

    return (
      <div style={styles.root}>
        <CircularProgress
          size={0.5}
          color='#000' />
      </div>
    );
  }
});

Home.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Home;
