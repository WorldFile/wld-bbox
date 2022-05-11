const forward = require("./forward");
const inverse = require("./inverse");

const wld_bbox = { forward, inverse };

if (typeof define === "function" && define.amd)
  define(function () {
    return wld_bbox;
  });
if (typeof module === "object") module.exports = wld_bbox;
if (typeof window === "object") window.wld_bbox = wld_bbox;
if (typeof self === "object") self.wld_bbox = wld_bbox;
