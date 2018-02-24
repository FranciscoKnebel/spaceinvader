game.Screens = game.Screens || {};
game.Screens.Highscores = me.ScreenObject.extend({
	onResetEvent() {
		me.audio.pauseTrack();
		me.audio.play('hit');

		me.game.world.addChild(new me.ColorLayer('background', '#000000'), 0);

		// fetch highscore from API.
		const highscores = [];
		let fetchScoreMessage = 'Fetching scores...';

		const versionsURI = `${game.constants.highscoresURI}/api/v1/scores/top10/all-time/${game.constants.version}`;
		fetch(versionsURI)
			.then(res => res.json())
			.then((res) => {
				highscores.push(...res.data);

				if (res.data.length === 0) {
					fetchScoreMessage = 'No results.';
				}
			});

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

					this.titleFont = new me.Font('Serif', 32, '#FFFFFF', 'center');
					this.version = new me.Font('Serif', 20, '#FFFFFF', 'center');

					this.scores = new me.Font('Serif', 28, '#FFFFFF', 'left');
					this.btnFont = new me.Font('Serif', 32, '#FFFFFF', 'center');
				},
				draw(renderer) {
					game.Title.draw(renderer, this.titleFont, this.version, 50, 82);

					if (highscores.length > 0) {
						let height = 130;
						this.titleFont.draw(renderer, 'TOP 10', me.game.viewport.width / 2, height);

						height += 30;
						for (let i = 0; i < highscores.length && i < 10; i += 1) {
							height += 30;
							this.scores.draw(
								renderer,
								`${i + 1}: ${highscores[i].score} - level ${highscores[i].level} - ${highscores[i].player}`,
								me.game.viewport.width / 4, height
							);
						}
					} else {
						this.btnFont.draw(renderer, fetchScoreMessage, me.game.viewport.width / 2, 200);
					}

					if (me.device.isMobile) {
						this.btnFont.draw(renderer, 'TOUCH TO CONTINUE', me.game.viewport.width / 2, 550);
					} else {
						this.btnFont.draw(renderer, 'PRESS ENTER TO CONTINUE', me.game.viewport.width / 2, 550);
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
				me.state.change(me.state.MENU);
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.event.unsubscribe(this.handler);
	}
});
