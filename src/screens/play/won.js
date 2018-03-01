game.Screens = game.Screens || {};
game.Screens.Won = me.ScreenObject.extend({
	onResetEvent() {
		const { level } = game.data;
		game.buildLevel(level, 'won');

		// Play music
		me.audio.play('won');

		game.data.levelscore = 0;

		// Time buffer for the user to not spam through the screen.
		const timeCountdown = new Date();
		let timeLeft = game.constants.bufferTimeLimitMS;

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

					this.titleFont = new me.Font('Serif', 48, '#000', 'center');
					this.points = new me.Font('Serif', 32, '#000', 'center');
					this.time = new me.Font('Serif', 32, '#000', 'center');
					this.btnFont = new me.Font('Serif', 32, '#000', 'center');
				},
				draw(renderer) {
					this.titleFont.draw(renderer, `LEVEL ${game.data.level + 1} CLEARED!`, me.game.viewport.width / 2, 150);

					this.points.draw(
						renderer,
						`Total Points: ${game.data.score}`,
						me.game.viewport.width / 2,
						300
					);

					this.time.draw(
						renderer,
						`Total Time: ${(game.data.endPlayTime / 1000).toFixed(3)}s`,
						me.game.viewport.width / 2,
						350
					);

					if (me.device.isMobile) {
						this.btnFont.draw(renderer, 'TOUCH TO CONTINUE', me.game.viewport.width / 2, 410);
					} else {
						this.btnFont.draw(renderer, 'PRESS ENTER TO CONTINUE', me.game.viewport.width / 2, 410);
					}

					if (timeLeft > 0) {
						// There is still time left on the buffer, so recalculate
						timeLeft = game.constants.bufferTimeLimitMS - (new Date() - timeCountdown);
					}

					if (timeLeft > 0) {
						// Time limit still valid.
						this.points.draw(
							renderer,
							`${(timeLeft / 1000).toFixed(3)}s`,
							me.game.viewport.width / 2,
							440
						);
					}
				},
				update() {
					return true;
				},
				onDestroyEvent() {}
			}))(),
			2
		);

		me.input.bindKey(me.input.KEY.ENTER, 'continue', true);
		me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			const bufferTimeLimitIsDone = timeLeft <= 0;

			if (action === 'continue' && bufferTimeLimitIsDone) {
				game.data.level += 1;
				me.state.change(me.state.PLAY, game.data.level, false);
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.event.unsubscribe(this.handler);
	}
});
