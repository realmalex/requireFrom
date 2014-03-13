/* 

Require from a directory relative to node_modules, flattening your require paths.

Example:
	Given project structure:
		node_modules/requirefrom/
		lib/some/complex/dir/module/module.js
		lib/otherModule/index.js

	The file module.js:
		var lib = require('requirefrom')('lib');
 		var otherModule = lib('otherModule');

	Would be equivalent to:
		var otherModule = require('../../../../otherModule');
*/

var path = require('path');
var pkg = require(path.normalize(__dirname + '/../../package.json'));

var requirefrom = function( fromPath ){
	return function( modulePath ){
		return require( path.normalize(
			__dirname + '/../../' + fromPath + '/' + modulePath
			) );
	}
}

if(pkg.requirefrom) {
	for(var dir in pkg.requirefrom) {
		requirefrom[dir] = requirefrom(pkg.requirefrom[dir]);
	}
}

module.exports = requirefrom;
