var React = require('react');
var Router = require('react-router');

var mui = require('material-ui');
var { Card,
  Checkbox,
  FlatButton,
  IconButton,
  TextField,
  Paper,
  Snackbar,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  RaisedButton } = mui;

var { Colors, Spacing, Typography } = mui.Styles;

var CreatePlay = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  componentWillMount: function () {
  },

  componentDidMount: function () {
  },

  componentWillUpdate: function(nextProps, nextState) {
  },

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
        CreatePlay
      </div>
    );
  }
});

CreatePlay.contextTypes = {
  router: React.PropTypes.func
};

module.exports = CreatePlay;
