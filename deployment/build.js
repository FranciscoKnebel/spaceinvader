const packager = require('electron-packager');
const options = require('./build_options');
const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2));

options.arch = argv.arch || 'x64';
options.platform = argv.platform || 'linux';
options.overwrite = argv.overwrite || false;
options.noinstaller = argv.noinstaller || false;

packager(options, (err, appPaths) => {
	if (err) {
		console.error(err, err.stack);
		process.exit(1);
	} else {
		console.log('Packager finished.');
		console.log('Application Paths: ');
		for (const path of appPaths) {
			console.log(`"${path}"`);
		}

		if (!options.noinstaller) {
			for (const path of appPaths) {
				const tmp = path.split('Space Invader-')[1].split('-');

				const platform = tmp[0];
				const arch = tmp[1];

				console.log(`Building installer for Platform: "${platform}" and Arch: "${arch}". Please wait...`);
				exec(`node deployment/installer "${path}" --platform ${platform} --arch ${arch}`, (error, stdout, stderr) => {
					if (error) {
						console.error(error);
					}
					
					if (stdout) {
						console.log(stdout);
					}

					if (stderr) {
						console.error(stderr);
					}
				});
			}
		}
	}
});
