function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
var routes;
var router;

var getPaths = function getPaths(pathname) {
  var paths = ['/'];
  if (pathname === '/') return paths;
  pathname.split('/').reduce(function (prev, curr) {
    var currPath = prev + "/" + curr;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

var findRouteName2 = function findRouteName2(url) {
  var matchPath = router.matchPath;
  var aroute = routes.find(function (route) {
    return matchPath(url, {
      path: route.path,
      exact: route.exact
    });
  });
  return aroute && aroute.name ? aroute.name : null;
};

var BreadcrumbsItem2 = function BreadcrumbsItem2(_ref) {
  var match = _ref.match;
  var routeName = findRouteName2(match.url);
  var Link = router.Link;

  if (routeName) {
    return (// eslint-disable-next-line react/prop-types
      match.isExact ? /*#__PURE__*/React.createElement(BreadcrumbItem, {
        active: true
      }, routeName) : /*#__PURE__*/React.createElement(BreadcrumbItem, null, /*#__PURE__*/React.createElement(Link, {
        to: match.url || ''
      }, routeName))
    );
  }

  return null;
};

BreadcrumbsItem2.propTypes = process.env.NODE_ENV !== "production" ? {
  match: PropTypes.shape({
    url: PropTypes.string
  })
} : {};

var Breadcrumbs2 = function Breadcrumbs2(args) {
  var Route = router.Route;
  var paths = getPaths(args.location.pathname);
  var items = paths.map(function (path, i) {
    return /*#__PURE__*/React.createElement(Route, {
      key: i.toString(),
      path: path,
      component: BreadcrumbsItem2
    });
  });
  return /*#__PURE__*/React.createElement(Breadcrumb, null, items);
};

var propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node,
  className: PropTypes.string,
  appRoutes: PropTypes.any,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  router: PropTypes.any
} : {};
var defaultProps = {
  tag: 'div',
  className: '',
  appRoutes: [{
    path: '/',
    exact: true,
    name: 'Home',
    component: null
  }]
};

var AppBreadcrumb2 = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppBreadcrumb2, _Component);

  function AppBreadcrumb2(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      routes: props.appRoutes
    };
    routes = _this.state.routes;
    router = props.router;
    return _this;
  }

  var _proto = AppBreadcrumb2.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        Tag = _this$props.tag,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "tag"]);

    delete attributes.children;
    delete attributes.appRoutes;
    delete attributes.router;
    var classes = classNames(className);
    var Route = router.Route;
    return /*#__PURE__*/React.createElement(Tag, {
      className: classes
    }, /*#__PURE__*/React.createElement(Route, _extends({
      path: "/:path",
      component: Breadcrumbs2
    }, attributes)));
  };

  return AppBreadcrumb2;
}(Component);

AppBreadcrumb2.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppBreadcrumb2.defaultProps = defaultProps;
export default AppBreadcrumb2;