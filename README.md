# wld-bbox
Convert between a Bounding Box and World File given a Raster Size

### features
- No floating point arithmetic issues thanks to [preciso](https://github.com/danieljdufour/preciso)

### limitiations
- doesn't support skew (rotation around the x or y axis)

## install
```bash
npm install wld-bbox
```

## usage
### forward: World File to Bounding Box
```js
import convert_world_file_to_bbox from "wld-bbox/forward";
// or import { forward as convert_world_file_to_bbox } from "wld-bbox";

const wld = {
  xScale: "2445.9849051249894",
  ySkew: "0",
  xSkew: "0",
  yScale: "-2445.98490512499",
  xOrigin: "7699959.850241235",
  yOrigin: "1323859.6754601842"
};

const size = { height: 475, width: 968 };

const bbox = convert_world_file_to_bbox({ wld, size });
// bbox is a super-precise bounding box in [xmin, ymin, xmax, ymax] format
// where the numbers are represented as strings for extra precision
// because of the limitations of JavaScript floating point numbers
// ex: Number("7698736.8577886725053") results in 7698736.857788673
["7698736.8577886725053", "163239.837978376445", "10066450.2459496622445", "1325082.667912746695"]

// turn off high-precision and just use quicker floating point arithmetic
const bbox = convert_world_file_to_bbox({ wld, size, precise: false });
[7698736.857788673, 163239.83797837654, 10066450.245949663, 1325082.6679127468]
```

### inverse: Bounding Box to World File
```js
import convert_bbox_to_world_file from "wld-bbox/inverse";
// or import { inverse as convert_bbox_to_world_file } from "wld-bbox";

inverse({
  // a precise bounding box where numbers are represented by strings
  bbox: ["7698736.8577886725053", "163239.837978376445", "10066450.2459496622445", "1325082.667912746695"],
  precise: true,
  size: { height: 475, width: 968 }
});
{
  xScale: '2445.9849051249894',
  yScale: '-2445.98490512499',
  ySkew: '0',
  xSkew: '0',
  xOrigin: '7698736.8577886725053',
  yOrigin: '1325082.667912746695'
}

// using numbers instead of precise numerical strings
convert_bbox_to_world_file({
  bbox: [7698736.857788673, 163239.83797837654, 10066450.245949663, 1325082.6679127468],
  precise: false,
  size: {
    height: 475,
    width: 968
  }
});
{
  xScale: 2445.9849051249903,
  yScale: -2445.98490512499,
  ySkew: 0,
  xSkew: 0,
  xOrigin: 7698736.857788673,
  yOrigin: 1325082.6679127468
}
```

## Reference
https://en.wikipedia.org/wiki/World_file

## related
To read the data from a World File into an object, consider using [wld-reader](https://github.com/WorldFile/wld-reader).
