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
console.log("should return true");
assert.equal(true, ctfile.ut_parseFlag(1));
assert.equal(true, ctfile.ut_parseFlag("  1"));
assert.equal(true, ctfile.ut_parseFlag(true));
assert.equal(true, ctfile.ut_parseFlag("true"));
assert.equal(true, ctfile.ut_parseFlag("  1 "));
assert.equal(true, ctfile.ut_parseFlag(" true"));
assert.equal(true, ctfile.ut_parseFlag("true "));
assert.equal(true, ctfile.ut_parseFlag(" true "));
console.log("should return false");

assert.equal(false, ctfile.ut_parseFlag(false));
assert.equal(false, ctfile.ut_parseFlag("false"));
assert.equal(false, ctfile.ut_parseFlag(0));
assert.equal(false, ctfile.ut_parseFlag(" 0"));
assert.equal(false, ctfile.ut_parseFlag(" 0 0"));
assert.equal(false, ctfile.ut_parseFlag(" 1 0"));
assert.equal(false, ctfile.ut_parseFlag("true 1"));
assert.equal(false, ctfile.ut_parseFlag("true ;"));

console.log("Test internal function molfileHeaderTemplate");
console.log("should return true");
assert.equal(true, ctfile.ut_getMolHeaderPattern().hasOwnProperty('description'));

console.log("Test internal function poundoutMask");
console.log("should compare with patterns");
assert.equal('AAAAAA', ctfile.ut_poundoutMask('A1A2A3'));
assert.equal('ABBCCC', ctfile.ut_poundoutMask('A1B2C3'));
assert.equal('(ma)2 hello~2world! 2aaa', ctfile.ut_poundoutMask('(ma)2 hel2o~2world! 2a3'));
assert.equal('\n2', ctfile.ut_poundoutMask('\n2'));
assert.equal('\ra{aa', ctfile.ut_poundoutMask('\ra{a2'));

console.log("Test internal function parseLineByTemplate");
console.log("should compare with patterns");
assert.deepStrictEqual({ name: 'Test 1' }, ctfile.ut_parseLineByTemplate('Test 1', ctfile.ut_getMolHeaderPattern().line1));

assert.equal('GT', ctfile.ut_parseLineByTemplate('GTMACCS-II11299515322D 1   0.00377     0.00000     0    GST', ctfile.ut_getMolHeaderPattern().line2, ' ').userInitials);
assert.equal('MACCS-II', ctfile.ut_parseLineByTemplate('GTMACCS-II11299515322D 1   0.00377     0.00000     0    GST', ctfile.ut_getMolHeaderPattern().line2, ' ').programName);

assert.deepStrictEqual({ userInitials: 'GT', programName: 'MACCS-II', month: 11, day: 29, year: 95, hour: 15, minute: 32, dimension: '2D', scalingFactorsMajor: '1', scalingFactorsMinor: '0.00377', energy: '0.00000', internalRegistryNumber: '0' }, ctfile.ut_parseLineByTemplate('GTMACCS-II11299515322D 1   0.00377     0.00000     0    GST', ctfile.ut_getMolHeaderPattern().line2, ' '));

console.log("Test internal function cleanWSChs");
console.log("should compare with patterns");
assert.equal('ACETYLCHOLINE & stuff', ctfile.ut_cleanWSChs('ACETYLCHOLINE & stuff', ' '));
assert.equal('ACETYLCHOLINE;&;stuff', ctfile.ut_cleanWSChs('ACETYLCHOLINE & stuff'));
assert.equal('\nACETYLCHOLINE;&;stuff', ctfile.ut_cleanWSChs('\n   \n\n   \nACETYLCHOLINE & stuff'));
assert.equal('\nACETYLCHOLINE & stuff', ctfile.ut_cleanWSChs('\n   \n\n   \nACETYLCHOLINE & stuff', ' '));
assert.equal('\nACETYLCHOLINE;&;stuff;', ctfile.ut_cleanWSChs('\n   \n\n   \nACETYLCHOLINE & stuff\n', ';'));
assert.equal('\nACETYLCHOLINE;&;stuff\n', ctfile.ut_cleanWSChs('\n   \n\n   \nACETYLCHOLINE & stuff\n ', ';'));
assert.equal('\nACETYLCHOLINE;&;stuff;', ctfile.ut_cleanWSChs('\n   \n\n   \nACETYLCHOLINE & stuff\n\n', ';'));
assert.equal('\nACETYLCHOLINE;&;stuff\n', ctfile.ut_cleanWSChs('\n   \n\n   \nACETYLCHOLINE & stuff\n   \n   \n', ';'));
assert.equal(';ACETYLCHOLINE;&;stuff\n', ctfile.ut_cleanWSChs('\nACETYLCHOLINE & stuff\n   \n   \n', ';'));
assert.equal(';ACETYLCHOLINE;&;stuff\n', ctfile.ut_cleanWSChs('\n\nACETYLCHOLINE & stuff\n   \n   \n', ';'));
assert.equal(';ACETYLCHOLINE;&;stuff\n', ctfile.ut_cleanWSChs('\n\n\nACETYLCHOLINE & stuff\n   \n   \n', ';'));
assert.equal(';ACETYLCHOLINE;&;stuff\n', ctfile.ut_cleanWSChs('\n\n\nACETYLCHOLINE & stuff\n\n   \n   \n', ';'));
assert.equal(' ACETYLCHOLINE & stuff ', ctfile.ut_cleanWSChs('\n\n\nACETYLCHOLINE & stuff\n\n\n', ' '));

