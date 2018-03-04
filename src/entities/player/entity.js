game.Entities = game.Entities || {};
game.Entities.Player = me.Entity.extend({
	init() {
		const image = me.loader.getImage('player');

		this._super(me.Entity, 'init', [
			me.game.viewport.width / 2 - image.width / 2,
			me.game.viewport.height - image.height - game.data.player.positionOffset,
			{
				image,
				width: 64,
				height: 64
			}
		]);
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;

		this.stats = {
			health: game.data.player.startingHealth
		};

		this.maxX = me.game.viewport.width - this.width;
	},

	update(time) {
		this._super(me.Entity, 'update', [time]);

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

		me.game.world.addChild(me.pool.pull(
			name,
			this.pos.x + this.width / 2 - 2,
			this.pos.y - game.data.player.positionOffset / 3 - 2,
			extraArg
		));
	},
	volumeControls() {
		if (me.input.isKeyPressed('volume-plus')) {
			const currentVolume = me.audio.getVolume();

			if (currentVolume <= 1.0) {
				const newVolume = currentVolume + game.options.sound.changeRatio.keys;

				game.options.sound.volume = newVolume;
				me.audio.setVolume(newVolume);
			}
		}

		if (me.input.isKeyPressed('volume-mute')) {
			game.options.sound.muted ? me.audio.unmuteAll() : me.audio.muteAll();

			game.options.sound.muted = !game.options.sound.muted;
		}

		if (me.input.isKeyPressed('volume-minus')) {
			const currentVolume = me.audio.getVolume();

			if (currentVolume >= game.options.sound.changeRatio.keys) {
				const newVolume = currentVolume - game.options.sound.changeRatio.keys;

				game.options.sound.volume = newVolume;
				me.audio.setVolume(newVolume);
			}
		}

		me.event.subscribe('wheel', (event) => {
			const currentVolume = me.audio.getVolume();

			me.input.releasePointerEvent('wheel', me.game.viewport);

			if (event.deltaY < 0) {
				if (currentVolume <= 1.0) {
					const newVolume = currentVolume + game.options.sound.changeRatio.wheel;

					game.options.sound.volume = newVolume;
					me.audio.setVolume(newVolume);
				}
			} else if (currentVolume >= game.options.sound.changeRatio.wheel) {
				const newVolume = currentVolume - game.options.sound.changeRatio.wheel;

				game.options.sound.volume = newVolume;
				me.audio.setVolume(newVolume);
			}

			me.input.registerPointerEvent('wheel', me.game.viewport, (event2) => {
				me.event.publish('wheel', [event2]);
			});
		});
	}
});
