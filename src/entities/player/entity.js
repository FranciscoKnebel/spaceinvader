game.Entities = game.Entities || {};
game.Entities.Player = me.Sprite.extend({
	init() {
		const image = me.loader.getImage('player');

		this._super(me.Sprite, 'init', [
			me.game.viewport.width / 2 - image.width / 2,
			me.game.viewport.height - image.height - 20,
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
		if (me.input.isKeyPressed('shoot')) {
			me.game.world.addChild(me.pool.pull('laser', this.pos.x - (game.Entities.Laser.width / 2), this.pos.y - this.height, 'n'));

			me.audio.play('fire');
		}
	},
	volumeControls() {
		if (me.input.isKeyPressed('volume-plus')) {
			const currentVolume = me.audio.getVolume();

			if (currentVolume <= 1.0) {
				me.audio.setVolume(currentVolume + game.options.sound.changeRatio.keys);
			}
		}

		if (me.input.isKeyPressed('volume-mute')) {
			if (game.options.muted === true) {
				me.audio.unmuteAll();
			} else {
				me.audio.muteAll();
			}

			game.options.muted = !game.options.muted;
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
