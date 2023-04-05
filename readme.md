# mbg

mbg is a fast, minimal mbtiles reader.

## install

`npm i mbg`

## usage

``` js
const mbg = require("mbg");
mbg("./file.mbtiles").get(z, x, y, function(err, tilebuf, info){
	//
});
```

## performance

comparison on macbook m1 pro max, average over 5 runs, retrieving 1, 1000, 10000 random tiles (blue marble, jpeg @1x, zoom 3-8, same random sets)

|                                                                  | 1 tile                           | 1000 tiles                         | 10000 tiles                          |
|------------------------------------------------------------------|----------------------------------|------------------------------------|--------------------------------------|
| mbg                                                              | **7.2ms, 138.9 tiles/s** (3.75×) | **33.8ms, 29585.8 tiles/s** (4.1×) | **116.6ms, 86132.6 tiles/s** (82.5×) |
| [@mapbox/mbtiles](https://www.npmjs.com/package/@mapbox/mbtiles) | 27ms, 37.0 tiles/s               | 140ms, 7142.9 tiles/s              | 9575.4ms, 1044.3 tiles/s             |

## license

[Unlicense](./UNLICENSE.md)
