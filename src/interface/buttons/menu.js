game.menuButton = me.GUI_Object.extend({
	init(x, y, framewidth, frameheight, image) {
		this.settings = {
			image,
			imageHover: me.utils.getImage(`${image}_hover`),
			framewidth,
			frameheight
		};

		this._super(me.GUI_Object, 'init', [x, y, this.settings]);
	},
	onOver() {
		this.image = this.settings.imageHover;
	},
	onOut() {
		this.image = this.settings.image;
	}
});
