var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var {
  Avatar,
  List,
  ListItem,
  ListDivider,
  CircularProgress
} = require('material-ui');

var SelectTarget = require('./select_target.js');
var PlayList = require('./play_list.js');
var WriteButton = require('./write_button.js');

playList = [];

selectedPlay = playList[0];

var Home = React.createClass({
  getInitialState: function() {
    return {
      playListData: playList,
    };
  },

  componentWillMount: function () {
    console.log('home componentWillMount called');
    console.log('window.playListState is ', window.playListState);

    if (window.playListState === undefined || window.playListState === "UpdateNeeded") {
      var query = {};
      query.state = 'open';
      query.playDate = new Date().getTime();
      window.playListState = "Updating";

      $.ajax({
        url: window.server.url+'/getPlay',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          playList = data.Items;
          this.setState({playListData: playList});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.playListState = "Updated";
    } else if (window.playListState === "Updated"){
      this.setState({playListData: playList});
    }
  },

  render: function() {
    var styles = {
      root: {
        marginTop: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
      }
    };

    return (
      <div style={styles.root}>
        <SelectTarget />
        <PlayList
          data={this.state.playListData} />
        <WriteButton />
      </div>
    );
  }
});

Home.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Home;
