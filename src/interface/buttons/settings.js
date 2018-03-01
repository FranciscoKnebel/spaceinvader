game.settingsSaveButton = game.menuButton.extend({
	init(x, y) {
		if (me.device.isMobile) {
			x = me.game.viewport.width / 2;
		}

		this._super(game.menuButton, 'init', [x, y, 300, 50, 'settings/save']);
	},
	onClick() {
		// Trigger exit and save key
		me.input.triggerKeyEvent(me.input.KEY.NUM1, true);
	},
	onRelease() {
		me.input.triggerKeyEvent(me.input.KEY.NUM1, false);
	}
});

game.settingsExitButton = game.menuButton.extend({
	init(x, y) {
		if (me.device.isMobile) {
			x = me.game.viewport.width / 2;
			y -= 50;
		}

		this._super(game.menuButton, 'init', [x, y, 300, 50, 'settings/exit']);
	},
	onClick() {
		// Trigger exit and cancel key
		me.input.triggerKeyEvent(me.input.KEY.NUM2, true);
	},
	onRelease() {
		me.input.triggerKeyEvent(me.input.KEY.NUM2, false);
	}
});
