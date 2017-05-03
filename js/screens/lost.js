game.LostScreen = me.ScreenObject.extend({
	onResetEvent() {
		me.game.world.addChild(new me.ColorLayer('background', game.colors.backgrounds.lost), 0);

		// Play music
		me.audio.play('lost');

		me.game.world.addChild(
			new (me.Renderable.extend({
				init() {
					this._super(me.Renderable, 'init', [
						0,
						0,
						me.game.viewport.width,
						me.game.viewport.height,
					]);

					this.titleFont = new me.Font('Serif', 72, '#000', 'center');
					this.level = new me.Font('Serif', 32, '#000', 'center');
					this.points = new me.Font('Serif', 32, '#000', 'center');
					this.btnFont = new me.Font('Serif', 32, '#000', 'center');
				},
				draw(renderer) {
					this.titleFont.draw(renderer, 'YOU LOSE!', me.game.viewport.width / 2, 150);
					this.level.draw(
						renderer,
						`Final level: ${game.data.level + 1}`,
						me.game.viewport.width / 2,
						250,
					);
					this.points.draw(
						renderer,
						`Total Points: ${game.data.score}`,
						me.game.viewport.width / 2,
						300,
					);
					this.points.draw(
						renderer,
						`Total Time: ${(game.data.endTime / 1000).toFixed(3)}s`,
						me.game.viewport.width / 2,
						350,
					);
					this.btnFont.draw(renderer, 'PRESS ENTER TO RESTART', me.game.viewport.width / 2, 410);
				},
				update() {
					return true;
				},
				onDestroyEvent() {},
			}))(),
			2,
		);

		me.input.bindKey(me.input.KEY.ENTER, 'restart', true);
		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			if (action === 'restart') {
				game.data.level = 0;
				game.data.score = 0;

				// marky.mark('startGame');
				game.data.startTime = new Date();
				me.state.change(me.state.PLAY);
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.handler);

		me.audio.stopTrack();
		me.audio.playTrack('tronicles');
	},
});
