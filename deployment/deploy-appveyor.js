const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const exec = require('child_process').exec;

const folderPath = argv._[0];

function getDirectories(path) {
	return fs.readdirSync(path).filter(file => fs.statSync(`${path}/${file}`).isDirectory());
}

for (const folder of getDirectories(folderPath)) {
	if (folder.includes('Space Invader')) {
		const compressArgs = '--zip';

		console.log(`Compressing "${folder}."`);
		console.log(`node deployment/compress "apps/${folder}" "apps/installers/${folder}" ${compressArgs}`);
		exec(
			`node deployment/compress "apps/${folder}" "apps/installers/${folder}" ${compressArgs}`,
			(err, stdout, stderr) => {
				if (err) {
					console.error(err);
				}

				if (stdout) {
					console.log(stdout);
				}

				if (stderr) {
					console.error(stderr);
				}
			}
		);
	}
}
