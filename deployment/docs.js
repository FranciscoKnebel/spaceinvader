const source = 'build';
const destination = 'docs';
const cwd = process.cwd();

const { ncp } = require('ncp');
const rm = require('rmfr');

ncp.limit = 16;

const options = {
	filter(name) {
		switch (name) {
		case `${cwd}/build/main.js`:
			return false;
		default:
			return true;
		}
	}
};

function copyToDocs() {
	ncp(source, destination, options, (err) => {
		if (err) {
			return console.error(err);
		}
	});
}

rm(destination).then(copyToDocs);
