var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');

var { SelectField,
  Styles } = mui;

var { Colors,
  Spacing,
  Typography } = mui.Styles;

var SelectTarget = React.createClass({
  getInitialState: function() {
    return {
      gameValue: '1',
      filterValue: '1'
    };
  },

  render: function() {
    var styles = {
      root:{
        width: 'calc(100% - 30px)',
        height: 80,
        marginLeft: 15,
        marginRight: 15,
      },
      gameSelectField: {
        width : 'calc(50% - 15px)',
        marginRight: 30,
        fontSize : 14,
      },
      filterSelectField: {
        width : 'calc(50% - 15px)',
        fontSize : 14,
      },
    };

    this.gameItems = [
      { payload: '1', text: '전체' },
      { payload: '2', text: '테니스' },
      { payload: '3', text: '농구' },
      { payload: '4', text: '농구' },
      { payload: '4', text: '농구' },
    ];

    this.filterItems = [
      { payload: '1', text: '시간순' },
      { payload: '2', text: '거리순' },
    ];

    return (
      <div style={styles.root}>
      <SelectField
        ref="gameSelectField"
        style={styles.gameSelectField}
        value={this.state.gameValue}
        floatingLabelText={window.textSet.gameSelect}
        onChange={this.handleSelectValuechange.bind(null, 'gameValue')}
        menuItems={this.gameItems} />
      <SelectField
        ref="filterSelectField"
        style={styles.filterSelectField}
        value={this.state.filterValue}
        floatingLabelText={window.textSet.filterSelect}
        onChange={this.handleSelectValuechange.bind(null, 'filterValue')}
        menuItems={this.filterItems} />
      </div>
    );
  },
  handleSelectValuechange: function(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  },

  getGame: function() {
    return this.gameItems[parseInt(this.state.gameValue)-1].text;
  },

  getFilter: function() {
    return this.filterItems[parseInt(this.state.filterValue)-1].text.replace(" ", "");
  }
});

module.exports = SelectTarget;
