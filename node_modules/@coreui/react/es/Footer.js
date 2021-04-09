function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
var propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
} : {};
var defaultProps = {
  tag: 'footer',
  fixed: false
};

var AppFooter = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppFooter, _Component);

  function AppFooter(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.isFixed = _this.isFixed.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = AppFooter.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.isFixed(this.props.fixed);
  };

  _proto.isFixed = function isFixed(fixed) {
    if (fixed) {
      document.body.classList.add('footer-fixed');
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        Tag = _this$props.tag,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "children", "tag"]);

    delete attributes.fixed;
    var classes = classNames(className, 'app-footer');
    return /*#__PURE__*/React.createElement(Tag, _extends({
      className: classes
    }, attributes), children);
  };

  return AppFooter;
}(Component);

AppFooter.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppFooter.defaultProps = defaultProps;
export default AppFooter;