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

		this.fireInterval = setInterval(() => {
			me.audio.play('fire');
			me.game.world.addChild(me.pool.pull('laser', this._absPos.x + this.width / 3, this._absPos.y + this.height, 's', this.type.fire.damage, true));
			me.game.world.addChild(me.pool.pull('laser', this._absPos.x + this.width / 1.5, this._absPos.y + this.height, 's', this.type.fire.damage, true));
		}, this.type.fire.rate);
	},

	onDestroyEvent() {
		clearInterval(this.fireInterval);
	}
});
