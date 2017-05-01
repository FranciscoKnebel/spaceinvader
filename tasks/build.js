const packager = require('electron-packager');
const options = require('./build_options');

const argv = require('minimist')(process.argv.slice(2));

options.arch = argv.arch || 'x64';
options.platform = argv.platform || 'linux';
options.overwrite = argv.overwrite || false;

packager(options, (err, appPaths) => {
	if (err) {
		console.error(err);
	} else {
		console.log('Packager finished.');
		console.log('Application Paths: ');
		for (const path of appPaths) {
			console.log(`"${path}"`);
		}
	}
});
