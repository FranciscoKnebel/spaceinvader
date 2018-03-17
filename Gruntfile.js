const today = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');

module.exports = (grunt) => {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'lib/melonjs.js',
					'lib/plugins/**/*.js',
					'src/game.js',
					'build/js/resources.js',
					'build/js/music_resources.js',
					'src/**/*.js'
				],
				dest: 'build/js/app.js'
			}
		},

		copy: {
			dist: {
				files: [
					{
						src: 'index.css',
						dest: 'build/index.css'
					},
					{
						src: 'fonts.css',
						dest: 'build/fonts.css'
					},
					{
						src: 'main.js',
						dest: 'build/main.js'
					},
					{
						src: 'manifest.json',
						dest: 'build/manifest.json'
					},
					{
						src: 'package.json',
						dest: 'build/package.json'
					},
					{
						src: 'data/**/*',
						dest: 'build/',
						expand: true
					},
					{
						src: 'icons/*',
						dest: 'build/',
						expand: true
					},
					{
						src: 'icons/favicon.ico',
						dest: 'build/favicon.ico'
					}
				]
			}
		},

		clean: {
			app: ['build/js/app.js'],
			dist: ['build/', 'bin/']
		},

		processhtml: {
			dist: {
				options: {
					process: true,
					data: {
						title: '<%= pkg.name %>'
					}
				},
				files: {
					'build/index.html': ['index.html']
				}
			}
		},

		replace: {
			dist: {
				options: {
					usePrefix: false,
					force: true,
					patterns: [
						{
							match: /this\._super\(\s*([\w]+)\s*,\s*["'](\w+)["']\s*(,\s*)?/g,
							replacement: '$1.prototype.$2.apply(this$3'
						},
						{
							match: /(<<si_release_version>>)/g,
							replacement: `${require('./package.json').version}`
						},
						{
							match: /(<<si_current_date>>)/g,
							replacement: today
						}
					]
				},
				files: [
					{
						src: ['build/js/app.js'],
						dest: 'build/js/app.js'
					}
				]
			}
		},

		uglify: {
			options: {
				report: 'min',
				preserveComments: 'some'
			},
			dist: {
				files: {
					'build/js/app.min.js': ['build/js/app.js']
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					keepalive: false
				}
			}
		},

		'download-electron': {
			version: '1.8.4',
			outputDir: 'bin',
			rebuild: false,
			token: process.env.GITHUB_API_TOKEN || process.env.GHTOKEN
		},

		asar: {
			dist: {
				cwd: 'build',
				src: ['**/*', '!src/app.js'],
				expand: true,
				dest: `bin/${process.platform === 'darwin' ? 'Electron.app/Contents/Resources/' : 'resources/'}app.asar`
			}
		},

		resources: {
			dist: {
				files: [
					{
						src: ['data/bgm/**/*', '!data/bgm/high_res/*', '!data/bgm/mid_res/*', '!data/bgm/unused/**/*'],
						type: 'audio',
						bgm: true
					},
					{
						src: ['data/sfx/**/*'],
						type: 'audio'
					},
					{
						src: ['data/img/**/*.png'],
						type: 'image'
					},
					{
						src: ['data/img/**/*.json'],
						type: 'json'
					},
					{
						src: ['data/map/**/*.tmx', 'data/map/**/*.json'],
						type: 'tmx'
					},
					{
						src: ['data/map/**/*.tsx'],
						type: 'tsx'
					}
				]
			}
		},

		watch: {
			resources: {
				files: ['data/**/*'],
				tasks: ['resources'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-download-electron');
	grunt.loadNpmTasks('grunt-asar');

	// Custom Tasks
	grunt.loadTasks('tasks');

	grunt.registerTask('default', [
		'resources',
		'concat',
		'replace',
		'uglify',
		'copy',
		'processhtml',
		'clean:app'
	]);
	grunt.registerTask('dist', ['default', 'download-electron', 'asar']);
	grunt.registerTask('dev', ['resources', 'connect', 'watch']);
};
