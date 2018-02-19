/* eslint no-alert: 0 */

game.menuButton1 = game.menuButton.extend({
	onClick() {
		game.data.startPlayTime = new Date();

		game.data.level = 0;
		game.data.score = 0;

		me.state.change(me.state.PLAY, game.data.level, true);
	}
});

game.menuButton2 = game.menuButton.extend({
	onClick() {
		me.state.change(me.state.HELP, true);
	}
});

game.menuButton3 = game.menuButton.extend({
	onClick() {
		alert('clicked option 3. This option is not implemented, yet.');
		return false;
	}
});

game.menuButton4 = game.menuButton.extend({
	onClick() {
		me.state.change(me.state.CREDITS);
	}
});
