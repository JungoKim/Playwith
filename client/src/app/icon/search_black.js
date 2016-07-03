var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var SearchBlack = React.createClass({
  render: function() {
    return (
      <SvgIcon {...this.props} style={{ width : '32px', height : '32px'}} >
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }
});

module.exports = SearchBlack;