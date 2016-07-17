var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var MapButton = React.createClass({
  render: function() {
    return (
      <SvgIcon {...this.props} style={{ width : '32px', height : '32px'}} >
        <path fill={this.props.color} d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }
});

module.exports = MapButton;