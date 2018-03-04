game.Entities = game.Entities || {};
game.Entities.Weapons = game.Entities.Weapons || {};
game.Entities.Weapons.Enemy = game.Entities.Weapons.Enemy || {};

game.Entities.Weapons.Enemy.Dual = me.Entity.extend({
	init(x, y) {
		this._super(me.Entity, 'init', [x, y, { width: 0, height: 0 }]);

		const { damage } = game.data.enemyWeapons[1];

		me.game.world.addChild(me.pool.pull('laser', x - 15, y, 's', damage, true));
		me.game.world.addChild(me.pool.pull('laser', x + 15, y, 's', damage, true));
		me.audio.play('fire');
	},
	update() {
		me.game.world.removeChild(this);
	}
});
