function outOfBounds(that, bounds) {
	return (
		(that.vel > 0 && bounds.right + that.vel >= me.game.viewport.width) ||
		(that.vel < 0 && bounds.left + that.vel <= 0)
	);
}

function movement(that, init) {
	const bounds = that.childBounds;

	if (outOfBounds(that, bounds)) {
		game.data.movementTime -= 0.25;
		that.vel *= -1;
		that.pos.y += that.baseSpeed.y + 0.25 * game.data.level;

		if (!game.playScreen.checkIfLoss(bounds.bottom)) {
			that.timer.change(() => {
				movement(that);
			}, game.data.movementTime);
		}
	} else {
		if (init) {
			that.timer.start(() => {
				movement(that);
			}, game.data.movementTime);
		}

		that.pos.x += that.vel;
	}
}

game.EnemyManager = me.Container.extend({
	init() {
		this.COLS = Math.floor((me.game.viewport.width - 32) / 64);
		this.ROWS = (game.data.level + 1) % 10 === 0 ? 2 : 4;

		this._super(me.Container, 'init', [0, 32, this.COLS * 64 - 32, this.ROWS * 64 - 32]);

		this.baseSpeed = {
			x: 4,
			y: 10
		};

		if ((game.data.level + 1) % 10 === 0) {
			// multiple of 10
			this.baseSpeed.x = 4.5;
		} else if ((game.data.level + 1) % 5 === 0) {
			// multiple of 5
			this.baseSpeed.x = 4.25;
		}

		this.vel = this.baseSpeed.x;
	},

	createEnemies() {
		let i;
		let j;

		for (i = 0; i < this.COLS; i += 1) {
			for (j = 0; j < this.ROWS; j += 1) {
				this.addChild(me.pool.pull('enemy', i * 64, j * 64));
			}
		}

		this.updateChildBounds();
		this.createdEnemies = true;
	},

	update(time) {
		if (this.children.length === 0 && this.createdEnemies) {
			game.data.startTime2 = new Date();
			game.data.endTime = game.data.startTime2 - game.data.startTime;
			me.state.change(me.state.GAME_END);
		}

		this._super(me.Container, 'update', [time]);
		this.updateChildBounds();
	},

	onActivateEvent() {
		game.data.movementTime = 50 - Math.pow(1.05 * game.data.level, 1.5);

		this.timer = {
			current: null,
			start(cb, time) {
				this.current = me.timer.setInterval(cb, time);

				return this.current;
			},
			stop() {
				me.timer.clearInterval(this.current);
				this.current = null;
			},
			change(cb, time) {
				me.timer.clearInterval(this.current);
				this.current = me.timer.setInterval(cb, time);
				return this.current;
			}
		};

		movement(this, true);
	},

	onDeactivateEvent() {
		this.timer.stop();
	},

	removeChildNow(child) {
		this._super(me.Container, 'removeChildNow', [child]);
		this.updateChildBounds();
	}
});
