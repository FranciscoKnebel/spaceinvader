/* Game namespace */
/* global me */
/* eslint no-alert: 0 */

const game = {
	data: {
		score: 0,
		levelscore: 0,
		level: 0,
		startPlayTime: new Date()
	},

	// Run on page load.
	onload() {
		let options;
		if (me.device.isMobile) {
			options = game.data.options.mobile;
		} else {
			options = game.data.options.default;
		}

		if (!me.video.init(options.resolution.height, options.resolution.height, options.rendering)) {
			alert('Your browser does not support HTML5 canvas.');
			return;
		}

		// add "#debug" to the URL to enable the debug Panel
		if (me.game.HASH.debug === true) {
			me.device.onReady(() => {
				me.plugin.register.defer(this, me.debug.Panel, 'debug', me.input.KEY.P);
			});
		}

		// Detect if mobile and can use the accelerometer
		if (me.device.isMobile && me.device.hasAccelerometer) {
			me.device.watchAccelerometer();
		}

		// Initialize the audio.
		me.audio.init('mp3,ogg');

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);
	},

	// Run on game resources loaded.
	loaded() {
		me.pool.register('player', game.Player);
		me.pool.register('enemy', game.Enemy);
		me.pool.register('laser', game.Laser);

		this.playScreen = new game.PlayScreen();
		me.state.set(me.state.PLAY, this.playScreen);
		me.state.set(me.state.GAMEOVER, new game.LostScreen());
		me.state.set(me.state.GAME_END, new game.WonScreen());
		me.state.set(me.state.MENU, new game.StartMenuScreen());

		// User defined states
		me.state.HELP = me.state.USER;
		me.state.set(me.state.HELP, new game.HelpScreen());

		me.state.CREDITS = me.state.USER + 1;
		me.state.set(me.state.CREDITS, new game.CreditsScreen());

		// add some keyboard shortcuts
		/*
		me.event.subscribe(me.event.KEYDOWN, (action, keyCode) => {
			if (keyCode === me.input.KEY.F) {
				if (!me.device.isFullscreen) {
					me.device.requestFullscreen();
				} else {
					me.device.exitFullscreen();
				}
			}
		}); */

		// Start the game.
		game.data.startPlayTime = new Date();
		me.state.change(me.state.MENU);
	}
};
