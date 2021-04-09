"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Shared = require("./Shared");

var _toggleClasses = _interopRequireDefault(require("./Shared/toggle-classes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  display: _propTypes["default"].string,
  fixed: _propTypes["default"].bool,
  isOpen: _propTypes["default"].bool,
  offCanvas: _propTypes["default"].bool,
  tag: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string])
} : {};
var defaultProps = {
  tag: 'aside',
  display: '',
  fixed: false,
  isOpen: false,
  offCanvas: true
};

var AppAside = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppAside, _Component);

  function AppAside(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.isFixed = _this.isFixed.bind(_assertThisInitialized(_this));
    _this.isOffCanvas = _this.isOffCanvas.bind(_assertThisInitialized(_this));
    _this.displayBreakpoint = _this.displayBreakpoint.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = AppAside.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.isFixed(this.props.fixed);
    this.isOffCanvas(this.props.offCanvas);
    this.displayBreakpoint(this.props.display);
  };

  _proto.isFixed = function isFixed(fixed) {
    if (fixed) {
      document.body.classList.add('aside-menu-fixed');
    }
  };

  _proto.isOffCanvas = function isOffCanvas(offCanvas) {
    if (offCanvas) {
      document.body.classList.add('aside-menu-off-canvas');
    }
  };

  _proto.displayBreakpoint = function displayBreakpoint(display) {
    if (display && (0, _Shared.checkBreakpoint)(display, _Shared.validBreakpoints)) {
      var cssClass = "aside-menu-" + display + "-show";
      (0, _toggleClasses["default"])(cssClass, _Shared.asideMenuCssClasses, true);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        Tag = _this$props.tag,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "children", "tag"]);

    delete attributes.display;
    delete attributes.fixed;
    delete attributes.offCanvas;
    delete attributes.isOpen;
    var classes = (0, _classnames["default"])(className, 'aside-menu');
    return /*#__PURE__*/_react["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }), children);
  };

  return AppAside;
}(_react.Component);

AppAside.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppAside.defaultProps = defaultProps;
var _default = AppAside;
exports["default"] = _default;
module.exports = exports.default;