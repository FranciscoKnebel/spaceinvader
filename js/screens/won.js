game.WonScreen = me.ScreenObject.extend({
	onResetEvent() {
		const level = game.data.level;
		let background = '#63C664';

		if (game.colors.backgrounds.won.length > level) {
			background = game.colors.backgrounds.won[level];
		} else {
			background = game.colors.backgrounds.won[game.colors.backgrounds.won.length - 1];
		}
		me.game.world.addChild(new me.ColorLayer('background', background), 0);

		// Play music
		me.audio.play('won');

		me.game.world.addChild(
			new (me.Renderable.extend({
				init() {
					this._super(me.Renderable, 'init', [
						0,
						0,
						me.game.viewport.width,
						me.game.viewport.height,
					]);

					this.titleFont = new me.Font('Serif', 64, '#000', 'center');
					this.level = new me.Font('Serif', 32, '#000', 'center');
					this.points = new me.Font('Serif', 32, '#000', 'center');
					this.btnFont = new me.Font('Serif', 32, '#000', 'center');
				},
				draw(renderer) {
					this.titleFont.draw(renderer, 'LEVEL CLEARED!', me.game.viewport.width / 2, 150);
					this.level.draw(
						renderer,
						`Current level: ${game.data.level + 1}`,
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
						`Total Time: ${(game.data.endTime / 1000).toFixed(3)}s`,
						me.game.viewport.width / 2,
						350
					);
					this.btnFont.draw(renderer, 'PRESS ENTER TO CONTINUE', me.game.viewport.width / 2, 410);
				},
				update() {
					return true;
				},
				onDestroyEvent() {},
			}))(),
			2
		);

		me.input.bindKey(me.input.KEY.ENTER, 'continue', true);
		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			if (action === 'continue') {
				me.state.change(me.state.PLAY);
				game.data.level += 1;
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.handler);
	},
});
