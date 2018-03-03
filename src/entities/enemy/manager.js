game.Entities = game.Entities || {};
game.Entities.EnemyManager = me.Container.extend({
	init(config) {
		this.enemyConfig = config;

		if (me.device.isMobile) {
			this.baseAmountOfMoves = 20;
		} else {
			this.baseAmountOfMoves = 32;
		}

		this.COLS = Math.floor((me.game.viewport.width - 32) / 96);
		this.ROWS = 4;

		const pixelsTillOutOfBounds = me.game.viewport.width - (this.COLS * 96) + 32;
		this.baseSpeed = {
			x: pixelsTillOutOfBounds / this.baseAmountOfMoves,
			y: 15
		};

		this._super(me.Container, 'init', [0, 32, this.COLS * 96 - 32, this.ROWS * 76 - 32]);
		this.anchorPoint.set(0, 0);
		this.alwaysUpdate = true;

		if ((game.data.level + 1) % 10 === 0) {
			// multiple of 10
			this.baseSpeed.x *= 1.1;
			this.baseSpeed.y *= 0.5;
		} else if ((game.data.level + 1) % 5 === 0) {
			// multiple of 5
			this.baseSpeed.x *= 1.05;
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
		const previousWidth = this.childBounds.width;
		this._super(me.Container, 'removeChildNow', [child]);
		this.updateChildBounds();

		if (previousWidth > this.childBounds.width) {
			this.vel *= 1.05;
		}
	},

	createEnemies() {
		let i;
		let j;

		let amountOfEnemiesCreated = 0;

		// Build table for random weighted choice
		const table = [];
		let { probability } = this.enemyConfig;
		if (!probability) {
			// If not defined, set random probability for all enemies.
			probability = [];
			for (i = 0; i < this.enemyConfig.enemies.length; i += 1) {
				probability.push(~~(Math.random() * 4));
			}
		}

		for (i = 0; i < probability.length; i += 1) {
			table.push({ weight: probability[i], id: this.enemyConfig.enemies[i] });
		}

		for (i = 0; i < this.COLS; i += 1) {
			for (j = 0; j < this.ROWS; j += 1) {
				this.addChild(me.pool.pull('enemy', i * 96, j * 76, rwc(table)));
				amountOfEnemiesCreated += 1;
			}
		}

		this.updateChildBounds();
		this.createdEnemies = true;
		this.amountOfEnemiesCreated = amountOfEnemiesCreated;

		return amountOfEnemiesCreated;
	},
	outOfBounds() {
		const velocity = this.vel;
		const { left, right } = this.childBounds;

		return (
			(velocity > 0 && right + velocity >= me.game.viewport.width) ||
			(velocity < 0 && left + velocity <= 0)
		);
	},
	moveEnemies(init) {
		if (this.outOfBounds(this.vel)) {
			game.data.movementTime -= 0.25;
			this.vel *= -1;
			this.pos.y += this.baseSpeed.y + 0.25 * game.data.level;

			if (!game.playing.checkIfLoss(this.childBounds.bottom)) {
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
