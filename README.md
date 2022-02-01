# wld-bbox
Calculate a Bounding Box given a World File and Raster Size. Super High Precision.

# install
```bash
npm install wld-bbox
```

# usage
```js
const calcWorldFileBoundingBox = require("wld-bbox");

const wld = {
  xScale: "2445.9849051249894",
  ySkew: "0",
  xSkew: "0",
  yScale: "-2445.98490512499",
  xOrigin: "7699959.850241235",
  yOrigin: "1323859.6754601842"
};

const size = { height: 475, width: 968 };

const bbox = calcWorldFileBoundingBox({ wld, size });
// bbox is a super-precise bounding box in [xmin, ymin, xmax, ymax] format
// where the numbers are represented as strings for extra precision
// because of the limitations of JavaScript floating point numbers
// ex: Number("7698736.8577886725053") results in 7698736.857788673
["7698736.8577886725053", "163239.837978376445", "10066450.2459496622445", "1325082.667912746695"]

// turn of high-precision and just use quicker floating point arithmetic
const bbox = calcWorldFileBoundingBox({ wld, size, precise: false });
[7698736.857788673, 163239.83797837654, 10066450.245949663, 1325082.6679127468]
```