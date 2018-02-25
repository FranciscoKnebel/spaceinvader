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
			currentWeapon: {
				sprite: new (me.Sprite.extend({
					init() {
						const image = me.loader.getImage('weapons');

						this._super(me.Sprite, 'init', [
							25, 25,
							{ image, frameheight: 32, framewidth: 32 }
						]);

						this.addAnimation('shotgun', [0]);
						this.addAnimation('trident', [1]);
						this.addAnimation('bomb', [2]);
						this.addAnimation('trident-bomb', [3]);
					},
					update() {
						switch (game.data.currentWeapon) {
						case 0:
							this.setCurrentAnimation('shotgun');
							break;
						case 1:
							this.setCurrentAnimation('trident');
							break;
						case 2:
							this.setCurrentAnimation('bomb');
							break;
						case 3:
							this.setCurrentAnimation('trident-bomb');
							break;
						default:
						}
					}
				}))()
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

		me.game.world.addChild(this.data.currentWeapon.sprite, 3);
	},

	update() {
		let updated = false;

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
		this.data.movementTime.font.draw(
			context,
			`${this.data.movementTime.value.toFixed(1)}ms`,
			me.game.viewport.width - 5,
			5
		);

		this.data.score.font.draw(context, this.data.score.value, me.game.viewport.width / 2, 5);
	}
});
