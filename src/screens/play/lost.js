game.Screens = game.Screens || {};
game.Screens.Lost = me.ScreenObject.extend({
	onResetEvent() {
		const { level } = game.data;
		game.buildLevel(level, 'lost');

		// Play music
		me.audio.stopTrack();
		me.audio.play('lost');

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

					this.titleFont = new me.Font('Serif', 72, '#000', 'center');
					this.level = new me.Font('Serif', 32, '#000', 'center');
					this.points = new me.Font('Serif', 32, '#000', 'center');
					this.btnFont = new me.Font('Serif', 32, '#000', 'center');

					this.timeCountdown = new Date();
				},
				draw(renderer) {
					this.titleFont.draw(renderer, 'YOU LOSE!', me.game.viewport.width / 2, 150);

					this.level.draw(
						renderer,
						`Final level: ${game.data.level + 1}`,
						me.game.viewport.width / 2,
						250
					);

					this.points.draw(
						renderer,
						`Total Points: ${game.data.score}`,
						me.game.viewport.width / 2,
						300
					);

					this.points.draw(
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

		me.game.world.addChild(new game.GUI.ScoreInput(
			500, 'text', 10,
			(name) => {
				if (name.length > 0) {
					game.socket.submitNewScore(game.data.score, game.data.level + 1, name);
				}
			}
		), 3);

		me.input.bindKey(me.input.KEY.ENTER, 'continue', true);
		me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			const bufferTimeLimitIsDone = timeLeft <= 0;

			if (action === 'continue' && bufferTimeLimitIsDone) {
				game.data.level = 0;
				game.data.score = 0;

				me.state.change(me.state.MENU);
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.event.unsubscribe(this.handler);

		me.audio.stopTrack();
	}
});
