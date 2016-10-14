var React = require('react');
var Router = require('react-router');

var mui = require('material-ui');
var { Card,
  CardHeader,
  CardText,
  CardActions,
  Avatar,
  DatePicker,
  TimePicker,
  FlatButton,
  IconButton,
  TextField,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  SelectField,
  RaisedButton } = mui;

var { Colors, Spacing, Typography } = mui.Styles;

var Back = require('./svg/back.js');
var LocationIcon = require('./svg/location_icon.js');
var TimeIcon = require('./svg/time_icon.js');
var MapLocation = require('./svg/map_location.js');

var CreatePlay = React.createClass({

  getInitialState: function() {
    return {
      gameValue: '1',
      maxMemberValue: '1',
      timeValue: null,
      dateValue: null
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
      createButton: {
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
        paddingBottom: 0,
        fontSize: 15
      },
      descriptionCardText: {
        paddingTop: 8,
        paddingBottom: 0,
        fontSize: 15,
        marginTop: -26
      },
      locationCardText: {
        paddingTop: 8,
        paddingBottom: 0,
        fontSize: 15,
        overflow: 'hidden'
      },
      lastCardText: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 15,
        marginBottom: 16,
        overflow: 'auto'
      },
      gameSelectField: {
        width : 'calc(50% - 15px)',
        marginRight: 30,
      },
      maxMemberSelectField: {
        width : 'calc(50% - 15px)',
      },
      descriptionTextField: {
        width : "100%",
      },
      locationTextField: {
        width : "calc(100% - 100px)",
        float: 'left',
      },
      datePicker: {
        width : 'calc(50% - 15px)',
        marginRight: 30,
        float: 'left'
      },
      timePicker: {
        width : 'calc(50% - 15px)',
        float: 'left'
      },
    };

    this.gameItems = [
      { payload: '1', text: '테니스' },
      { payload: '2', text: '테니스' },
      { payload: '3', text: '농구' },
      { payload: '4', text: '농구' },
      { payload: '5', text: '농구' },
    ];

    this.maxMemberItem = [
      { payload: '1', text: '1명' },
      { payload: '2', text: '2명' },
      { payload: '3', text: '3명' },
      { payload: '4', text: '4명' },
      { payload: '5', text: '5명' },
    ];


    return (
      <div style={styles.root}>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild={true} float="left">
            <IconButton style={styles.iconButton} tooltip={window.textSet.back} onTouchTap={this.handleBackButtonTouchTap} >
              <Back />
            </IconButton>
          </ToolbarGroup>
          <ToolbarTitle text={window.textSet.createPlay} style={styles.toolbarTitle} />
          <ToolbarGroup float="right">
            <RaisedButton label={window.textSet.create} secondary={true} style={styles.createButton} />
          </ToolbarGroup>
        </Toolbar>
        <Card style={styles.card}>
          <CardText style={styles.cardText}>
            <SelectField
              ref="gameSelectField"
              style={styles.gameSelectField}
              value={this.state.gameValue}
              floatingLabelStyle={{color: "rgba(0,0,0,0.3)"}}
              floatingLabelText={window.textSet.gameSelect}
              onChange={this.handleSelectValuechange.bind(null, 'gameValue')}
              menuItems={this.gameItems} />
            <SelectField
              ref="maxMemberSelectField"
              style={styles.maxMemberSelectField}
              value={this.state.maxMemberValue}
              floatingLabelStyle={{color: "rgba(0,0,0,0.3)"}}
              floatingLabelText={window.textSet.maxMember}
              onChange={this.handleSelectValuechange.bind(null, 'maxMemberValue')}
              menuItems={this.maxMemberItem} />
          </CardText>
          <CardText style={styles.descriptionCardText}>
            <TextField
              style={styles.descriptionTextField}
              floatingLabelStyle={{color: "rgba(0,0,0,0.3)"}}
              underlineFocusStyle={{borderColor: Colors.grey500}}
              ref="descriptionField"
              rows={1}
              rowsMax={7}
              floatingLabelText={window.textSet.description}
              multiLine={true} />
          </CardText>
          <CardText style={styles.locationCardText}>
            <div>
              <TextField
                style={styles.locationTextField}
                floatingLabelStyle={{color: "rgba(0,0,0,0.3)"}}
                underlineFocusStyle={{borderColor: Colors.grey500}}
                ref="locationField"
                floatingLabelText={window.textSet.location}
                multiLine={false} />
              <div style={{float: 'left', width: 90, height: 70, marginTop: 4, marginLeft: 10}}>
                <IconButton style={{width: 60, height: 60, marginLeft: 15}} >
                  <MapLocation color="rgba(0,0,0,0.7)"/>
                </IconButton>
                <div style={{fontSize: 11, marginTop : -16, textAlign: 'center', color:"rgba(0,0,0,0.3)"}}> {window.textSet.mapSelect} </div>
              </div>
            </div>
          </CardText>
          <CardText style={styles.lastCardText}>
            <DatePicker
              hintText={window.textSet.date}
              ref="datePicker"
              formatDate={this.formatDate}
              textFieldStyle={styles.datePicker} />
            <TimePicker
              format="ampm"
              hintText={window.textSet.time}
              ref="timePicker"
              textFieldStyle={styles.timePicker} />
          </CardText>
        </Card>
      </div>
    );
  },
  handleBackButtonTouchTap: function(e) {
    window.history.back();
  },

  handleSelectValuechange: function(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  },

  getGame: function() {
    return this.gameItems[parseInt(this.state.gameValue)-1].text;
  },

  getMaxMember: function() {
    return this.maxMemberItems[parseInt(this.state.maxMember)-1].text;
  },

  formatDate: function(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
});


CreatePlay.contextTypes = {
  router: React.PropTypes.func
};

module.exports = CreatePlay;
