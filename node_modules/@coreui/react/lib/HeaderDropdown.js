"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var propTypes = process.env.NODE_ENV !== "production" ? _extends({
  children: _propTypes["default"].node,
  direction: _propTypes["default"].string
}, _reactstrap.Dropdown.propTypes) : {};
var defaultProps = {
  direction: 'down'
};

var AppHeaderDropdown = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppHeaderDropdown, _Component);

  function AppHeaderDropdown(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.state = {
      dropdownOpen: false
    };
    return _this;
  }

  var _proto = AppHeaderDropdown.prototype;

  _proto.toggle = function toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    return /*#__PURE__*/_react["default"].createElement(_reactstrap.Dropdown, _extends({
      nav: true,
      isOpen: this.state.dropdownOpen,
      toggle: this.toggle
    }, attributes), children);
  };

  return AppHeaderDropdown;
}(_react.Component);

AppHeaderDropdown.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppHeaderDropdown.defaultProps = defaultProps;
var _default = AppHeaderDropdown;
exports["default"] = _default;
module.exports = exports.default;