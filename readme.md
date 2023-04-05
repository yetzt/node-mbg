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

## license

[Unlicense](./UNLICENSE.md)
