game.StartMenuScreen = me.ScreenObject.extend({
	onResetEvent() {
		const halfViewportWidth = me.game.viewport.width / 2;

		me.game.world.addChild(new me.ColorLayer('background', '#000'), 0);

		me.game.world.addChild(
			new (me.Renderable.extend({
				init() {
					this._super(me.Renderable, 'init', [
						0,
						0,
						me.game.viewport.width,
						me.game.viewport.height
					]);

					this.anchorPoint.set(0, 0);

					this.title = new me.Font('Serif', 72, '#FFFFFF', 'center');
					this.version = new me.Font('Serif', 24, '#FFFFFF', 'center');
				},
				draw(renderer) {
					this.title.draw(renderer, 'Space Invader', halfViewportWidth, 50);
					this.version.draw(renderer, 'version <<space_invader_release_version>>', halfViewportWidth, 125);
				},
				update() {
					return true;
				},
				onDestroyEvent() {}
			}))(),
			2
		);

		// Adding start menu buttons
		this.createMenuButtons();

		// Binding menu keys
		me.input.bindKey(me.input.KEY.ENTER, 'enter', true);
		me.input.bindKey(me.input.KEY.UP, 'up', true);
		me.input.bindKey(me.input.KEY.W, 'up', true);
		me.input.bindKey(me.input.KEY.DOWN, 'down', true);
		me.input.bindKey(me.input.KEY.S, 'down', true);

		// Menu choice handling
		this.handleMenuOptions();
	},

	createMenuButtons() {
		const halfViewportWidth = me.game.viewport.width / 2;

		me.game.world.addChild(new game.menuButton1(halfViewportWidth, 220, 300, 50, 'ui/startMenu/1'));
		me.game.world.addChild(new game.menuButton2(halfViewportWidth, 280, 300, 50, 'ui/startMenu/2'));
		me.game.world.addChild(new game.menuButton3(halfViewportWidth, 370, 300, 50, 'ui/startMenu/3'));
		me.game.world.addChild(new game.menuButton4(halfViewportWidth, 430, 300, 50, 'ui/startMenu/4'));
		me.game.world.addChild(new game.menuButton5(halfViewportWidth, 490, 300, 50, 'ui/startMenu/5'));
	},

	handleMenuOptions() {
		const menuChoice = {
			bounds: {
				up: 1,
				down: 5
			},
			current: 1
		};

		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			if (action === 'up' && menuChoice.current > menuChoice.bounds.up) {
				menuChoice.current -= 1;
			} else if (action === 'down' && menuChoice.current < menuChoice.bounds.down) {
				menuChoice.current += 1;
			} else if (action === 'enter') {
				switch (menuChoice.current) {
				case 1:
					me.state.change(me.state.PLAY, game.data.level);
					break;
				case 2:
					alert(`Option ${menuChoice.current} not implemented, yet.`);
					break;
				case 3:
					alert(`Option ${menuChoice.current} not implemented, yet.`);
					break;
				case 4:
					alert(`Option ${menuChoice.current} not implemented, yet.`);
					break;
				case 5:
					alert(`Option ${menuChoice.current} not implemented, yet.`);
					break;
				default:
				}
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.DOWN);
		me.input.unbindKey(me.input.KEY.S);
		me.event.unsubscribe(this.handler);
	}
});
