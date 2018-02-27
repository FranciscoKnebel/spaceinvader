game.Entities = game.Entities || {};
game.Entities.Player = me.Sprite.extend({
	init() {
		const image = me.loader.getImage('player');

		this._super(me.Sprite, 'init', [
			me.game.viewport.width / 2 - image.width / 2,
			me.game.viewport.height - image.height,
			{ image }
		]);

		this.maxX = me.game.viewport.width - this.width;
	},

	update(time) {
		this._super(me.Sprite, 'update', [time]);

		this.movementControls(time);
		this.shootingControls();
		this.volumeControls();

		this.pos.x = this.pos.x.clamp(this.width, this.maxX);

		return true;
	},

	movementControls(time) {
		const velx = 450;

		if (me.input.isKeyPressed('left') || me.device.accelerationX > 1) {
			this.pos.x -= velx * time / 1000;
		}

		if (me.input.isKeyPressed('right') || me.device.accelerationX < -1) {
			this.pos.x += velx * time / 1000;
		}

		if (me.device.isMobile) {
			if (me.device.accelerationX > 0.4) {
				this.pos.x -= velx / 3 * time / 1000;
			} else if (me.device.accelerationX < -0.4) {
				this.pos.x += velx / 3 * time / 1000;
			}
		}
	},
	shootingControls() {
		const equiped = game.data.weaponEquipped;
		if (me.input.isKeyPressed('shoot') && game.data.weapons[equiped].ammunition > 0) {
			game.data.weapons[equiped].ammunition -= 1;
			this.shoot(equiped);
		}

		if (me.input.isKeyPressed('reload') && game.data.weapons[equiped].ammunition === 0) {
			this.reloadEquippedWeapon();
		}

		if (me.input.isKeyPressed('weapon-minus')) {
			game.data.weaponEquipped -= 1;
			if (game.data.weaponEquipped < 0) {
				game.data.weaponEquipped = 3;
			}
		}

		if (me.input.isKeyPressed('weapon-plus')) {
			game.data.weaponEquipped += 1;
			if (game.data.weaponEquipped > 3) {
				game.data.weaponEquipped = 0;
			}

			// if mobile, autoreload on weapon change.
			if (me.device.isMobile) {
				this.reloadEquippedWeapon();
			}
		}
	},
	reloadEquippedWeapon() {
		const { weaponEquipped } = game.data;
		const { ammunition, reloadAmount, reloadCost } = game.data.weapons[weaponEquipped];

		const amountToReload = reloadAmount - ammunition;

		// Only deduct points from amount left to reload
		game.data.score -= Math.floor((amountToReload * reloadCost) / reloadAmount);
		game.data.weapons[weaponEquipped].ammunition = game.data.weapons[weaponEquipped].reloadAmount;
	},
	shoot(equiped) {
		const { name, extraArg } = game.data.weapons[equiped];

		me.game.world.addChild(me.pool.pull(name, this.pos.x -
		(game.Entities.Weapons.Shotgun.width / 2), this.pos.y - this.height / 2, extraArg));
	},
	volumeControls() {
		if (me.input.isKeyPressed('volume-plus')) {
			const currentVolume = me.audio.getVolume();

			if (currentVolume <= 1.0) {
				me.audio.setVolume(currentVolume + game.options.sound.changeRatio.keys);
			}
		}

		if (me.input.isKeyPressed('volume-mute')) {
			if (game.options.sound.muted === true) {
				me.audio.unmuteAll();
			} else {
				me.audio.muteAll();
			}

			game.options.sound.muted = !game.options.sound.muted;
		}

		if (me.input.isKeyPressed('volume-minus')) {
			const currentVolume = me.audio.getVolume();

			if (currentVolume >= game.options.sound.changeRatio.keys) {
				me.audio.setVolume(currentVolume - game.options.sound.changeRatio.keys);
			}
		}

		me.event.subscribe('wheel', (event) => {
			const currentVolume = me.audio.getVolume();

			me.input.releasePointerEvent('wheel', me.game.viewport);

			if (event.deltaY < 0) {
				if (currentVolume <= 1.0) {
					me.audio.setVolume(currentVolume + game.options.sound.changeRatio.wheel);
				}
			} else if (currentVolume >= game.options.sound.changeRatio.wheel) {
				me.audio.setVolume(currentVolume - game.options.sound.changeRatio.wheel);
			}

			me.input.registerPointerEvent('wheel', me.game.viewport, (event2) => {
				me.event.publish('wheel', [event2]);
			});
		});
	}
});
