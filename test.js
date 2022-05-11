const test = require("flug");
const { forward, inverse } = require("./index.js");

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

const size = { height: 475, width: 968 };

test("imprecise calculation from World File numbers", ({ eq }) => {
  const bbox = forward({ wld: wldNumbers, size, precise: false });
  eq(bbox, [7698736.857788673, 163239.83797837654, 10066450.245949663, 1325082.6679127468]);
});

test("precise calculate from World File numbers", ({ eq }) => {
  const bbox = forward({ wld: wldNumbers, size, precise: true });
  eq(bbox, ["7698736.8577886725053", "163239.837978376445", "10066450.2459496622445", "1325082.667912746695"]);
});

test("precise calculate from World File strings", ({ eq }) => {
  const bbox = forward({ wld: wldStrings, size, precise: true });
  eq(bbox, ["7698736.8577886725053", "163239.837978376445", "10066450.2459496622445", "1325082.667912746695"]);

  // round trip
  eq(inverse({ bbox, size }), wldStrings);
});

test("example: inverse with precise arithmetic", ({ eq }) => {
  const wld = inverse({
    bbox: ["7698736.8577886725053", "163239.837978376445", "10066450.2459496622445", "1325082.667912746695"],
    precise: true,
    size
  });
  eq(wld, wldStrings);
});

test("example: inverse with floating-point arithmetic", ({ eq }) => {
  const wld = inverse({
    bbox: [7698736.857788673, 163239.83797837654, 10066450.245949663, 1325082.6679127468],
    precise: false,
    size
  });
  eq(Math.abs(wldNumbers.xScale - wld.xScale) < 0.000000001, true);
  eq(wld.ySkew, 0);
  eq(wld.xSkew, 0);
  eq(wld.xOrigin, wldNumbers.xOrigin);
  eq(wld.yOrigin, wldNumbers.yOrigin);
});
