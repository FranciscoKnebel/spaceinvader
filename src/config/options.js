game.default_options = {
	sound: {
		quality: game.onApp ? 'high' : 'low',
		volume: 0.7,
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
			antiAlias: 'true',
			doubleBuffering: 'true'
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
			antiAlias: 'true',
			doubleBuffering: 'true'
		}
	}
};
