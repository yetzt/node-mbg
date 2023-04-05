const sqlite3 = require("better-sqlite3");

const mbg = exports = module.export = function mbg(src){
	if (!(this instanceof mbg)) return new mbg(src);
	const self = this;

	self.db = new sqlite3(src, { readonly: true });

	// prepare tile statement
	self.statement = self.db.prepare("SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?");

	// get info
	self.info = self.db.prepare("SELECT name, value FROM metadata").all().reduce(function(info, r){
		switch (r.name) {
			case "format": // pbf, jpg, png, webp, $mimetype
				switch (r.value) {
					case "pbf":
						info.mimetype = "application/x-protobuf"; // good enough
						info.compression = "gzip";
					break;
					case "png":
					case "webp":
						info.mimetype = "image/"+r.value;
					break;
					case "jpg":
						info.mimetype = "image/jpeg";
					break;
					default:
						info.mimetype = r.value;
					break;
				}
			break;
			case "json":
				try {
					info.json = JSON.parse(r.value);
				} catch (err){
					info.json = null;
				};
			break;
			case "minzoom":
			case "maxzoom":
				info[r.name] = parseInt(r.value, 10);
			break;
			case "center":
			case "bounds":
				info[r.name] = r.value.split(',').map(parseFloat);
			break;
			default: info[r.name] = r.value;
		};
		return info;
	},{
		mimetype: "application/octet-stream",
		compression: false,
		json: null,
	});

	return this;
};

// get tile by xyz
mbg.prototype.get = function(z,x,y,fn){
	const self = this;

	try {
		const result = self.statement.get(z, x, ((1<<z)-1-y)); // y to tms
		fn(null, result && result.tile_data || null, self.info);
	} catch (err) {
		fn(err);
	}

	return this;
};
