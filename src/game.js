/* Game namespace */
/* global me */
/* eslint no-alert: 0 */

const game = {
	// Run on page load.
	onload() {
		let options;
		if (me.device.isMobile) {
			options = game.options.mobile;
		} else {
			options = game.options.default;
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

		// Load the game resources.
		me.loader.preload(game.resources);

		// Load the music resources.
		// TODO: Check on user settings for music quality option
		// TODO: Load music resources according to quality option
		// TODO: Default to low quality music, for fast loading
		me.loader.preload(game.music_resources);

		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);

		// Disable gravity.
		me.sys.gravity = 0;
	},

	// Run on game resources loaded.
	loaded() {
		me.pool.register('player', game.Entities.Player);
		me.pool.register('enemy', game.Entities.Enemy, true);
		me.pool.register('laser', game.Entities.Laser, true);
		me.pool.register('bomb', game.Entities.Weapons.Bomb, true);
		me.pool.register('trident', game.Entities.Weapons.Trident, true);
		me.pool.register('trident-bomb', game.Entities.Weapons.Trident, true);
		me.pool.register('shotgun', game.Entities.Weapons.Shotgun, true);

		this.playing = new game.Screens.Play();
		me.state.set(me.state.PLAY, this.playing);
		me.state.set(me.state.GAMEOVER, new game.Screens.Lost());
		me.state.set(me.state.GAME_END, new game.Screens.Won());
		me.state.set(me.state.MENU, new game.Screens.Start());
		me.state.set(me.state.SCORE, new game.Screens.Highscores());

		// User defined states
		me.state.HELP = me.state.USER;
		me.state.set(me.state.HELP, new game.Screens.Help());

		me.state.CREDITS = me.state.USER + 1;
		me.state.set(me.state.CREDITS, new game.Screens.Credits());

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
