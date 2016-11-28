var React = require('react');
var mui = require('material-ui');
var { FlatButton, CircularProgress, RaisedButton } = mui;
var { Colors, } = mui.Styles;

var MoreButton = React.createClass({
  getInitialState: function () {
    return {show: 'showButton'};
  },

  render: function () {
    var styles = {
      buttonArea: {
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
      },
      button: {
        width: '100%',
      },
      spinner: {
        margin: '-10px auto',
        display: 'block',
        paddingRight: 10
      },
     };

    var showButtonOrSpinner =
      this.state.show == "showButton" ?
      <RaisedButton
        secondary={true}
        onTouchTap={this.props.onTouchTap}
        label={this.props.label}
        style={styles.button} />
      : <CircularProgress
        style={styles.spinner}
        mode="indeterminate"
        color={Colors.cyan400}
        size={0.5} />;

    return (
      <div style={styles.buttonArea} >
        {showButtonOrSpinner}
      </div>
    );
  },

  showSpinner: function() {
    console.log("showSpinner called")
    this.setState({show : 'showSpinner'})
  },

  showButton: function() {
    this.setState({show : 'showButton'})
  },
});

module.exports = MoreButton;
