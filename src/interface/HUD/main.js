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
			sound: new (me.GUI_Object.extend({
				init() {
					const image = me.loader.getImage('sound');

					this._super(me.GUI_Object, 'init', [
						me.game.viewport.width - 64, 50,
						{ image, frameheight: 64, framewidth: 64 }
					]);
					this.pos.z = 5;

					this.addAnimation('muted', [0]);
					this.addAnimation('unmuted', [1]);
				},
				update() {
					if (game.options.sound.muted) {
						this.setCurrentAnimation('muted');
					} else {
						this.setCurrentAnimation('unmuted');
					}
				},
				onClick() {
					me.input.triggerKeyEvent(me.input.KEY.K, true);
				},
				onRelease() {
					me.input.triggerKeyEvent(me.input.KEY.K, false);
				}
			}))(),
			ammo: {
				value: 0,
				font: new me.Font('Arial', 32, '#FFFF5C', 'left')
			},
			damage: {
				value: 0,
				font: new me.Font('Arial', 16, '#C91D03', 'left')
			},
			reloadCost: {
				value: 0,
				font: new me.Font('Arial', 16, '#FFF', 'left')
			},
			score: {
				value: 0,
				font: new me.Font('Arial', 64, '#FFFF5C', 'center')
			},
			health: {
				value: 0,
				font: new me.Font('Serif', 24, '#C91D03', 'center')
			},
			line: new (me.Renderable.extend({
				init() {
					this._super(me.Renderable, 'init', [0, game.playing.player.pos.y, me.game.viewport.width, 2]);
					this.anchorPoint.set(0, 0);
					console.log('init');
				},
				draw(renderer) {
					renderer.setColor('#CBA');
					console.log(this.width);
					renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
				},
				update() {
					return false;
				}
			}))()
		};

		me.game.world.addChild(this.data.currentWeapon.sprite, 3);
		me.game.world.addChild(this.data.sound, 4);
		me.game.world.addChild(this.data.line, 1);
	},

	update() {
		let updated = false;

		if (this.data.ammo.value !== game.data.weapons[game.data.weaponEquipped].ammunition) {
			this.data.ammo.value = game.data.weapons[game.data.weaponEquipped].ammunition;
			updated = true;
		}

		if (this.data.damage.value !== game.data.weapons[game.data.weaponEquipped].damage) {
			this.data.damage.value = game.data.weapons[game.data.weaponEquipped].damage;
			updated = true;
		}

		if (this.data.reloadCost.value !== game.data.weapons[game.data.weaponEquipped].reloadCost) {
			this.data.reloadCost.value = game.data.weapons[game.data.weaponEquipped].reloadCost;
			updated = true;
		}

		if (this.data.health.value !== game.playing.player.stats.health) {
			this.data.health.value = game.playing.player.stats.health;
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
		this.data.damage.font.draw(context, `${this.data.damage.value}`, 25, 25);
		this.data.reloadCost.font.draw(context, `${this.data.reloadCost.value}`, 25, 70);
		this.data.score.font.draw(context, this.data.score.value, me.game.viewport.width / 2, 5);
		this.data.health.font.draw(
			context, this.data.health.value,
			game.playing.player.pos.x + game.playing.player.width / 2 + 5, me.game.viewport.height - 20
		);
	}
});
