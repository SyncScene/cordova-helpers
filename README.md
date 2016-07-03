# SyncScene Cordova Helpers
A collection of scripts that we use to simplify our 'bare-bones' approach to building Cordova applications.

## HTML Templates
The two hook scripts (`compileTemplates.js` and `decompileTemplates.js`) enable the use of very simple (but useful) templates within a Cordova application.  These templates allow us to eschew modern frameworks that waste precious resources without forcing us to build the application like we went back to 1996.

### Usage
The template system expects to find HTML files inside your root `www` folder.  Once one is found, it will look for template markers that have the following format:

```
<!-- {filename.html} -->
```

Given the above marker, the system will try to find an associated `filename.html` file inside the `www/tpl` directory and replace the marker with the contents of the file.  If we assume `filename.html` has the following contents:

```
	<div>My Div!</div>
```

Then at compile-time the marker will be replaced with the following code:

```
<!-- {start-filename.html} -->
	<div>My Div!</div><!-- {end-filenamel.html} -->
```

### Notes/Caveats
- If a template file isn't found, an error will be output but the file will not be changed, so the marker will remain as-is
- The replacement system is as simple as simple can be, so any extra/special characters you have in your files will be placed as-is
- Be very careful using these hook scripts with your Cordova `config.xml`, the hook events can be finnicky and unreliable for this sort of purpose (thus why we built the utilities below)

### Utilities
As a result of some difficulties with the hook system in Cordova, we generated a set of tools that can be used from the root directory of your Cordova project.

| Script Name | Example | Explanation |
| --- | --- | --- |
| build.js | `node build.js` | Decompile before compiling the templates, then execute `cordova run`. |
| | `node build.js android` | Decompile before compiling the templates, then execute `cordova run android`.  All arguments after `build.js` are passed through to the Cordova command. |
| | `node build.js -b android` | Decompile before compiling the templates, then execute `cordova build android`. |
| compile.js | `node compile.js` | Compiles the templates.  Useful for seeing the generated output. |
| decompile.js | `node decompile.js` | Decompiles the templates.  Can be run at any time to clean files. |

## To-Do
- [ ] Add conditionals to template system
- [ ] Add templates to JS files
- [ ] Add templates to CSS files
