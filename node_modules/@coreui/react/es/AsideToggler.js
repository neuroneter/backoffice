function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from './Shared/index';
import toggleClasses from './Shared/toggle-classes';
var propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultOpen: PropTypes.bool,
  display: PropTypes.any,
  mobile: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  type: PropTypes.string
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
    var cssClass = asideMenuCssClasses[0];

    if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
      cssClass = "aside-menu-" + display + "-show";
    }

    toggleClasses(cssClass, asideMenuCssClasses, force);
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
    var classes = classNames(className, 'navbar-toggler');
    return /*#__PURE__*/React.createElement(Tag, _extends({
      type: type,
      className: classes
    }, attributes, {
      onClick: function onClick(event) {
        return _this2.asideToggle(event);
      }
    }), children || /*#__PURE__*/React.createElement("span", {
      className: "navbar-toggler-icon"
    }));
  };

  return AppAsideToggler;
}(Component);

AppAsideToggler.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppAsideToggler.defaultProps = defaultProps;
export default AppAsideToggler;