var React = require('react');
var Router = require('react-router');
var Clipboard = require('react-copy-to-clipboard');
var mui = require('material-ui');

var { FlatButton,
  Dialog,
  TextField,
  IconButton,
  RaisedButton,
  Snackbar } = mui;

var Colors = mui.Styles.Colors;
var Tooltip = require("react-tooltip");
var Share = require('./svg/share.js');

var SharePlay = React.createClass({
  getInitialState: function() {
    return {
      dialOpen : false,
      copyUrl : '',
      snackbarOpen : false,
      snackbarMsg : "",
    };
  },

  componentWillMount: function () {
    console.log('PlayByIndex componentWillMount called');
    this.playusIndex = this.props.playusIndex;
    this.shareURL= window.client.url+"/#/play_by_index?index="+this.playusIndex;
    this.shareContent = "종목 : " + this.props.event + ", \n"
                        +  this.props.desc + ", \n"
                        + "장소 : " + this.props.location+ ", \n"
                        + "시간 : " + this.props.date+ " \n";
  },

  render: function() {
    var styles = {
      iconButton: {
        float: "right",
      },
      dialCont: {
        width: '160px',
      },
      dialBody:{
        backgroundColor: "#ECEFF1",
        padding: '15px'
      },
      shareBt: {
        width: '100%',
        height: '40px',
        padding: '5px',
      },
      logo: {
        float: 'left',
        width: '30px'
      },
      fontSt:{
        float: 'left',
        marginLeft: 5,
      }
    };

    const actions = [
      <FlatButton
        label={window.textSet.dialogClose}
        keyboardFocused={true}
        onTouchTap={this._onClose} />,
    ];

    return (
      <span>
        <IconButton style={styles.iconButton} onTouchTap={this.handleShareButtonTouchTap}>
          <Share data-tip data-for="share" />
        </IconButton>
        <Tooltip id="share" effect="solid" delayShow={500}>{window.textSet.share}</Tooltip>
        <Dialog
          bodyStyle={styles.dialBody}
          contentStyle={styles.dialCont}
          actions={actions}
          open={this.state.dialOpen}
          onRequestClose={this._onClose}>
          <FlatButton
            style={styles.shareBt}
            onTouchTap={this._facebookShare} >
            <img src="img/facebook-box.png" style={styles.logo}/>
            <div style={styles.fontSt}>Facebook</div>
          </FlatButton>
          <Clipboard
            text={this.state.copyUrl}
            onCopy={this.handleCopy} >
            <FlatButton
              style={styles.shareBt}
              onTouchTap={this._copyUrlShare} >
              <img src="img/paperclip.png" style={styles.logo}/>
              <div style={styles.fontSt}>Copy URL</div>
            </FlatButton>
          </Clipboard>
        </Dialog>
        <Snackbar
          ref="snackbar"
          open={this.state.snackbarOpen}
          onRequestClose={this._handleSnackBarClose}
          message={this.state.snackbarMsg}
          autoHideDuration={1500} />
      </span>
    );
  },

  _handleSnackBarClose: function() {
     this.setState({snackbarOpen: false});
  },

  _facebookShare: function() {
    FB.ui({
      method: 'feed',
      name: "Playus, 운동친구 찾기 프로젝트",
      link: this.shareURL,
      description: this.shareContent,
      caption: 'https://playus.me',
    }, function(response){});
  },

  _copyUrlShare: function() {
    console.log('copy url!!!!!!');
    console.log(this.shareURL);
    this.setState({copyUrl: this.shareURL});
  },

  _onClose: function() {
    this.setState({dialOpen: false});
  },

  handleCopy: function() {
    this.setState({snackbarOpen: true, snackbarMsg: "해당 Play 페이지의 URL를 복사하였습니다."});
  },

  handleShareButtonTouchTap: function() {
    this.setState({dialOpen: true});
  },
});

SharePlay.contextTypes = {
  router: React.PropTypes.func
};

module.exports = SharePlay;
