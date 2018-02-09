const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { exec } = require('child_process');

const folderPath = argv._[0];

function getDirectories(path) {
	return fs.readdirSync(path).filter(file => fs.statSync(`${path}/${file}`).isDirectory());
}

const directories = getDirectories(folderPath);
for (let i = 0; i < directories.length; i += 1) {
	const folder = directories[i];

	if (folder.includes('invader')) {
		const platform = folder.split('invader-')[1].split('-')[0];
		let compressArgs = '';

		switch (platform) {
		case 'linux':
		case 'darwin':
		case 'mas':
			compressArgs = '--tar';
			break;
		case 'win32':
			compressArgs = '--zip';
			break;
		default:
			compressArgs = '--zip';
			break;
		}

		console.log(`Compressing "${folder}."`);
		exec(`node deployment/compress "apps/${folder}" "apps/installers/${folder}" ${compressArgs}`, (err, stdout, stderr) => {
			if (err) {
				console.error(err);
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
