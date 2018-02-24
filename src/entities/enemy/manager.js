function outOfBounds(velocity, bounds) {
	return (
		(velocity > 0 && bounds.right + velocity >= me.game.viewport.width) ||
		(velocity < 0 && bounds.left + velocity <= 0)
	);
}

game.Entities = game.Entities || {};
game.Entities.EnemyManager = me.Container.extend({
	init() {
		this.COLS = Math.floor((me.game.viewport.width - 32) / 64);
		this.ROWS = (game.data.level + 1) % 10 === 0 ? 2 : 4;

		this._super(me.Container, 'init', [0, 32, this.COLS * 64 - 32, this.ROWS * 64 - 32]);
		this.anchorPoint.set(0, 0);

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

		this.createEnemies();
	},

	update(time) {
		if (this.children.length === 0 && this.createdEnemies) {
			game.data.endPlayTime = new Date() - game.data.startPlayTime;
			me.state.change(me.state.GAME_END);
		}

		this._super(me.Container, 'update', [time]);
		this.updateChildBounds();
	},

	onActivateEvent() {
		game.data.movementTime = 50 - (1.05 * game.data.level) ** 1.5;

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

		this.moveEnemies(true);
	},

	onDeactivateEvent() {
		this.timer.stop();
	},

	removeChildNow(child) {
		this._super(me.Container, 'removeChildNow', [child]);
		this.updateChildBounds();
	},

	createEnemies() {
		let i;
		let j;

		let amountOfEnemiesCreated = 0;

		for (i = 0; i < this.COLS; i += 1) {
			for (j = 0; j < this.ROWS; j += 1) {
				this.addChild(me.pool.pull('enemy', i * 64, j * 64));
				amountOfEnemiesCreated += 1;
			}
		}

		this.updateChildBounds();
		this.createdEnemies = true;
		this.amountOfEnemiesCreated = amountOfEnemiesCreated;

		return amountOfEnemiesCreated;
	},

	moveEnemies(init) {
		const { childBounds } = this;

		if (outOfBounds(this.vel, childBounds)) {
			game.data.movementTime -= 0.25;
			this.vel *= -1;
			this.pos.y += this.baseSpeed.y + 0.25 * game.data.level;

			if (!game.playing.checkIfLoss(childBounds.bottom)) {
				this.timer.change(() => {
					this.moveEnemies();
				}, game.data.movementTime);
			}
		} else {
			if (init) {
				this.timer.start(() => {
					this.moveEnemies();
				}, game.data.movementTime);
			}
			this.pos.x += this.vel;
		}
	}
});
