game.Entities = game.Entities || {};
game.Entities.Weapons = game.Entities.Weapons || {};

game.Entities.Weapons.Trident = me.Entity.extend({
	init(x, y, splitFire) {
		this._super(me.Entity, 'init', [x, y, { width: game.Entities.Weapons.Trident.width / 2, height: game.Entities.Weapons.Trident.height / 2 }]);
		this.alwaysUpdate = true;

		this.splitFire = splitFire;
		this.body.setVelocity(0, 35);
		this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;

		this.renderable = new (me.Renderable.extend({
			init() {
				this._super(me.Renderable, 'init', [0, 0, game.Entities.Weapons.Trident.width, game.Entities.Weapons.Trident.height]);
			},
			destroy() {},
			draw(renderer) {
				if (!splitFire) { // Do not draw if splitFire
					const color = renderer.getColor();

					renderer.setColor('#B80015');
					renderer.fillRect(0, 0, this.width, this.height);
					renderer.setColor('#D90');
					renderer.fillRect(2, 2, this.width - 5, this.height - 5);
					renderer.setColor(color);
				}
			}
		}))();
		me.audio.play('fire');
	},
	update(time) {
		this.body.vel.y -= this.body.accel.y * time / 1000;

		if (!this.inViewport) {
			me.game.world.removeChild(this);
		}

		// Splits on first update, without collision
		if (this.splitFire) {
			me.game.world.removeChild(this);
			this.split(this.pos.x, this.pos.y);
		}

		this.body.update();
		me.collision.check(this);

		return true;
	},
	onCollision(res, other) {
		if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
			me.game.world.removeChild(this);
			this.split(res.a.pos.x, res.a.pos.y);

			return true;
		}

		if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
			return false;
		}
	},
	split(x, y) {
		const { damageRegular, damageSplitfire } = game.Entities.Weapons.Trident;
		const damage = this.splitFire ? damageSplitfire : damageRegular;

		me.game.world.addChild(me.pool.pull('laser', x, y - 15, 'n', damage));
		me.game.world.addChild(me.pool.pull('laser', x + 10, y - 10, 'ne', damage));
		me.game.world.addChild(me.pool.pull('laser', x - 10, y - 10, 'nw', damage));
	}
});

game.Entities.Weapons.Trident.damage = game.data.weapons[1].damage;
game.Entities.Weapons.Trident.damageSplitfire = game.data.weapons[3].damage;
game.Entities.Weapons.Trident.width = 10;
game.Entities.Weapons.Trident.height = 20;
