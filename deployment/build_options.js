module.exports = {
	dir: 'build/',
	out: 'apps/',
	asar: true,
	appCopyright: 'Francisco Knebel',
	electronVersion: '1.8.4',
	// icon: 'icons/appIcon', // .icns for darwin, .ico for win32, .png for linux
	name: 'Space Invader',
	arch: '', // Allowed values: ia32, x64, armv7l, all
	platform: '', // Allowed values: linux, win32, darwin, mas, all
	win32metadata: {
		CompanyName: '',
		FileDescription: '',
		OriginalFilename: '',
		ProductName: '',
		InternalName: ''
	},
	overwrite: true
};
