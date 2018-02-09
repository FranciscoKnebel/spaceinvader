const packager = require('electron-packager');
const options = require('./build_options');
const { exec } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

options.arch = argv.arch || 'x64';
options.overwrite = argv.overwrite || false;
options.noinstaller = argv.noinstaller || false;

packager(options, (err, paths) => {
	if (err) {
		console.error(err, err.stack);
		process.exit(1);
	} else {
		if (paths) {
			console.log('Packager finished.');
			console.log('Application Paths: ');

			for (let i = 0; i < paths.length; i += 1) {
				console.log(`"${paths[i]}"`);
			}
		}

		if (!options.noinstaller) {
			for (let i = 0; i < paths.length; i += 1) {
				const path = paths[i];
				const tmp = path.split('spaceinvader-')[1].split('-');

				const platform = tmp[0];
				const arch = tmp[1];

				if (!(platform === 'win32' && arch === 'ia32')) {
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
	}
});
