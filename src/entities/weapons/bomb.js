game.Entities = game.Entities || {};
game.Entities.Weapons = game.Entities.Weapons || {};

game.Entities.Weapons.Bomb = me.Entity.extend({
	init(x, y) {
		this._super(me.Entity, 'init', [x, y, { width: game.Entities.Weapons.Bomb.width / 2, height: game.Entities.Weapons.Bomb.height / 2 }]);
		this.alwaysUpdate = true;

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
		const { damage } = game.Entities.Weapons.Bomb;

		me.game.world.addChild(me.pool.pull('laser', x, y - 15, 'n', damage));
		me.game.world.addChild(me.pool.pull('laser', x + 10, y - 10, 'ne', damage));
		me.game.world.addChild(me.pool.pull('laser', x - 10, y - 10, 'nw', damage));

		me.game.world.addChild(me.pool.pull('laser', x, y, 'w', damage));
		me.game.world.addChild(me.pool.pull('laser', x, y, 'e', damage));

		me.game.world.addChild(me.pool.pull('laser', x, y + 15, 's', damage));
		me.game.world.addChild(me.pool.pull('laser', x + 10, y + 10, 'se', damage));
		me.game.world.addChild(me.pool.pull('laser', x - 10, y + 10, 'sw', damage));
	}
});

game.Entities.Weapons.Bomb.damage = game.data.weapons[2].damage;
game.Entities.Weapons.Bomb.width = 15;
game.Entities.Weapons.Bomb.height = 15;
