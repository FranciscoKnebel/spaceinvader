// Trigger keyboard key events for toggling menu buttons
// Each button logic is defined on the start menu screen.

game.menuButton1 = game.menuButton.extend({
	onClick() {
		me.input.triggerKeyEvent(me.input.KEY.NUM1, true);
	},
	onRelease() {
		me.input.triggerKeyEvent(me.input.KEY.NUM1, false);
	}
});

game.menuButton2 = game.menuButton.extend({
	onClick() {
		me.input.triggerKeyEvent(me.input.KEY.NUM2, true);
	},
	onRelease() {
		me.input.triggerKeyEvent(me.input.KEY.NUM2, false);
	}
});

game.menuButton3 = game.menuButton.extend({
	onClick() {
		me.input.triggerKeyEvent(me.input.KEY.NUM3, true);
	},
	onRelease() {
		me.input.triggerKeyEvent(me.input.KEY.NUM3, false);
	}
});

game.menuButton4 = game.menuButton.extend({
	onClick() {
		me.input.triggerKeyEvent(me.input.KEY.NUM4, true);
	},
	onRelease() {
		me.input.triggerKeyEvent(me.input.KEY.NUM4, false);
	}
});

game.menuButton5 = game.menuButton.extend({
	onClick() {
		me.input.triggerKeyEvent(me.input.KEY.NUM5, true);
	},
	onRelease() {
		me.input.triggerKeyEvent(me.input.KEY.NUM5, false);
	}
});
