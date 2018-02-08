/* eslint no-alert: 0 */

game.menuButton1 = game.menuButton.extend({
	onClick() {
		me.state.change(me.state.PLAY, game.data.level);
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
		alert('clicked option 4. This option is not implemented, yet.');
		return false;
	}
});

game.menuButton5 = game.menuButton.extend({
	onClick() {
		alert('clicked option 5. This option is not implemented, yet.');
		return false;
	}
});
