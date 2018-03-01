/* eslint no-alert: 0 */
game.Screens = game.Screens || {};
game.Screens.Start = me.ScreenObject.extend({
	onResetEvent() {
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
					game.Title.draw(renderer, this.title, this.version);
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

		me.input.bindKey(me.input.KEY.NUM1, 'numericEnter', true);
		me.input.bindKey(me.input.KEY.NUM2, 'numericEnter', true);
		me.input.bindKey(me.input.KEY.NUM3, 'numericEnter', true);
		me.input.bindKey(me.input.KEY.NUM4, 'numericEnter', true);
		me.input.bindKey(me.input.KEY.NUM5, 'numericEnter', true);

		me.input.bindKey(me.input.KEY.NUMPAD1, 'numericEnter', true);
		me.input.bindKey(me.input.KEY.NUMPAD2, 'numericEnter', true);
		me.input.bindKey(me.input.KEY.NUMPAD3, 'numericEnter', true);
		me.input.bindKey(me.input.KEY.NUMPAD4, 'numericEnter', true);
		me.input.bindKey(me.input.KEY.NUMPAD5, 'numericEnter', true);

		// Menu choice handling
		this.handleMenuOptions();
	},

	createMenuButtons() {
		const halfViewportWidth = me.game.viewport.width / 2;

		const buttonHeight = [220, 280, 370, 430, 490];

		me.game.world.addChild(new game.menuButton1(halfViewportWidth, buttonHeight[0], 300, 50, 'ui/startMenu/1'));
		me.game.world.addChild(new game.menuButton2(halfViewportWidth, buttonHeight[1], 300, 50, 'ui/startMenu/2'));
		me.game.world.addChild(new game.menuButton3(halfViewportWidth, buttonHeight[2], 300, 50, 'ui/startMenu/3'));
		me.game.world.addChild(new game.menuButton4(halfViewportWidth, buttonHeight[3], 300, 50, 'ui/startMenu/4'));
		me.game.world.addChild(new game.menuButton5(halfViewportWidth, buttonHeight[4], 300, 50, 'ui/startMenu/5'));
	},

	handleMenuOptions() {
		const menuChoice = {
			bounds: {
				up: 1,
				down: 5
			},
			current: 1
		};

		this.handler = me.event.subscribe(me.event.KEYDOWN, (action, keyCode) => {
			if (action === 'up' && menuChoice.current > menuChoice.bounds.up) {
				menuChoice.current -= 1;
			} else if (action === 'down' && menuChoice.current < menuChoice.bounds.down) {
				menuChoice.current += 1;
			} else if (action === 'enter' || action === 'numericEnter') {
				if (action === 'numericEnter') {
					menuChoice.current = this.handleNumericInput(keyCode);
				}

				switch (menuChoice.current) {
				case 1:
					game.data.startPlayTime = new Date();

					game.data.level = 0;
					game.data.score = 0;

					me.state.change(me.state.PLAY, game.data.level, true);
					break;
				case 2:
					me.state.change(me.state.HELP, true);
					break;
				case 3:
					me.state.change(me.state.SETTINGS, true);
					break;
				case 4:
					me.state.change(me.state.CREDITS);
					break;
				case 5:
					me.state.change(me.state.SCORE);
					break;
				default:
				}
			}
		});
	},

	handleNumericInput(keyCode) {
		// Change current choice according to which numeric was pressed.
		switch (keyCode) {
		case me.input.KEY.NUM1:
		case me.input.KEY.NUMPAD1:
			return 1;
		case me.input.KEY.NUM2:
		case me.input.KEY.NUMPAD2:
			return 2;
		case me.input.KEY.NUM3:
		case me.input.KEY.NUMPAD3:
			return 3;
		case me.input.KEY.NUM4:
		case me.input.KEY.NUMPAD4:
			return 4;
		case me.input.KEY.NUM5:
		case me.input.KEY.NUMPAD5:
			return 5;
		default:
			return 0;
		}
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.DOWN);
		me.input.unbindKey(me.input.KEY.S);

		me.input.unbindKey(me.input.KEY.NUM1);
		me.input.unbindKey(me.input.KEY.NUM2);
		me.input.unbindKey(me.input.KEY.NUM3);
		me.input.unbindKey(me.input.KEY.NUM4);
		me.input.unbindKey(me.input.KEY.NUM5);

		me.input.unbindKey(me.input.KEY.NUMPAD1);
		me.input.unbindKey(me.input.KEY.NUMPAD2);
		me.input.unbindKey(me.input.KEY.NUMPAD3);
		me.input.unbindKey(me.input.KEY.NUMPAD4);
		me.input.unbindKey(me.input.KEY.NUMPAD5);

		me.event.unsubscribe(this.handler);
	}
});
