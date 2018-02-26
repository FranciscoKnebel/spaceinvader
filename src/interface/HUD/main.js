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
				sprite: new (me.GUI_Object.extend({
					init() {
						const image = me.loader.getImage('weapons');

						this._super(me.GUI_Object, 'init', [
							50, 50,
							{ image, frameheight: 64, framewidth: 64 }
						]);
						this.pos.z = 5;

						this.addAnimation('shotgun', [0]);
						this.addAnimation('trident', [1]);
						this.addAnimation('bomb', [2]);
						this.addAnimation('trident-bomb', [3]);
					},
					update() {
						switch (game.data.weaponEquipped) {
						case 0:
							this.setCurrentAnimation('shotgun');
							return true;
						case 1:
							this.setCurrentAnimation('trident');
							return true;
						case 2:
							this.setCurrentAnimation('bomb');
							return true;
						case 3:
							this.setCurrentAnimation('trident-bomb');
							return true;
						default:
							return false;
						}
					},
					onClick() {
						me.input.triggerKeyEvent(me.input.KEY.E, true);
					},
					onRelease() {
						me.input.triggerKeyEvent(me.input.KEY.E, false);
					},
					onOver() {
						this.onClick();
					},
					onOut() {
						this.onRelease();
					}
				}))()
			},
			ammo: {
				value: 0,
				font: new me.Font('Arial', 32, '#FFFF5C', 'left')
			},
			score: {
				value: 0,
				font: new me.Font('Arial', 64, '#FFFF5C', 'center')
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

		if (this.data.ammo.value !== game.data.weapons[game.data.weaponEquipped].ammunition) {
			this.data.ammo.value = game.data.weapons[game.data.weaponEquipped].ammunition;
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
		this.data.ammo.font.draw(context, this.data.ammo.value, 64, 50);

		this.data.score.font.draw(context, this.data.score.value, me.game.viewport.width / 2, 5);

		this.data.movementTime.font.draw(
			context,
			`${this.data.movementTime.value.toFixed(1)}ms`,
			me.game.viewport.width - 5,
			5
		);
	}
});
