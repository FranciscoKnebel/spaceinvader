game.Entities = game.Entities || {};
game.Entities.Weapons = game.Entities.Weapons || {};
game.Entities.Weapons.Enemy = game.Entities.Weapons.Enemy || {};

game.Entities.Weapons.Enemy.Single = me.Entity.extend({
	init(x, y) {
		this._super(me.Entity, 'init', [x, y, { width: 0, height: 0 }]);

		const { damage } = game.data.enemyWeapons[0];

		me.game.world.addChild(me.pool.pull('laser', x, y, 's', damage, true));
		me.audio.play('fire');
	},
	update() {
		me.game.world.removeChild(this);
	}
});
