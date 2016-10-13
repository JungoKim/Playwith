var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var Logout = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props} >
        <path fill="#616161" d="M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z"></path>
      </SvgIcon>
    );
  }

});

module.exports = Logout;