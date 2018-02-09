/* eslint prefer-destructuring: 0 */
/* eslint import/no-unresolved: 0 */
// due to optional dependencies, one installer will always be missing.

let debInstaller;
let win32Installer;

const argv = require('minimist')(process.argv.slice(2));
const options = require('./installer_options');

options.src = argv._[0];
switch (argv.platform) {
case 'linux':
	debInstaller = require('electron-installer-debian');

	if (argv.arch) {
		if (argv.arch === 'x64') {
			options.arch = 'amd64';
		} else {
			options.arch = argv.arch || 'amd64';
		}
		options.bin = 'Space Invader';

		console.log(options);
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
	win32Installer = require('electron-installer-windows');

	console.log(options);
	win32Installer(options, (err) => {
		if (err) {
			console.error(err, err.stack);
			process.exit(2);
		}

		console.log(`Successfully created package ${options.src} at ${options.dest}`);
	});

	break;
case 'darwin':
case 'mas':
	console.error(`Installer not defined for platform ${argv.platform}.`);
	break;
default:
	console.log(argv);
	console.error('Platform invalid. Please pass a valid --platform argument.');
	break;
}
