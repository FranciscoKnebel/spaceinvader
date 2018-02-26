// TODO: bomb should explode after __ seconds.
// TODO: Time should be customizable (defined on init)

game.Entities = game.Entities || {};
game.Entities.Weapons = game.Entities.Weapons || {};

game.Entities.Weapons.Bomb = me.Entity.extend({
	init(x, y) {
		this._super(me.Entity, 'init', [x, y, { width: game.Entities.Weapons.Bomb.width, height: game.Entities.Weapons.Bomb.height }]);

		this.renderable = new (me.Renderable.extend({
			init() {
				this._super(me.Renderable, 'init', [0, 0, game.Entities.Weapons.Bomb.width, game.Entities.Weapons.Bomb.height]);
			},
			destroy() {},
			draw(renderer) {
				const color = renderer.getColor();

				renderer.setColor('#B80015');
				renderer.fillRect(0, 0, this.width, this.height);
				renderer.setColor('#FF0');
				renderer.fillRect(5, 5, this.width - 10, this.height - 10);
				renderer.setColor(color);
			}
		}))();

		this.body.setVelocity(0, 10);
		this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
		me.audio.play('fire');
	},
	update(time) {
		this.body.vel.y -= this.body.accel.y * time / 1000;

		if (!this.inViewport) {
			me.game.world.removeChild(this);
		}

		this.body.update();
		me.collision.check(this);

		return true;
	},
	onCollision(res, other) {
		if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
			me.game.world.removeChild(this);
			this.explode(res.a.pos.x, res.a.pos.y);

			return true;
		}

		if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
			return false;
		}
	},
	explode(x, y) {
		me.game.world.addChild(me.pool.pull('laser', x, y - 15, 'n'));
		me.game.world.addChild(me.pool.pull('laser', x + 10, y - 10, 'ne'));
		me.game.world.addChild(me.pool.pull('laser', x - 10, y - 10, 'nw'));

		me.game.world.addChild(me.pool.pull('laser', x, y, 'w'));
		me.game.world.addChild(me.pool.pull('laser', x, y, 'e'));

		me.game.world.addChild(me.pool.pull('laser', x, y + 15, 's'));
		me.game.world.addChild(me.pool.pull('laser', x + 10, y + 10, 'se'));
		me.game.world.addChild(me.pool.pull('laser', x - 10, y + 10, 'sw'));
	}
});

game.Entities.Weapons.Bomb.width = 15;
game.Entities.Weapons.Bomb.height = 15;
