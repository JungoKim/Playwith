var React = require('react');
var Router = require('react-router');

var mui = require('material-ui');
var { Card,
  CardHeader,
  CardText,
  CardActions,
  Avatar,
  FlatButton,
  IconButton,
  TextField,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  RaisedButton } = mui;

var { Colors, Spacing, Typography } = mui.Styles;

var Back = require('./svg/back.js');
var LocationIcon = require('./svg/location_icon.js');
var TimeIcon = require('./svg/time_icon.js');

var PlayInfo = React.createClass({

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
      toolbar: {
        padding : '0px 10px 0px 10px',
        height: 48,
      },
      iconButton: {
        marginRight: 40,
      },
      toolbarTitle: {
        fontSize: 16,
        color: Colors.grey700,
        textAlign: 'center',
        width: 'calc(100% - 177px)',
        height:  48,
        paddingRight: 0,
        marginTop: -3,
      },
      joinButton: {
        margin:'6px 0px 0px 0px',
      },
      card: {
        margin: 5
      },
      cardTitleText: {
        fontSize: 16,
        height: 40,
        paddingTop: 14
      },
      cardText: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 15
      },
      lastCardText: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 15,
        marginBottom: 16
      },
      leftAvataIcon: {
        width: 42,
        height: 42,
        marginRight: 10
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
      joinMemberContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        overflow: "auto"
      },
      joinStatus: {
        width: 120,
        height: 36,
        paddingTop: 0,
        textAlign: 'center',
        borderRadius: 36,
        color: Colors.white,
        background: Colors.grey500,
        lineHeight: 2.5,
        float: "left",
        fontSize: 15,
      },
      joinMemberAvatar: {
        float: "left",
        width: 36,
        height: 36,
        marginLeft: 5
      }
    };

    return (
      <div style={styles.root}>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild={true} float="left">
            <IconButton style={styles.iconButton} tooltip={window.textSet.back} onTouchTap={this.handleBackButtonTouchTap} >
              <Back />
            </IconButton>
          </ToolbarGroup>
          <ToolbarTitle text={window.textSet.playInfo} style={styles.toolbarTitle} />
          <ToolbarGroup float="right">
            <RaisedButton label={window.textSet.join} secondary={true} style={styles.joinButton} />
          </ToolbarGroup>
        </Toolbar>
        <Card style={styles.card}>
          <CardHeader
            title={
              <div style={styles.cardTitleText}>
               {selectedPlay.playClass.S}
              </div>
            }
            avatar={<Avatar src={selectedPlay.playImage.S} style={styles.leftAvataIcon}></Avatar>}/>
          <CardText style={styles.cardText}>
            {selectedPlay.content.S}
          </CardText>
          <CardText style={styles.cardText}>
            <LocationIcon style={styles.location} /> {selectedPlay.location.S}, {selectedPlay.gps.S}
          </CardText>
          <CardText style={styles.cardText}>
            <TimeIcon style={styles.time} /> {selectedPlay.playDate.S} 남음
          </CardText>
          <div style={styles.joinMemberContainer}>
            <div style={styles.joinStatus}>{parseInt(selectedPlay.maxJoin.S) - selectedPlay.joinList.length} 명 참여가능</div>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
            <Avatar src={selectedPlay.userProfile.S} style={styles.joinMemberAvatar}></Avatar>
          </div>
          <CardText style={styles.lastCardText}>
          </CardText>
        </Card>
      </div>
    );
  },
  handleBackButtonTouchTap: function(e) {
    window.history.back();
  },
});

PlayInfo.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PlayInfo;
