var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { CircularProgress } = require('material-ui');

var Spinner = React.createClass({

  render: function() {
    var tagLigeMarginTop = (window.innerHeight - 48) / 2;

    var styles = {
      root: {
        textAlign: 'center',
        marginTop: tagLigeMarginTop,
        marginLeft: 'auto',
        marginRight: 'auto',
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

Spinner.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Spinner;
