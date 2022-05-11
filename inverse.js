const add = require("preciso/add");
const divide = require("preciso/divide");
const subtract = require("preciso/subtract");

// bbox to wld
module.exports = function inverse({ bbox, size, precise = true }) {
  const [xmin, ymin, xmax, ymax] = bbox;
  const { height, width } = size;

  if (precise) {
    const cell_width = divide(subtract(xmax.toString(), xmin.toString()), width.toString());
    const half_cell_width = divide(cell_width, "2");

    const cell_height = divide(subtract(ymax.toString(), ymin.toString()), height.toString());
    const half_cell_height = divide(cell_height, "2");

    return {
      xScale: cell_width,
      yScale: "-" + cell_height,
      ySkew: "0",
      xSkew: "0",
      xOrigin: add(xmin.toString(), half_cell_width),
      yOrigin: subtract(ymax.toString(), half_cell_height)
    };
  } else {
    const cell_width = (xmax - xmin) / width;
    const half_cell_width = cell_width / 2;

    const cell_height = (ymax - ymin) / height;
    const half_cell_height = cell_height / 2;

    return {
      xScale: cell_width,
      yScale: -1 * cell_height,
      ySkew: 0,
      xSkew: 0,
      xOrigin: xmin + half_cell_width,
      yOrigin: ymax - half_cell_height
    };
  }
};
