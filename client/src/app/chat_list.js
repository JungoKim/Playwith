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
                backgroundColor : Colors.grey100,
      },
      listContainer:  {
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 2
      },
      leftAvataIcon: {
        width: 38,
        height: 38,
      },
      rightDiv: {
        padding : '0px',
        width : 48,
        height : 20,
        top: 7,
        right: 0,
        margin : "12px 0px 0px 0px",
        fontSize: 12
      },
      commentContainer: {
        color: Colors.lightBlack,
        fontSize: 12
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
        var date = this.readableDate(comment.date.S);

        return (
          <div>
            <ListDivider />
            <ListItem
              disabled={true}
              style={{paddingRight: 16, paddingBottom: 10}}
              leftAvatar={<Avatar src={profile} style={styles.leftAvataIcon}></Avatar>}
              rightIcon={
                <div style={styles.rightDiv}>
                  {date}
                </div>
              }
              primaryText={
                 <span style={{fontSize: 14}}>
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
  readableDate: function(datetime) {
    var currentTime = new Date().getTime();
    var sec =  (currentTime - datetime) / 1000;

    if(sec < 60)
      return sec.toFixed(0) + ' 초';

    var min = sec / 60;
    if(min < 60)
      return min.toFixed(0) + ' 분';

    var hour = min / 60;
    if(hour < 24)
      return hour.toFixed(0) + ' 시간';

    var day = hour / 24;
    if(day < 7)
      return day.toFixed(0) + ' 일';

    var week = day / 7;
    if(week < 5)
      return week.toFixed(0) + ' 주';

    var month = day / 30;
    if(month < 12)
      return month.toFixed(0) + ' 월';

    var year = day / 365;
    return year.toFixed(0) + ' 년';
  },
});

ChatList.contextTypes = {
  router: React.PropTypes.func
};

module.exports = ChatList;
