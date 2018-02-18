module.exports = (grunt) => {
	function task() {
		const path = require('path');
		const fs = require('fs');

		const options = this.options({
			dest: 'build/js/resources.js',
			varname: 'game.resources'
		});

		const audioOptions = this.options({
			dest: 'build/js/music_resources.js',
			varname: 'game.music_resources'
		});

		const res = {
			bgm: [],
			others: []
		};

		const audio = {};

		grunt.log.debug(`options: ${JSON.stringify(options)}`);
		grunt.log.debug(`files: ${JSON.stringify(this.files)}`);

		this.files.forEach((file) => {
			file.src.forEach((src) => {
				const name = path.basename(src, path.extname(src));
				if (file.type !== 'audio' || !Object.prototype.hasOwnProperty.call(audio, name)) {
					// Do not include "directory files" in resource files
					if (!fs.lstatSync(src).isDirectory()) {
						if (file.type === 'audio') {
							audio[name] = true;

							if (file.bgm) {
								// Push all bgm to music_resources.js
								res.bgm.push({
									name,
									type: file.type,
									src: `${path.dirname(src)}/`
								});
							} else {
								// Push others sounds to resources.js
								res.others.push({
									name,
									type: file.type,
									src: `${path.dirname(src)}/`
								});
							}
						} else {
							// Push all other resources to resources.js
							res.others.push({
								name,
								type: file.type,
								src
							});
						}
					}
				}
			});
		});

		grunt.log.debug(JSON.stringify(res));
		grunt.file.write(options.dest, `${options.varname} = ${JSON.stringify(res.others, null, 4)};`);
		grunt.log.ok(options.dest);

		grunt.log.debug(JSON.stringify(res.bgm));
		grunt.file.write(audioOptions.dest, `${audioOptions.varname} = ${JSON.stringify(res.bgm, null, 4)};`);
		grunt.log.ok(audioOptions.dest);
	}

	grunt.registerMultiTask('resources', 'Build melonJS resource files.', task);
};
