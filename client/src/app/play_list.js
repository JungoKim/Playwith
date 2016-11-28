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
      listContainer:  {
        paddingTop: 0,
        paddingBottom: 0
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
        margin : "12px 0px 0px 0px"
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
        background: Colors.grey500,
      },
      descContainer: {
        color: Colors.lightBlack,
        fontSize: 14
      },
      locationContainer: {
        color: Colors.darkBlack,
        fontSize: 14,
        position: 'relative',
        top: 6
      },
      playDateContainer: {
        color: Colors.darkBlack,
        fontSize: 14,
        position: 'relative',
        top: 10
      },
    };

    if (this.props.data.length < 1) {
      console.log("Warning, No playList Data...");
      this.list = function () {
        return (
          <div></div>
        );
      }();
    } else {
      this.content = this.props.data.map(function (play) {
        if (play === null || play === undefined)
          return;

        var distKM = window.calcDistKM(play.locationLat.S, play.locationLng.S) + "km";
        var dispDate = window.displayDate(play.playDate.S);
        return (
          <div>
            <ListDivider />
            <ListItem
              style={{paddingRight: 16}}
              leftAvatar={<Avatar src={play.playEventImage.S} style={styles.leftAvataIcon}></Avatar>}
              rightIcon={
                <div style={styles.rightDiv}>
                  <Avatar src={play.profile.S} style={styles.rightSportsIcon}></Avatar>
                  <div style={styles.rightJoinStatus}>{play.joinList.SS.length} / {play.maxJoin.N}</div>
                </div>
              }
              primaryText={
                 <span>
                   {play.playEvent.S}
                   <br/>
                   <span style={styles.descContainer}>{play.desc.S}</span>
                   <br/>
                   <span style={styles.locationContainer}>
                     <LocationIcon style={styles.location} /> {play.location.S}, {distKM}
                   </span>
                   <br/>
                   <span style={styles.playDateContainer}>
                     <TimeIcon style={styles.time} /> {dispDate}
                   </span>
                 </span>
              }
              onTouchTap={this._handlePlayInfoTouchTap.bind(null, play)} />
          </div>
        );
      }.bind(this));


      this.list = <List
                      style={styles.listContainer} >
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

  _handlePlayInfoTouchTap : function(play, e) {
    selectedPlay = play;
    this.context.router.transitionTo('play_info');
  },
});

PlayList.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PlayList;
