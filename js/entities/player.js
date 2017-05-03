game.Player = me.Sprite.extend({
	init() {
		const image = me.loader.getImage('player');

		this._super(me.Sprite, 'init', [
			me.game.viewport.width / 2 - image.width / 2,
			me.game.viewport.height - image.height - 20,
			{ image },
		]);

		this.velx = 450;
		this.maxX = me.game.viewport.width - this.width;
	},

	update(time) {
		this._super(me.Sprite, 'update', [time]);

		if (me.input.isKeyPressed('left')) {
			this.pos.x -= this.velx * time / 1000;
		}

		if (me.input.isKeyPressed('right')) {
			this.pos.x += this.velx * time / 1000;
		}

		if (me.input.isKeyPressed('shoot')) {
			me.game.world.addChild(
				me.pool.pull('laser', this.pos.x - game.Laser.width, this.pos.y - game.Laser.height),
			);
			me.audio.play('fire');
		}

		if (me.input.isKeyPressed('volume-plus')) {
			const currentVolume = me.audio.getVolume();

			if (currentVolume <= 1.0) {
				me.audio.setVolume(currentVolume + 0.025);
			}
		}

		if (me.input.isKeyPressed('volume-mute')) {
			if (game.data.muted === true) {
				me.audio.unmuteAll();
			} else {
				me.audio.muteAll();
			}

			game.data.muted = !game.data.muted;
		}

		if (me.input.isKeyPressed('volume-minus')) {
			const currentVolume = me.audio.getVolume();

			if (currentVolume >= 0.025) {
				me.audio.setVolume(currentVolume - 0.025);
			}
		}

		me.event.subscribe('wheel', (event) => {
			const currentVolume = me.audio.getVolume();
			me.input.releasePointerEvent('wheel', me.game.viewport);

			if (event.deltaY < 0) {
				if (currentVolume <= 1.0) {
					me.audio.setVolume(currentVolume + 0.0005);
				}
			} else if (currentVolume >= 0.0005) {
				me.audio.setVolume(currentVolume - 0.0005);
			}

			me.input.registerPointerEvent('wheel', me.game.viewport, (event2) => {
				me.event.publish('wheel', [event2]);
			});
		});

		this.pos.x = this.pos.x.clamp(0, this.maxX);

		return true;
	},
});
