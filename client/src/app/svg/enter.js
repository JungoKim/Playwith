var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var Enter = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props} >
        <path fill="#616161" d="M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z"></path>
      </SvgIcon>
    );
  }

});

module.exports = Enter;