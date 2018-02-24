game.GUI = game.GUI || {};
game.GUI.HUD = game.GUI.HUD || {};

game.GUI.HUD.debugContainer = me.Container.extend({
	init() {
		this._super(me.Container, 'init');

		this.isPersistent = false;
		this.floating = true;
		this.name = 'debugHUD';

		this.addChild(new game.GUI.HUD.debugHUD(5, 5));
	}
});

game.GUI.HUD.debugHUD = me.Renderable.extend({
	init(x, y) {
		this._super(me.Renderable, 'init', [x, y, 10, 10]);

		this.data = {
			font: new me.Font('Serif', 24, '#FFFF5C', 'left'),
			values: []
		};
	},

	update() {
		if (this.data.values.length > 0) {
			return true;
		}
		return false;
	},

	draw(context) {
		/*
			Example usage:
			game.playing.debugHUD.children[0].data.values.push(`X: ${me.device.accelerationX}`);
			game.playing.debugHUD.children[0].data.values.push(`Y: ${me.device.accelerationY}`);
			game.playing.debugHUD.children[0].data.values.push(`Z: ${me.device.accelerationZ}`);

			Will add values to this object data. When this object draw method is activated,
			it will draw the values on the screen.
		 */

		let height = 30;
		for (let i = 0; i < this.data.values.length; i += 1, height += 20) {
			this.data.font.draw(context, this.data.values[i], 5, height);
		}
		this.data.values.length = 0;
	}
});
