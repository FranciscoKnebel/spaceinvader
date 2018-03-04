game.Entities = game.Entities || {};
game.Entities.Boss = me.Entity.extend({
	init(x, y, { type, grid }) {
		this._super(me.Entity, 'init', [
			x, y,
			{
				image: 'bosses',
				width: 128,
				height: 128
			}
		]);
		this.anchorPoint.set(0.5, 0.5);

		this.body.setVelocity(0, 0);
		this.body.collisionType = me.collision.types.ENEMY_OBJECT;

		this.grid = grid;
		this.alive = true;
		this.buildShip(type);
	},

	update(time) {
		this._super(me.Entity, 'update', [time]);

		this.body.update();

		return true;
	},

	buildShip(index) {
		this.type = game.Entities.EnemyList[index].boss;
		this.renderable.addAnimation('idle', [this.type.frame], 1);
		this.renderable.setCurrentAnimation('idle');

		this.stats = {
			health: this.type.health,
			armor: this.type.armor,
			points: this.type.points
		};

		this.weapons = this.type.fire.weapons.map(i => game.data.enemyWeapons[i]);
		this.fireInterval = setInterval(() => {
			const { name } = this.weapons[Math.floor(Math.random() * this.weapons.length)];

			me.game.world.addChild(me.pool.pull(
				name,
				this._absPos.x + this.width / 2,
				this._absPos.y + this.height
			));
		}, this.type.fire.rate);
	},

	onDestroyEvent() {
		clearInterval(this.fireInterval);
	}
});
