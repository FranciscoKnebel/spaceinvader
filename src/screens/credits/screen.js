game.Screens = game.Screens || {};
game.Screens.Credits = me.ScreenObject.extend({
	onResetEvent() {
		me.audio.playTrack('cold_stone');

		const hVW = me.game.viewport.width / 2;
		me.game.world.addChild(new me.ColorLayer('background', '#000000'), 0);

		game.Credits.currentHeight = me.game.viewport.height;
		const elements = game.Credits.buildElements();

		me.game.world.addChild(new (me.Renderable.extend({
			init() {
				this._super(me.Renderable, 'init', [
					0,
					0,
					me.game.viewport.width,
					game.Credits.minHeight
				]);

				this.setOpacity(1.0);
				this.anchorPoint.set(0, 0);

				this.title = new me.Font('Serif', 72, '#FFFFFF', 'center');
				this.version = new me.Font('Serif', 24, '#FFFFFF', 'center');
			},
			draw(renderer) {
				renderer.setColor('#000');
				renderer.fillRect(0, 0, this.width, this.height);

				game.Title.draw(renderer, this.title, this.version);
			},
			update() {
				return true;
			},
			onDestroyEvent() {}
		}))(), 2);

		me.game.world.addChild(new (me.Renderable.extend({
			init() {
				this._super(me.Renderable, 'init', [
					0,
					150,
					me.game.viewport.width,
					me.game.viewport.height
				]);

				this.anchorPoint.set(0, 0);

				this.btnFont = new me.Font('Serif', 32, '#FFFFFF', 'center');

				this.header = new me.Font('Serif', game.Credits.FontSize.header, '#FFFFFF', 'center');
				this.subheader = new me.Font('Serif', game.Credits.FontSize.subheader, '#FFFFFF', 'center');
				this.p = new me.Font('Serif', game.Credits.FontSize.p, '#FFFFFF', 'center');
			},
			draw(renderer) {
				if (elements.length === 0) {
					// No elements left, wait for user input to exit.
					if (me.device.isMobile) {
						this.btnFont.draw(renderer, 'TOUCH TO CONTINUE', hVW, 400);
					} else {
						this.btnFont.draw(renderer, 'PRESS ENTER TO CONTINUE', hVW, 400);
					}
				}

				for (let i = 0; i < elements.length; i += 1) {
					elements[i].header.height -= game.Credits.transitionSpeed;
					this.header.draw(renderer, elements[i].header.text, hVW, elements[i].header.height);

					if (elements[i].subheader.text) {
						elements[i].subheader.height -= game.Credits.transitionSpeed;
						this.subheader.draw(
							renderer,
							elements[i].subheader.text,
							hVW,
							elements[i].subheader.height
						);
					}

					if (elements[i].items) {
						for (let j = 0; j < elements[i].items.length; j += 1) {
							elements[i].items[j].height -= game.Credits.transitionSpeed;
							this.p.draw(renderer, elements[i].items[j].text, hVW, elements[i].items[j].height);
						}
					}

					// Element is past the screen, so remove from array.
					let elementCurrentHeight;
					let shouldDeleteFromArray = false;
					if (elements[i].items.length > 0) {
						elementCurrentHeight = elements[i].items[elements[i].items.length - 1].height;
						if (elementCurrentHeight < game.Credits.minHeight - game.Credits.FontSize.p) {
							shouldDeleteFromArray = true;
						}
					} else if (elements[i].subheader.text) {
						elementCurrentHeight = elements[i].subheader.height;
						if (elementCurrentHeight < game.Credits.minHeight - game.Credits.FontSize.subheader) {
							shouldDeleteFromArray = true;
						}
					} else {
						elementCurrentHeight = elements[i].header.height;
						if (elementCurrentHeight < game.Credits.minHeight - game.Credits.FontSize.header) {
							shouldDeleteFromArray = true;
						}
					}

					if (shouldDeleteFromArray) {
						elements.splice(i, 1);
					}
				}
			},
			update() {
				return true;
			},
			onDestroyEvent() {}
		}))(), 1);

		me.input.bindKey(me.input.KEY.ENTER, 'resume', true);
		me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			if (action === 'resume') {
				me.state.change(me.state.MENU);
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.event.unsubscribe(this.handler);

		me.audio.stopTrack();
	}
});
