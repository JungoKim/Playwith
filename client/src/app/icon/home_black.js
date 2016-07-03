var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var HomeBlack = React.createClass({
  render: function() {
    return (
      <SvgIcon {...this.props} style={{ width : '32px', height : '32px'}} >
         <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
         <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }
});

module.exports = HomeBlack;