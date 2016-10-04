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
var LocationIcon = require('./svg/location_icon.js');
var TimeIcon = require('./svg/time_icon.js');

var PlayList = React.createClass({
  render: function() {
    var styles = {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
      },
      leftAvataIcon: {
        width: 48,
        height: 48,
      },
      location: {
        width: 16,
        height: 16,
        marginTop : -2,
        verticalAlign: 'middle'
      },
      time: {
        width: 16,
        height: 16,
        marginTop : -2,
        verticalAlign: 'middle'
      },
      rightDiv: {
        padding : '0px',
        width : 48,
        height : 80,
        top: 3,
        right: 0,
      },
      rightSportsIcon: {
        width: 44,
        height: 44,
      },
      rightJoinStatus: {
        width: 46,
        height: 20,
        paddingTop: 6,
        color: Colors.white,
        fontSize: 13,
        textAlign: 'center',
        borderRadius: 13,
        background: Colors.grey600,
      }
    };

    if (this.props.data.length < 1) {
      console.log("Warning, No playList Data...");
      list = function () {
        return (
          <div></div>
        );
      }();
    } else {
      list = this.props.data.map(function (play) {
        if (play === null || play === undefined)
          return;
        return (
          <div>
            <ListDivider />
            <ListItem
              style={{paddingRight: 16}}
              leftAvatar={<Avatar src={play.playImage.S} style={styles.leftAvataIcon}></Avatar>}
              rightIcon={
                <div style={styles.rightDiv}>
                  <Avatar src={play.userProfile.S} style={styles.rightSportsIcon}></Avatar>
                  <div style={styles.rightJoinStatus}>{play.joinList.length} / {play.maxJoin.S}</div>
                </div>
              }
              primaryText={
                 <span>
                   {play.playClass.S} <br/>
                   <span style={{color: Colors.lightBlack, fontSize: 14}}>{play.content.S}</span>
                 </span>
              }
              secondaryText={
                <span>
                  <span style={{color: Colors.darkBlack}}><LocationIcon style={styles.location} /> {play.location.S}, {play.gps.S}</span><br/>
                  <span style={{color: Colors.darkBlack}}><TimeIcon style={styles.time} /> {play.playDate.S} 남음</span>
                </span>
              }
              secondaryTextLines={2}
              onTouchTap={this.handlePlayInfoTouchTap.bind(null, play)} />
          </div>
        );
      }.bind(this));
    }

    return (
      <div style={styles.root}>
        <List
          style={{paddingTop: 0}} >
          {list}
          <ListDivider />
          <ListItem
            primaryText={
              <div style={{color: Colors.darkBlack, fontSize: 14, textAlign: "center"}}>더보기</div>
            } />
          <ListDivider />
        </List>
      </div>
    );
  },

  handlePlayInfoTouchTap : function(play, e) {
    selectedPlay = play;
    this.context.router.transitionTo('play_info');
  },
});

PlayList.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PlayList;
