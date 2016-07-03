var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./master.js');
var Home = require('./home.js');

var AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;