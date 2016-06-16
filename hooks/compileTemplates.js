#!/usr/bin/env node

module.exports = function (context) {
	var fs = require('fs');
	var path = require('path');

	var wwwDir = path.join(context.opts.projectRoot, "\\www");
	var tplDir = path.join(context.opts.projectRoot, "\\www\\tpl");

	fs.readdir(wwwDir, function (err, files) {
		if (err) {
			console.log(err);

			return;
		}

		if (files.length < 1) {
			console.log("No files found");

			return;
		}

		for (var i = 0; i < files.length; i++) {
			if (files[i].endsWith('.html')) {
				try {
					var file = path.join(wwwDir, files[i]);
					var data = fs.readFileSync(file, { encoding: 'utf8' });

					var rxp = new RegExp(/<!-- \{(.*?)\.html\} -->/ig);
					var match, nData = data;

					while ((match = rxp.exec(data)) != null) {
						var tplPath = path.join(tplDir, match[1] + ".html");
						var tplData = fs.readFileSync(tplPath, { encoding: 'utf8' });

						var repl = "<!-- {start-" + match[1] + ".html} -->\n";
						repl += tplData;
						repl += "<!-- {end-" + match[1] + ".html} -->";

						nData = nData.replace(match[0], repl);
					}

					fs.writeFileSync(file, nData);
					console.log("Finished compiling " + files[i] + " template.");
				} catch (ex) {
					console.log("Failed to compile " + files[i] + " template: " + ex);
				}
			}
		}
	});
};