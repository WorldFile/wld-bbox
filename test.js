const test = require("flug");
const calcBoundingBox = require("./wld-bbox.js");

const wldNumbers = {
  xScale: 2445.9849051249894,
  ySkew: 0,
  xSkew: 0,
  yScale: -2445.98490512499,
  xOrigin: 7699959.850241235,
  yOrigin: 1323859.6754601842
};

const wldStrings = {
  xScale: "2445.9849051249894",
  ySkew: "0",
  xSkew: "0",
  yScale: "-2445.98490512499",
  xOrigin: "7699959.850241235",
  yOrigin: "1323859.6754601842"
};

test("imprecise calculation from World File numbers", ({ eq }) => {
  const bbox = calcBoundingBox({ wld: wldNumbers, size: { height: 475, width: 968 }, precise: false });
  eq(bbox, [7698736.857788673, 163239.83797837654, 10066450.245949663, 1325082.6679127468]);
});

test("precise calculate from World File numbers", ({ eq }) => {
  const bbox = calcBoundingBox({ wld: wldNumbers, size: { height: 475, width: 968 }, precise: true });
  eq(bbox, ["7698736.8577886725053", "163239.837978376445", "10066450.2459496622445", "1325082.667912746695"]);
});

test("precise calculate from World File strings", ({ eq }) => {
  const bbox = calcBoundingBox({ wld: wldStrings, size: { height: 475, width: 968 }, precise: true });
  eq(bbox, ["7698736.8577886725053", "163239.837978376445", "10066450.2459496622445", "1325082.667912746695"]);
});
