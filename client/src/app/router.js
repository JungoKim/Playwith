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

var AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <Route name="search" handler={Search} />
    <Route name="map" handler={Map} />
    <Route name="user" handler={User} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;