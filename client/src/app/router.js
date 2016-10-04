var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./master.js');
var Home = require('./home.js');
var Search = require('./search.js');
var Map = require('./map.js');
var User = require('./user.js');
var CreatePlay = require('./create_play.js');
var PlayInfo = require('./play_info.js');

var AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <Route name="search" handler={Search} />
    <Route name="map" handler={Map} />
    <Route name="user" handler={User} />
    <Route name="create_play" handler={CreatePlay} />
    <Route name="play_info" handler={PlayInfo} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;