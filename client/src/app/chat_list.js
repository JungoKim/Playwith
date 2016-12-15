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

var Spinner = require('./spinner.js');

var ChatList = React.createClass({
  render: function() {
    var styles = {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
      },
      listContainer:  {
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 2
      },
      leftAvataIcon: {
        width: 48,
        height: 48,
      },
      rightDiv: {
        padding : '0px',
        width : 48,
        height : 48,
        top: 3,
        right: 0,
        margin : "12px 0px 0px 0px"
      },
      commentContainer: {
        color: Colors.lightBlack,
        fontSize: 14
      },
    };

    if (this.props.data.length < 1) {
      console.log("Warning, No chatList Data...");
      this.list = function () {
        return (
          <div></div>
        );
      }();
    } else {
      this.content = this.props.data.map(function (comment) {
        if (comment === null || comment === undefined)
          return;

        var name = comment.user.S.split('__')[1];
        var profile = comment.user.S.split('__')[2];
        var date = comment.date.S;

        return (
          <div>
            <ListDivider />
            <ListItem
              style={{paddingRight: 16}}
              leftAvatar={<Avatar src={profile} style={styles.leftAvataIcon}></Avatar>}
              rightIcon={
                <div style={styles.rightDiv}>
                  {date}
                </div>
              }
              primaryText={
                 <span>
                   {name}
                   <br/>
                   <span style={styles.commentContainer}>{comment.comment.S}</span>
                 </span>
              } />
          </div>
        );
      }.bind(this));

      this.list = <List style={styles.listContainer} >
                    {this.content}
                    <ListDivider />
                  </List>;
    }

    return (
      <div style={styles.root}>
        {this.list}
      </div>
    );
  },
});

ChatList.contextTypes = {
  router: React.PropTypes.func
};

module.exports = ChatList;
