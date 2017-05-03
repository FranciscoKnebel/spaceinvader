const targz = require('tar.gz');
const zip = require('zip-folder');
const argv = require('minimist')(process.argv.slice(2));

const src = argv._[0];
const dst = argv._[1];

if (argv.zip) {
	zip(src, `${dst}.zip`, (err) => {
		if (err) {
			console.log('oh no!', err);
		} else {
			console.log(`Folder "${src}" zipped correctly.`);
		}
	});
}

if (argv.tar) {
	targz()
		.compress(src, `${dst}.tar.gz`)
		.then(() => {
			console.log(`Folder "${src}" tar compression finished correctly.`);
		})
		.catch((err) => {
			console.log('Something is wrong ', err.stack);
		});
}
