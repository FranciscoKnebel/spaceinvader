game.Entities = game.Entities || {};
game.Entities.Weapons = game.Entities.Weapons || {};

game.Entities.Weapons.Shotgun = me.Entity.extend({
	init(x, y, amount = 3) {
		this._super(me.Entity, 'init', [x, y, { width: game.Entities.Weapons.Shotgun.width, height: game.Entities.Weapons.Shotgun.height }]);
		this.body.setVelocity(0, 35);
		this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;

		this.amount = amount;
		this.renderable = new (me.Renderable.extend({
			init() {
				this._super(me.Renderable, 'init', [0, 0, game.Entities.Weapons.Shotgun.width, game.Entities.Weapons.Shotgun.height]);
			},
			destroy() {}
		}))();
		me.audio.play('fire');
	},
	update() {
		me.game.world.removeChild(this);
		this.split(this.pos.x, this.pos.y);
		return true;
	},
	split(x, y) {
		me.game.world.addChild(me.pool.pull('laser', x, y - 5, 'n'));

		let addToRight = true;
		for (let i = 1, amountFired = 1; amountFired < this.amount; amountFired += 1) {
			if (addToRight) {
				me.game.world.addChild(me.pool.pull('laser', x + i * 5, y - 5 - i * 3, 'n'));
			} else {
				me.game.world.addChild(me.pool.pull('laser', x - i * 5, y - 5 - i * 3, 'n'));
				i += 1;
			}

			addToRight = !addToRight;
		}
	}
});

game.Entities.Weapons.Shotgun.width = 3;
game.Entities.Weapons.Shotgun.height = 20;
