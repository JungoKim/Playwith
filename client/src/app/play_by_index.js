var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var {
  CircularProgress,
  Snackbar
} = require('material-ui');

var PlayByIndex = React.createClass({
  getInitialState: function() {
    return {
      snackbarOpen : false,
      snackbarMsg : "",
    };
  },

  componentWillMount: function () {
    console.log('PlayByIndex componentWillMount called');
    var index = window.location.href.split("index=")[1];
    this.getPlayByIndex(index);
  },

  render: function() {
    var styles = {
      root: {
        marginTop: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
      },
      spinner: {
        margin: '-10px auto',
        display: 'block',
        marginTop: 5,
        paddingRight: 10
      },
    };
    return (
      <div style={styles.root}>
        <CircularProgress
            style={styles.spinner}
            mode="indeterminate"
            color={Colors.cyan400}
            size={0.5} />
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

  getPlayByIndex: function(playusIndex) {
    console.log('getPlayByIndex called');
    var query = {};
    query.playusIndex = playusIndex;

    $.ajax({
      url: window.server.url+'/getPlayByIndex',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData);
        if (recievedData.Item !== undefined) {
            selectedPlay = recievedData.Item;
            history.replaceState(null, null, "/#/home");
            this.context.router.transitionTo('play_info');
        } else {
          this.setState({snackbarOpen: true, snackbarMsg: "해당 Play 페이지를 찾을 수 없습니다."});
          this.context.router.transitionTo('home');
        }
      }.bind(this),
      error: function (xhr, status, erro) {
        this.setState({snackbarOpen: true, snackbarMsg: "해당 Play 페이지를 찾을 수 없습니다."});
        this.context.router.transitionTo('home');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
   },
});

PlayByIndex.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PlayByIndex;
