"use strict";

exports.__esModule = true;
exports.checkBreakpoint = checkBreakpoint;
exports.validBreakpoints = exports.asideMenuCssClasses = exports.sidebarCssClasses = void 0;
var sidebarCssClasses = ['sidebar-show', 'sidebar-sm-show', 'sidebar-md-show', 'sidebar-lg-show', 'sidebar-xl-show'];
exports.sidebarCssClasses = sidebarCssClasses;
var asideMenuCssClasses = ['aside-menu-show', 'aside-menu-sm-show', 'aside-menu-md-show', 'aside-menu-lg-show', 'aside-menu-xl-show'];
exports.asideMenuCssClasses = asideMenuCssClasses;
var validBreakpoints = ['sm', 'md', 'lg', 'xl'];
exports.validBreakpoints = validBreakpoints;

function checkBreakpoint(breakpoint, list) {
  return list.indexOf(breakpoint) > -1;
}