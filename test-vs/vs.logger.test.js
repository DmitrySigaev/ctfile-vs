/* declaration of modules  */
var assert = require('assert');
var Logger = require('../ctfile/logger');

console.log('Test Logger');
console.log('should return Logger object');
assert.equal(true, Logger.hasOwnProperty('DEBUG'));
assert.equal(true, Logger.DEBUG.hasOwnProperty('level')); // the mainest property 
assert.equal(true, Logger.DEBUG.hasOwnProperty('name'));
assert.equal(true, Logger.DEBUG.hasOwnProperty('desc'));
assert.equal(true, Logger.hasOwnProperty('INFO'));
assert.equal(true, Logger.INFO.hasOwnProperty('level')); // the mainest property 
assert.equal(true, Logger.INFO.hasOwnProperty('name'));
assert.equal(true, Logger.INFO.hasOwnProperty('desc'));

