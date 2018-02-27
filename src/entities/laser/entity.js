game.Entities = game.Entities || {};
game.Entities.Laser = me.Entity.extend({
	init(x, y, direction = 'n', damage = 50) {
		this._super(me.Entity, 'init', [x, y, { width: game.Entities.Laser.width, height: game.Entities.Laser.height }]);
		this.z = 5;
		this.damage = damage;
		this.alwaysUpdate = true;

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

		this.direction = direction;
		this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;

		// Rotate rectangle and set entity velocity
		switch (this.direction) {
		case 'n':
		case 's':
			this.body.setVelocity(0, 100);
			break;
		case 'w':
		case 'e':
			this.body.setVelocity(100, 0);
			this.renderable.currentTransform.rotate(1.55);
			break;
		case 'ne':
		case 'sw':
			this.body.setVelocity(50, 50);
			this.renderable.currentTransform.rotate(0.75);
			break;
		case 'nw':
		case 'se':
			this.body.setVelocity(50, 50);
			this.renderable.currentTransform.rotate(-0.75);
			break;
		default:
		}
	},

	update(time) {
		const deltaX = this.body.accel.x * time / 1000;
		const deltaY = this.body.accel.y * time / 1000;

		switch (this.direction) {
		case 'n':
			this.body.vel.y -= deltaY;
			break;
		case 's':
			this.body.vel.y += deltaY;
			break;
		case 'w':
			this.body.vel.x -= deltaX;
			break;
		case 'e':
			this.body.vel.x += deltaX;
			break;
		case 'ne':
			this.body.vel.x += deltaX;
			this.body.vel.y -= deltaY;
			break;
		case 'nw':
			this.body.vel.x -= deltaX;
			this.body.vel.y -= deltaY;
			break;
		case 'se':
			this.body.vel.x += deltaX;
			this.body.vel.y += deltaY;
			break;
		case 'sw':
			this.body.vel.x -= deltaX;
			this.body.vel.y += deltaY;
			break;
		default:
		}

		if (this.pos.y + this.height <= 0) {
			me.game.world.removeChild(this);
		}

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

			other.stats.health -= this.damage;

			if (other.stats.health <= 0 && other.alive) {
				game.playing.enemyManager.removeChild(other);

				if (other.alive) {
					// Another check to guarantee it was alive.
					other.alive = false;

					game.data.levelscore += 10;
					game.data.score += 10;
				}
				me.audio.play('hit');
			}

			return true;
		}

		if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
			// do nothing
			return false;
		}
	}
});

game.Entities.Laser.width = 3;
game.Entities.Laser.height = 20;
