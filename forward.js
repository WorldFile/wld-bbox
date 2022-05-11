const absolute = require("preciso/absolute.js");
const add = require("preciso/add.js");
const divide = require("preciso/divide.js");
const subtract = require("preciso/subtract.js");
const multiply = require("preciso/multiply.js");

module.exports = function forward({ wld, size, precise = true }) {
  let { xScale, ySkew, xSkew, yScale, xOrigin, yOrigin } = wld;
  const { height, width } = size;

  if (![null, undefined, "", 0, "0"].includes(xSkew) || ![null, undefined, "", 0, "0"].includes(ySkew)) {
    console.warn("xSkew:", xSkew);
    throw new Error("[wld-bbox] no support for skew");
  }

  if (precise) {
    const cell_width = absolute(xScale.toString());
    const half_cell_width = divide(cell_width, "2");

    const cell_height = absolute(yScale.toString());
    const half_cell_height = divide(cell_height, "2");

    if (typeof xOrigin === "number") xOrigin = xOrigin.toString();
    if (typeof yOrigin === "number") yOrigin = yOrigin.toString();

    const xmin = subtract(xOrigin.toString(), half_cell_width);
    const ymax = add(yOrigin, half_cell_height);
    const xmax = add(xmin, multiply(width.toString(), cell_width));
    const ymin = subtract(ymax, multiply(height.toString(), cell_height));

    return [xmin, ymin, xmax, ymax];
  } else {
    const cell_width = Math.abs(xScale);
    const cell_height = Math.abs(yScale);

    const xmin = xOrigin - cell_width / 2;
    const ymax = yOrigin + cell_height / 2;
    const xmax = xmin + width * cell_width;
    const ymin = ymax - height * cell_height;

    return [xmin, ymin, xmax, ymax];
  }
};
