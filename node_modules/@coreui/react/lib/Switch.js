"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var propTypes = process.env.NODE_ENV !== "production" ? {
  color: _propTypes["default"].string,
  label: _propTypes["default"].bool,
  outline: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string, _propTypes["default"].oneOf(['', 'alt'])]),
  size: _propTypes["default"].oneOf(['', 'lg', 'sm']),
  checked: _propTypes["default"].bool,
  defaultChecked: _propTypes["default"].bool,
  defaultValue: _propTypes["default"].any,
  value: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  form: _propTypes["default"].any,
  name: _propTypes["default"].string,
  required: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  type: _propTypes["default"].oneOf(['checkbox', 'radio']),
  variant: _propTypes["default"].oneOf(['', '3d', 'pill']),
  className: _propTypes["default"].string,
  dataOn: _propTypes["default"].string,
  dataOff: _propTypes["default"].string
} : {};
var defaultProps = {
  color: 'secondary',
  label: false,
  outline: false,
  size: '',
  checked: false,
  defaultChecked: undefined,
  disabled: undefined,
  required: undefined,
  type: 'checkbox',
  variant: '',
  dataOn: 'On',
  dataOff: 'Off'
};

var AppSwitch = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppSwitch, _Component);

  function AppSwitch(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_this));
    _this.state = {
      uncontrolled: !!_this.props.defaultChecked,
      checked: _this.props.defaultChecked || _this.props.checked,
      selected: []
    };
    return _this;
  }

  var _proto = AppSwitch.prototype;

  _proto.toggleState = function toggleState(check) {
    this.setState({
      checked: check
    });
  };

  _proto.handleChange = function handleChange(event) {
    var target = event.target;
    this.toggleState(target.checked);

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  _proto.handleKeyUp = function handleKeyUp(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleState(!this.state.checked);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (!this.state.uncontrolled && this.props.checked !== prevState.checked) {
      this.toggleState(this.props.checked);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        disabled = _this$props.disabled,
        color = _this$props.color,
        name = _this$props.name,
        label = _this$props.label,
        outline = _this$props.outline,
        size = _this$props.size,
        required = _this$props.required,
        type = _this$props.type,
        value = _this$props.value,
        dataOn = _this$props.dataOn,
        dataOff = _this$props.dataOff,
        variant = _this$props.variant,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "disabled", "color", "name", "label", "outline", "size", "required", "type", "value", "dataOn", "dataOff", "variant"]);

    var tabindex = attributes.tabIndex;
    delete attributes.tabIndex;
    delete attributes.checked;
    delete attributes.defaultChecked;
    delete attributes.onChange;
    var classes = (0, _classnames["default"])(className, 'switch', label ? 'switch-label' : false, size ? "switch-" + size : false, variant ? "switch-" + variant : false, "switch" + (outline ? '-outline' : '') + "-" + color + (outline === 'alt' ? '-alt' : ''), 'form-check-label');
    var inputClasses = (0, _classnames["default"])('switch-input', 'form-check-input');
    var sliderClasses = (0, _classnames["default"])('switch-slider');
    return /*#__PURE__*/_react["default"].createElement("label", {
      className: classes,
      tabIndex: tabindex,
      onKeyUp: this.handleKeyUp,
      onKeyDown: this.handleKeyDown
    }, /*#__PURE__*/_react["default"].createElement("input", _extends({
      type: type,
      className: inputClasses,
      onChange: this.handleChange,
      checked: this.state.checked,
      name: name,
      required: required,
      disabled: disabled,
      value: value,
      "aria-checked": this.state.checked,
      "aria-disabled": disabled,
      "aria-readonly": disabled
    }, attributes)), /*#__PURE__*/_react["default"].createElement("span", {
      className: sliderClasses,
      "data-checked": dataOn,
      "data-unchecked": dataOff
    }));
  };

  return AppSwitch;
}(_react.Component);

AppSwitch.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppSwitch.defaultProps = defaultProps;
var _default = AppSwitch;
exports["default"] = _default;
module.exports = exports.default;