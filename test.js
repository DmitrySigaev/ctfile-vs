console.log("process.platform: " + process.platform);
console.log("process.version: " + process.version);
console.log(process.versions);
console.log("process.config: ");
console.log(process.config);
console.log("process.release: ");
console.log(process.release);
console.log('This process is pid ' + process.pid);
console.log("process.title: ");
console.log(process.title);
console.log('This processor architecture is ' + process.arch);
console.log("show arguments:");
process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});

/* declaration of modules  */
var assert = require('assert');
var ctfile = require("./ctfile");
console.log("Test ctfile.getVersion method(Test for deep equality)");
assert.deepStrictEqual({ moduleVersion: '0.0.0' }, ctfile.getVersion());
console.log("Test internal function parseFlag");
assert.equal(true, ctfile.ut_parseFlag(1));
assert.equal(true, ctfile.ut_parseFlag("  1"));
assert.equal(true, ctfile.ut_parseFlag(true));
assert.equal(true, ctfile.ut_parseFlag("  1 "));
assert.equal(false, ctfile.ut_parseFlag(false));
assert.equal(false, ctfile.ut_parseFlag(0));
assert.equal(false, ctfile.ut_parseFlag(" 0"));
assert.equal(false, ctfile.ut_parseFlag(" 0 0"));
assert.equal(false, ctfile.ut_parseFlag(" 1 0"));
