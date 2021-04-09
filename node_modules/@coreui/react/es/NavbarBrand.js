function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
var propTypes = process.env.NODE_ENV !== "production" ? {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  className: PropTypes.string,
  brand: PropTypes.any,
  full: PropTypes.any,
  minimized: PropTypes.any
} : {};
var defaultProps = {
  tag: 'a'
};

var AppNavbarBrand = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppNavbarBrand, _Component);

  function AppNavbarBrand() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AppNavbarBrand.prototype;

  _proto.imgSrc = function imgSrc(brand) {
    return brand.src ? brand.src : '';
  };

  _proto.imgWidth = function imgWidth(brand) {
    return brand.width ? brand.width : 'auto';
  };

  _proto.imgHeight = function imgHeight(brand) {
    return brand.height ? brand.height : 'auto';
  };

  _proto.imgAlt = function imgAlt(brand) {
    return brand.alt ? brand.alt : '';
  };

  _proto.navbarBrandImg = function navbarBrandImg(props, classBrand, key) {
    return /*#__PURE__*/React.createElement("img", {
      src: this.imgSrc(props),
      width: this.imgWidth(props),
      height: this.imgHeight(props),
      alt: this.imgAlt(props),
      className: classBrand,
      key: key.toString()
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        Tag = _this$props.tag,
        attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "children", "tag"]);

    var classes = classNames(className, 'navbar-brand');
    var img = [];

    if (this.props.brand) {
      var props = this.props.brand;
      var classBrand = 'navbar-brand';
      img.push(this.navbarBrandImg(props, classBrand, img.length + 1));
    }

    if (this.props.full) {
      var _props = this.props.full;
      var _classBrand = 'navbar-brand-full';
      img.push(this.navbarBrandImg(_props, _classBrand, img.length + 1));
    }

    if (this.props.minimized) {
      var _props2 = this.props.minimized;
      var _classBrand2 = 'navbar-brand-minimized';
      img.push(this.navbarBrandImg(_props2, _classBrand2, img.length + 1));
    }

    return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
      className: classes
    }), children || img);
  };

  return AppNavbarBrand;
}(Component);

AppNavbarBrand.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppNavbarBrand.defaultProps = defaultProps;
export default AppNavbarBrand;