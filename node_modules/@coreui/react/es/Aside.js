function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { asideMenuCssClasses, checkBreakpoint, validBreakpoints } from './Shared';
import toggleClasses from './Shared/toggle-classes';
var propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node,
  className: PropTypes.string,
  display: PropTypes.string,
  fixed: PropTypes.bool,
  isOpen: PropTypes.bool,
  offCanvas: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
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
    if (display && checkBreakpoint(display, validBreakpoints)) {
      var cssClass = "aside-menu-" + display + "-show";
      toggleClasses(cssClass, asideMenuCssClasses, true);
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
    var classes = classNames(className, 'aside-menu');
    return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
      className: classes
    }), children);
  };

  return AppAside;
}(Component);

AppAside.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppAside.defaultProps = defaultProps;
export default AppAside;