const win32Installer = require('electron-installer-windows');
const debInstaller = require('electron-installer-debian');
const argv = require('minimist')(process.argv.slice(2));
const options = require('./installer_options');

options.src = argv._[0];
switch (argv.platform) {
case 'linux':
	if (argv.arch) {
		if (argv.arch === 'x64') {
			options.arch = 'amd64';
		} else {
			options.arch = argv.arch || 'amd64';
		}
		options.bin = 'Space Invader';

		debInstaller(options, (err) => {
			if (err) {
				console.error(err, err.stack);
				process.exit(1);
			}

			console.log(`Successfully created package ${options.src} at ${options.dest}`);
		});
	} else {
		console.error('Architecture undefined. Please pass a valid --arch argument.');
		process.exit(3);
	}

	break;

case 'win32':
	win32Installer(options, (err) => {
		if (err) {
			console.error(err, err.stack);
			process.exit(1);
		}

		console.log(`Successfully created package at ${options.dest}`);
	});

	break;
case 'darwin':
	console.error('Installer not defined for platform darwin. Soon!');
	break;
default:
	console.error('Platform invalid. Please pass a valid --platform argument.');
	process.exit(2);

	break;
}
