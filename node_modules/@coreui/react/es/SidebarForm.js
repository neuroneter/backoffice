function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
var propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
} : {};
var defaultProps = {
  tag: 'div'
};

var AppSidebarForm = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppSidebarForm, _Component);

  function AppSidebarForm() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AppSidebarForm.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        Tag = _this$props.tag,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "children", "tag"]);

    var classes = classNames(className, 'sidebar-form');
    var form = children ? /*#__PURE__*/React.createElement(Tag, _extends({
      className: classes
    }, attributes), children) : null;
    return form;
  };

  return AppSidebarForm;
}(Component);

AppSidebarForm.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppSidebarForm.defaultProps = defaultProps;
export default AppSidebarForm;