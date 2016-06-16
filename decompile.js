#!/usr/bin/env node

var decompile = require('./hooks/decompileTemplates.js');

var context = {
	opts: {
		projectRoot: process.cwd()
	}
};

decompile(context);