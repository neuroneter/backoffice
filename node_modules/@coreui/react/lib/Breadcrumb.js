"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactstrap = require("reactstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var routes;

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

var findRouteName = function findRouteName(url) {
  var aroute = routes.find(function (route) {
    return (0, _reactRouterDom.matchPath)(url, {
      path: route.path,
      exact: route.exact
    });
  });
  return aroute && aroute.name ? aroute.name : null;
};

var BreadcrumbsItem = function BreadcrumbsItem(_ref) {
  var match = _ref.match;
  var routeName = findRouteName(match.url);

  if (routeName) {
    return (// eslint-disable-next-line react/prop-types
      match.isExact ? /*#__PURE__*/_react["default"].createElement(_reactstrap.BreadcrumbItem, {
        active: true
      }, routeName) : /*#__PURE__*/_react["default"].createElement(_reactstrap.BreadcrumbItem, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
        to: match.url || ''
      }, routeName))
    );
  }

  return null;
};

BreadcrumbsItem.propTypes = process.env.NODE_ENV !== "production" ? {
  match: _propTypes["default"].shape({
    url: _propTypes["default"].string
  })
} : {};

var Breadcrumbs = function Breadcrumbs(args) {
  var paths = getPaths(args.location.pathname);
  var items = paths.map(function (path, i) {
    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
      key: i.toString(),
      path: path,
      component: BreadcrumbsItem
    });
  });
  return /*#__PURE__*/_react["default"].createElement(_reactstrap.Breadcrumb, null, items);
};

var propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  appRoutes: _propTypes["default"].any,
  tag: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string])
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

var AppBreadcrumb = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppBreadcrumb, _Component);

  function AppBreadcrumb(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      routes: props.appRoutes
    };
    routes = _this.state.routes;
    return _this;
  }

  var _proto = AppBreadcrumb.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        Tag = _this$props.tag,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "tag"]);

    delete attributes.children;
    delete attributes.appRoutes;
    var classes = (0, _classnames["default"])(className);
    return /*#__PURE__*/_react["default"].createElement(Tag, {
      className: classes
    }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, _extends({
      path: "/:path",
      component: Breadcrumbs
    }, attributes)));
  };

  return AppBreadcrumb;
}(_react.Component);

AppBreadcrumb.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppBreadcrumb.defaultProps = defaultProps;
var _default = AppBreadcrumb;
exports["default"] = _default;
module.exports = exports.default;