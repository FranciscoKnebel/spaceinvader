game.settingsOptions = [
	{
		title: 'RESOLUTION',
		id: 'resolution',
		options: [
			{ value: { width: 800, height: 600 }, text: '800x600' },
			{ value: { width: 1024, height: 768 }, text: '1024x768' },
			{ value: { width: 1600, height: 900 }, text: '1600x900' },
			{ value: { width: 1920, height: 1080 }, text: '1920x1080' }
		]
	},
	{
		title: 'SCALE',
		id: 'scale',
		options: [
			{ value: 'auto', text: 'auto' },
			{ value: '1', text: '1' },
			{ value: '0.5', text: '0.5' },
			{ value: '2', text: '2' }
		]
	},
	{
		title: 'SCALE METHOD',
		id: 'scaleMethod',
		options: [
			{ value: 'fit', text: 'fit' },
			{ value: 'fill-min', text: 'fill-min' },
			{ value: 'fill-max', text: 'fill-max' },
			{ value: 'flex', text: 'flex' },
			{ value: 'flex-width', text: 'flex-width' },
			{ value: 'flex-height', text: 'flex-height' },
			{ value: 'stretch', text: 'stretch' }
		]
	},
	{
		title: 'ANTI-ALIAS',
		id: 'antiAlias',
		options: [
			{ value: 'true', text: 'Enabled' },
			{ value: 'false', text: 'Disabled' }
		]
	},
	{
		title: 'DOUBLE BUFFERING',
		id: 'doubleBuffering',
		options: [
			{ value: 'true', text: 'Enabled' },
			{ value: 'false', text: 'Disabled' }
		]
	},
	{
		title: 'SOUND QUALITY',
		id: 'sound',
		options: [
			{ value: 'low', text: 'Low' },
			{ value: 'mid', text: 'Mid' },
			{ value: 'high', text: 'High' }
		]
	}
];
