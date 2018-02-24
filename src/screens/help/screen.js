game.Screens = game.Screens || {};
game.Screens.Help = me.ScreenObject.extend({
	onResetEvent(fromStartMenu) {
		me.audio.pauseTrack();
		me.audio.play('hit');

		me.game.world.addChild(new me.ColorLayer('background', '#000000'), 0);

		me.game.world.addChild(
			new (me.Renderable.extend({
				init() {
					this._super(me.Renderable, 'init', [
						0,
						0,
						me.game.viewport.width,
						me.game.viewport.height
					]);

					this.anchorPoint.set(0, 0);

					this.titleFont = new me.Font('Serif', 72, '#FFFFFF', 'center');
					this.version = new me.Font('Serif', 24, '#FFFFFF', 'center');

					this.commandFont = new me.Font('Serif', 24, '#FFFFFF', 'left');
					this.descriptionFont = new me.Font('Serif', 24, '#FFFFFF', 'right');
					this.btnFont = new me.Font('Serif', 32, '#FFFFFF', 'center');
				},
				draw(renderer) {
					game.Title.draw(renderer, this.titleFont, this.version);

					this.commandFont.draw(renderer, 'Key A & LEFT', 50, 175);
					this.descriptionFont.draw(renderer, 'move left', me.game.viewport.width - 50, 175);

					this.commandFont.draw(renderer, 'Key D & RIGHT', 50, 225);
					this.descriptionFont.draw(renderer, 'move right', me.game.viewport.width - 50, 225);

					this.commandFont.draw(renderer, 'Key SPACE & LCLICK', 50, 275);
					this.descriptionFont.draw(renderer, 'shoot', me.game.viewport.width - 50, 275);

					this.commandFont.draw(renderer, 'J/K/L & 1/2/3', 50, 325);
					this.descriptionFont.draw(renderer, '+/Mute/- Volume', me.game.viewport.width - 50, 325);

					if (me.device.isMobile) {
						this.btnFont.draw(renderer, 'TOUCH TO CONTINUE', me.game.viewport.width / 2, 400);
					} else {
						this.btnFont.draw(renderer, 'PRESS ENTER TO CONTINUE', me.game.viewport.width / 2, 400);
					}
				},
				update() {
					return true;
				},
				onDestroyEvent() {}
			}))(),
			2
		);

		me.input.bindKey(me.input.KEY.ENTER, 'resume', true);
		me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			if (action === 'resume') {
				if (fromStartMenu) {
					me.state.change(me.state.MENU);
				} else {
					me.state.change(me.state.PLAY, game.data.level, false);
				}
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.event.unsubscribe(this.handler);
	}
});
