game.GUI = game.GUI || {};
game.GUI.HUD = game.GUI.HUD || {};

game.GUI.HUD.Container = me.Container.extend({
	init() {
		this._super(me.Container, 'init');

		this.isPersistent = false;
		this.floating = true;
		this.name = 'HUD';

		this.addChild(new game.GUI.HUD.ScoreItem(5, 5));
	}
});

game.GUI.HUD.ScoreItem = me.Renderable.extend({
	init(x, y) {
		this._super(me.Renderable, 'init', [x, y, 10, 10]);

		this.data = {
			enemyQuantity: {
				value: -1,
				font: new me.Font('Serif', 24, '#FFFFFF', 'left')
			},
			score: {
				value: 0,
				font: new me.Font('Arial', 32, '#FFFF5C', 'center')
			},
			movementTime: {
				value: 0,
				font: new me.Font('Serif', 24, '#285428', 'right')
			}
		};
	},

	update() {
		let updated = false;

		if (this.data.enemyQuantity.value !== game.playing.enemyManager.children.length) {
			this.data.enemyQuantity.value = game.playing.enemyManager.children.length;
			updated = true;
		}

		if (this.data.movementTime.value !== game.data.movementTime) {
			this.data.movementTime.value = game.data.movementTime;
			updated = true;
		}

		if (this.data.score.value !== game.data.score) {
			this.data.score.value = game.data.score;
			updated = true;
		}

		return updated;
	},

	draw(context) {
		this.data.enemyQuantity.font.draw(context, `${this.data.enemyQuantity.value} enemies`, 5, 5);

		this.data.movementTime.font.draw(
			context,
			`${this.data.movementTime.value.toFixed(1)}ms`,
			me.game.viewport.width - 5,
			5
		);

		this.data.score.font.draw(context, this.data.score.value, me.game.viewport.width / 2, 5);
	}
});
