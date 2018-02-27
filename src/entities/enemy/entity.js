game.Entities = game.Entities || {};
game.Entities.Enemy = me.Entity.extend({
	init(x, y, type) {
		this._super(me.Entity, 'init', [
			x, y,
			{
				image: 'ships',
				width: 64,
				height: 64
			}
		]);
		this.anchorPoint.set(0.5, 0.5);

		this.body.setVelocity(0, 0);
		this.body.collisionType = me.collision.types.ENEMY_OBJECT;

		this.alive = true;
		this.buildShip(type);
	},

	update(time) {
		this._super(me.Entity, 'update', [time]);

		this.body.update();

		return true;
	},

	buildShip(index) {
		this.type = game.Entities.EnemyList[index];

		this.renderable.addAnimation('idle', [this.type.frame], 1);
		this.renderable.setCurrentAnimation('idle');

		this.stats = {
			health: this.type.health,
			armor: this.type.armor,
			points: this.type.points
		};
	}
});
