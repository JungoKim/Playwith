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
var LoginSel = require('./login_select.js');

var PlayInfo = React.createClass({

  getInitialState: function() {
    return {
      dialOpen : false,
    };
  },

  componentWillMount: function () {
    if (selectedPlay === undefined) {
      console.log("the selectedPlay is undefined");
      this.context.router.transitionTo('home');
      return;
    }
  },

  componentDidMount: function () {
    var mapOptions = {
      center: new naver.maps.LatLng(selectedPlay.locationLat.S, selectedPlay.locationLng.S),
      zoom: 8
    };
    selectMap = new naver.maps.Map('locationInMap', mapOptions);

    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(selectedPlay.locationLat.S, selectedPlay.locationLng.S),
      map: selectMap
    });
  },

  componentWillUpdate: function(nextProps, nextState) {
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
      },
      map : {
        width: 'calc(100% - 32px)',
        marginRight: 16,
        marginLeft: 16,
        marginBottom : 10,
        height: 150
      },
    };

    var distKM = window.calcDistKM(selectedPlay.locationLat.S, selectedPlay.locationLng.S) + "km";
    var dispDate = window.displayDate(selectedPlay.playDate.S);

    return (
      <div style={styles.root}>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup style={{marginLeft: -12}} firstChild={true} float="left">
            <IconButton style={styles.iconButton} tooltip={window.textSet.back} onTouchTap={this._handleBackButtonTouchTap} >
              <Back />
            </IconButton>
          </ToolbarGroup>
          <ToolbarTitle text={window.textSet.playInfo} style={styles.toolbarTitle} />
          <ToolbarGroup float="right">
            <RaisedButton
              label={window.textSet.join}
              secondary={true}
              style={styles.joinButton}
              onTouchTap={this._handleJoinButtonTouchTap} />
          </ToolbarGroup>
        </Toolbar>
        <Card style={styles.card}>
          <CardHeader
            title={
              <div style={styles.cardTitleText}>
               {selectedPlay.playEvent.S}
              </div>
            }
            avatar={<Avatar src={selectedPlay.playEventImage.S} style={styles.leftAvataIcon}></Avatar>}/>
          <CardText style={styles.cardText}>
            {selectedPlay.desc.S}
          </CardText>
          <CardText style={styles.cardText}>
            <TimeIcon style={styles.time} /> {dispDate}
          </CardText>
          <CardText style={styles.cardText}>
            <LocationIcon style={styles.location} /> {selectedPlay.location.S}, {distKM}
          </CardText>
          <div id='locationInMap' style={styles.map}>
          </div>
          <div style={styles.joinMemberContainer}>
            <div style={styles.joinStatus}>{parseInt(selectedPlay.maxJoin.N) - selectedPlay.joinList.SS.length}{window.textSet.memberLeft}</div>
            <Avatar src={selectedPlay.profile.S} style={styles.joinMemberAvatar}></Avatar>
          </div>
          <CardText style={styles.lastCardText}>
          </CardText>
        </Card>
        <LoginSel
          openstate={this.state.dialOpen}
          close={this._loginClose}>
        </LoginSel>
      </div>
    );
  },
  _handleBackButtonTouchTap: function(e) {
    window.history.back();
  },

  _handleJoinButtonTouchTap: function(e) {
    if (document.user !== undefined) {
      // call join API
    }
    else {
      this._loginOpen();
    }
  },

  _loginOpen: function() {
    this.setState({dialOpen: true});
  },

  _loginClose: function() {
    this.setState({dialOpen: false});
  },
});

PlayInfo.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PlayInfo;
