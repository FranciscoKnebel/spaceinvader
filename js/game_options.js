game.data.options = {
	sound: {
		muted: false,
		changeRatio: {
			wheel: 0.0005,
			keys: 0.025
		}
	},
	mobile: {
		resolution: {
			width: 1024,
			height: 768
		},
		rendering: {
			wrapper: 'screen',
			scale: 'auto',
			scaleMethod: 'flex-width',
			antiAlias: 'true'
		}
	},
	default: {
		resolution: {
			width: 1024,
			height: 768
		},
		rendering: {
			wrapper: 'screen',
			scale: 'auto',
			scaleMethod: 'flex-width',
			antiAlias: 'true'
		}
	},
	constants: {
		bufferTimeLimitMS: 3000 // == 5 seconds
	}
};