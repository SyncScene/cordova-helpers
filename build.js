#!/usr/bin/env node

var path = require('path');
var exec = require('child_process').exec;
var compile = require('./hooks/compileTemplates.js');
var decompile = require('./hooks/decompileTemplates.js');

var context = {
	opts: {
		projectRoot: process.cwd()
	}
};

decompile(context);
compile(context);

var cmd = "cordova run";

if (process.argv.length > 2) {
	cmd += " " + process.argv.slice(2, process.argv.length).join(" ");
}

console.log("Executing command: " + cmd);

exec(cmd, function (error, stdout, stderr) {
	decompile(context);
});