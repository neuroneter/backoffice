function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { Dropdown } from 'reactstrap';
import PropTypes from 'prop-types';
var propTypes = process.env.NODE_ENV !== "production" ? _extends({
  children: PropTypes.node,
  direction: PropTypes.string
}, Dropdown.propTypes) : {};
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

    return /*#__PURE__*/React.createElement(Dropdown, _extends({
      nav: true,
      isOpen: this.state.dropdownOpen,
      toggle: this.toggle
    }, attributes), children);
  };

  return AppHeaderDropdown;
}(Component);

AppHeaderDropdown.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppHeaderDropdown.defaultProps = defaultProps;
export default AppHeaderDropdown;