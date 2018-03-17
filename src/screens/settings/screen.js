/* eslint no-alert: 0 */

game.Screens = game.Screens || {};
game.Screens.Settings = me.ScreenObject.extend({
	onResetEvent() {
		me.audio.play('hit');

		me.game.world.addChild(new me.ColorLayer('background', '#000000'), 0);

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

					this.titleFont = new me.Font('Serif', 32, '#FFFFFF', 'center');
					this.version = new me.Font('Serif', 20, '#FFFFFF', 'center');
				},
				draw(renderer) {
					game.Title.draw(renderer, this.titleFont, this.version, 50, 82);
				},
				update() {
					return true;
				},
				onDestroyEvent() {}
			}))(),
			2
		);

		this.createSelectBoxes();

		this.createMenuButtons();

		me.input.bindKey(me.input.KEY.NUM1, 'exit_save', true);
		me.input.bindKey(me.input.KEY.NUM2, 'exit_clear', true);

		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			if (action === 'exit_save') {
				// save options to game_options
				// save game_options on storage
				const options = this.updateOptions();
				game.storage.saveOptions(options);

				iziToast.info({
					id: 'settings',
					title: 'Changes saved!',
					message: 'Reloading to apply changes.',
					position: 'topCenter',
					toastOnce: 'settings',
					close: false,
					animateInside: false,
					timeout: 2000,
					onClosing: () => {
						document.location.reload();
					}
				});
			}

			if (action === 'exit_clear') {
				// only leaves the menu,
				// does not propagate changes to game_options
				me.state.change(me.state.MENU);
			}
		});
	},
	createSelectBoxes() {
		let savedOptions = game.storage.checkOptions();
		if (!savedOptions) {
			savedOptions = game.storage.saveOptions(game.game_options);
		}

		let height = 150;

		for (const params of game.settingsOptions) {
			const obj = this.setActiveOptions(params);

			let textInValue = false;
			if (params.id === 'resolution') {
				textInValue = true;
			}

			me.game.world.addChild(new game.GUI.SelectInput(height, obj, textInValue));
			height += 50;
		}
	},
	setActiveOptions(params) {
		let i = 0;
		switch (params.id) {
		case 'resolution':
			for (i = 0; i < params.options.length; i += 1) {
				params.options[i].active =
					game.options.resolution.width === params.options[i].value.width
					&&
					game.options.resolution.height === params.options[i].value.height;
			}
			break;
		case 'scale':
		case 'scaleMethod':
		case 'antiAlias':
		case 'doubleBuffering':
			for (i = 0; i < params.options.length; i += 1) {
				params.options[i].active = params.options[i].value === game.options.rendering[params.id];
			}
			break;
		case 'sound':
			for (i = 0; i < params.options.length; i += 1) {
				params.options[i].active = params.options[i].value === game.options.sound.quality;
			}
			break;
		default:
		}

		return params;
	},
	updateOptions() {
		const IDs = game.settingsOptions.map(item => item.id);
		let value;

		for (const id of IDs) {
			switch (id) {
			case 'resolution':
				value = $(`#${id}`).val();

				if (value) {
					for (const option of game.settingsOptions[0].options) { // Resolution options
						if (option.text === value) {
							game.options.resolution = option.value;
						}
					}
				}
				break;
			case 'scale':
			case 'scaleMethod':
			case 'antiAlias':
			case 'doubleBuffering':
				value = $(`#${id}`).val();

				if (value) {
					game.options.rendering[id] = value;
				}
				break;
			case 'sound':
				value = $(`#${id}`).val();

				if (value) {
					game.options.sound.quality = value;
				}
				break;
			default:
			}
		}

		return game.options;
	},
	createMenuButtons() {
		const buttonHeight = me.game.viewport.height - 35;

		me.game.world.addChild(new game.settingsSaveButton(me.game.viewport.width / 3, buttonHeight));
		me.game.world.addChild(new game.settingsExitButton(me.game.viewport.width / 1.5, buttonHeight));
	},
	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.NUM1);
		me.input.unbindKey(me.input.KEY.NUM2);
		me.event.unsubscribe(this.handler);
	}
});
