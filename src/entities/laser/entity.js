game.Entities = game.Entities || {};
game.Entities.Laser = me.Entity.extend({
	init(x, y) {
		this._super(me.Entity, 'init', [x, y, { width: game.Entities.Laser.width, height: game.Entities.Laser.height }]);
		this.z = 5;
		this.body.setVelocity(0, 250);
		this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;

		this.renderable = new (me.Renderable.extend({
			init() {
				this._super(me.Renderable, 'init', [0, 0, game.Entities.Laser.width, game.Entities.Laser.height]);
			},
			destroy() {},
			draw(renderer) {
				const color = renderer.getColor();

				renderer.setColor('#5EFF7E');
				renderer.fillRect(0, 0, this.width, this.height);
				renderer.setColor(color);
			}
		}))();
		this.alwaysUpdate = true;
	},

	update(time) {
		this.body.vel.y -= this.body.accel.y * time / 1000;
		if (this.pos.y + this.height <= 0) {
			me.game.world.removeChild(this);
		}

		this.body.update();
		me.collision.check(this);

		return true;
	},

	onCollision(res, other) {
		if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
			me.game.world.removeChild(this);
			game.playing.enemyManager.removeChild(other);

			me.audio.play('hit');

			game.data.levelscore += 10;
			game.data.score += 10;
			return true;
		}
	}
});

game.Entities.Laser.width = 3;
game.Entities.Laser.height = 20;
