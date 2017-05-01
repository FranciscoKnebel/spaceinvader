module.exports = (grunt) => {
	function task() {
		const path = require('path');

		const	options = this.options({
			varname: 'game.resources',
		});
		const res = [];
		const audio = {};

		grunt.log.debug(`options: ${JSON.stringify(options)}`);
		grunt.log.debug(`files: ${JSON.stringify(this.files)}`);

		this.files.forEach((file) => {
			file.src.forEach((src) => {
				const name = path.basename(src, path.extname(src));
				if ((file.type !== 'audio') || (!Object.prototype.hasOwnProperty.call(audio, name))) {
					if (file.type === 'audio') {
						audio[name] = true;
					}
					res.push({
						name,
						type: file.type,
						src: (
							file.type === 'audio' ?
							`${path.dirname(src)}/` :
							src
            ),
					});
				}
			});
		});

		grunt.log.debug(JSON.stringify(res));

		grunt.file.write(
			options.dest,
			`${options.varname} = ${JSON.stringify(res, null, 4)};`
		);
		grunt.log.ok(options.dest);
	}

	grunt.registerMultiTask('resources', 'Build melonJS resources.js', task);
};
