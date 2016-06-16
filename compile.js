#!/usr/bin/env node

var compile = require('./hooks/compileTemplates.js');

var context = {
	opts: {
		projectRoot: process.cwd()
	}
};

compile(context);