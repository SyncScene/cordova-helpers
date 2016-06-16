#!/usr/bin/env node

module.exports = function (context) {
	var fs = require('fs');
	var path = require('path');

	var wwwDir = path.join(context.opts.projectRoot, "\\www");

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
			if (files[i].endsWith(".html")) {
				try {
					var file = path.join(wwwDir, files[i]);
					var data = fs.readFileSync(file, { encoding: 'utf8' });

					var rxp = new RegExp(/<!-- \{start-(.*?)\.html\} -->([\s\S]*?)<!-- \{end-\1\.html\} -->\s*[\r\n]/gim);
					var match, nData = data;

					while ((match = rxp.exec(data)) != null) {
						var repl = "<!-- {" + match[1] + ".html} -->\n";

						nData = nData.replace(match[0], repl);
					}

					fs.writeFileSync(file, nData);
					console.log("Finished de-compiling " + files[i] + " template.");
				} catch (ex) {
					console.log("Failed to de-compile " + files[i] + " template: " + ex);
				}
			}
		}
	});
};