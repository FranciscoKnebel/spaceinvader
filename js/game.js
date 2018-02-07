/* Game namespace */
/* global me */

const game = {
	data: {
		score: 0,
		levelscore: 0,
		level: 0,
		muted: false,
		startTime: new Date()
	},

	// Run on page load.
	onload() {
		// Initialize the video.
		if (!me.video.init(640, 480, { wrapper: 'screen', scale: 'auto', antiAlias: 'false' })) {
			// alert('Your browser does not support HTML5 canvas.');
			return;
		}

		// add "#debug" to the URL to enable the debug Panel
		if (me.game.HASH.debug === true) {
			me.device.onReady(() => {
				me.plugin.register.defer(this, me.debug.Panel, 'debug', me.input.KEY.P);
			});
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
		me.state.set(me.state.MENU, new game.HelpScreen());

		// Start the game.
		game.data.startTime = new Date();
		me.state.change(me.state.MENU);
	}
};
