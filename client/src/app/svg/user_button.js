var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var UserButton = React.createClass({
  render: function() {
    return (
      <SvgIcon {...this.props} style={{ width : '32px', height : '32px'}} >
        <path fill={this.props.color} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }
});

module.exports = UserButton;