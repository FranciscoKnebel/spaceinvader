game.Entities = game.Entities || {};
game.Entities.Weapons = game.Entities.Weapons || {};

game.Entities.Weapons.Shotgun = me.Entity.extend({
	init(x, y, amount = 3) {
		this._super(me.Entity, 'init', [x, y, { width: 0, height: 0 }]);

		this.split(this.pos.x, this.pos.y, amount);
		me.audio.play('fire');
	},
	update() {
		me.game.world.removeChild(this);
		return true;
	},
	split(x, y, amount) {
		const { damage } = game.data.weapons[0];

		me.game.world.addChild(me.pool.pull('laser', x, y - 5, 'n', damage));

		let addToRight = true;
		for (let i = 1, amountFired = 1; amountFired < amount; amountFired += 1) {
			if (addToRight) {
				me.game.world.addChild(me.pool.pull('laser', x + i * 5, y - 5 - i * 3, 'n', damage));
			} else {
				me.game.world.addChild(me.pool.pull('laser', x - i * 5, y - 5 - i * 3, 'n', damage));
				i += 1;
			}

			addToRight = !addToRight;
		}
	}
});
