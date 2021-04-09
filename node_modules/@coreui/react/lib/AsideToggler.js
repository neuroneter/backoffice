"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = require("./Shared/index");

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
  defaultOpen: _propTypes["default"].bool,
  display: _propTypes["default"].any,
  mobile: _propTypes["default"].bool,
  tag: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string]),
  type: _propTypes["default"].string
} : {};
var defaultProps = {
  defaultOpen: false,
  display: 'lg',
  mobile: false,
  tag: 'button',
  type: 'button'
};

var AppAsideToggler = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppAsideToggler, _Component);

  function AppAsideToggler(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.asideToggle = _this.asideToggle.bind(_assertThisInitialized(_this));
    _this.state = {};
    return _this;
  }

  var _proto = AppAsideToggler.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.toggle(this.props.defaultOpen);
  };

  _proto.toggle = function toggle(force) {
    var _ref = [this.props.display, this.props.mobile],
        display = _ref[0],
        mobile = _ref[1];
    var cssClass = _index.asideMenuCssClasses[0];

    if (!mobile && display && (0, _index.checkBreakpoint)(display, _index.validBreakpoints)) {
      cssClass = "aside-menu-" + display + "-show";
    }

    (0, _toggleClasses["default"])(cssClass, _index.asideMenuCssClasses, force);
  };

  _proto.asideToggle = function asideToggle(e) {
    e.preventDefault();
    this.toggle();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        type = _this$props.type,
        Tag = _this$props.tag,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "children", "type", "tag"]);

    delete attributes.defaultOpen;
    delete attributes.display;
    delete attributes.mobile;
    var classes = (0, _classnames["default"])(className, 'navbar-toggler');
    return /*#__PURE__*/_react["default"].createElement(Tag, _extends({
      type: type,
      className: classes
    }, attributes, {
      onClick: function onClick(event) {
        return _this2.asideToggle(event);
      }
    }), children || /*#__PURE__*/_react["default"].createElement("span", {
      className: "navbar-toggler-icon"
    }));
  };

  return AppAsideToggler;
}(_react.Component);

AppAsideToggler.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppAsideToggler.defaultProps = defaultProps;
var _default = AppAsideToggler;
exports["default"] = _default;
module.exports = exports.default;