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
var cmdExtra = "";

if (process.argv.length > 2) {
	cmdExtra += " " + process.argv.slice(2, process.argv.length).join(" ");
}

var tokens = cmdExtra.split(' ');

for (var i = 0; i < tokens.length; ++i) {
	if (tokens[i] == '-b') {
		cmd = "cordova build";
		tokens.splice(i, 1);
	}
}

cmd += tokens.join(' ');

console.log("executing command: " + cmd);

exec(cmd, function (error, stdout, stderr) {
	decompile(context);
});
