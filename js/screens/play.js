game.PlayScreen = me.ScreenObject.extend({
	onResetEvent() {
		const { level } = game.data;
		let background = '#000';

		if (game.colors.backgrounds.level.length > level) {
			background = game.colors.backgrounds.level[level];
		} else {
			background = game.colors.backgrounds.level[game.colors.backgrounds.level.length - 1];
		}
		me.game.world.addChild(new me.ColorLayer('background', background), 0);

		this.player = me.pool.pull('player');
		me.game.world.addChild(this.player, 1);

		this.enemyManager = new game.EnemyManager();
		this.enemyManager.createEnemies();
		me.game.world.addChild(this.enemyManager, 2);

		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

		// Commands
		me.input.bindKey(me.input.KEY.LEFT, 'left');
		me.input.bindKey(me.input.KEY.RIGHT, 'right');
		me.input.bindKey(me.input.KEY.A, 'left');
		me.input.bindKey(me.input.KEY.D, 'right');
		me.input.bindKey(me.input.KEY.SPACE, 'shoot', true);
		me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.SPACE);

		me.input.bindKey(me.input.KEY.J, 'volume-plus');
		me.input.bindKey(me.input.KEY.K, 'volume-mute', true);
		me.input.bindKey(me.input.KEY.L, 'volume-minus');
		me.input.bindKey(me.input.KEY.NUM1, 'volume-plus');
		me.input.bindKey(me.input.KEY.NUM2, 'volume-mute', true);
		me.input.bindKey(me.input.KEY.NUM3, 'volume-minus');
		me.input.registerPointerEvent('wheel', me.game.viewport, (event) => {
			me.event.publish('wheel', [event]);
		});

		me.input.bindKey(me.input.KEY.H, 'help', true);
		this.handler = me.event.subscribe(me.event.KEYDOWN, (action) => {
			if (action === 'help') {
				game.data.score -= game.data.levelscore;
				game.data.levelscore = 0;
				me.state.change(me.state.MENU);
			}
		});
	},

	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.LEFT);
		me.input.unbindKey(me.input.KEY.RIGHT);
		me.input.unbindKey(me.input.KEY.A);
		me.input.unbindKey(me.input.KEY.D);
		me.input.unbindKey(me.input.KEY.SPACE);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.input.unbindKey(me.input.KEY.H);

		me.input.unbindKey(me.input.KEY.J);
		me.input.unbindKey(me.input.KEY.K);
		me.input.unbindKey(me.input.KEY.L);
		me.input.unbindKey(me.input.KEY.NUM1);
		me.input.unbindKey(me.input.KEY.NUM2);
		me.input.unbindKey(me.input.KEY.NUM3);
		me.input.releasePointerEvent('wheel', me.game.viewport);
	},

	checkIfLoss(y) {
		if (y >= this.player.pos.y - this.player.height) {
			me.audio.pauseTrack();
			game.data.startTime2 = new Date();
			game.data.endTime = game.data.startTime2 - game.data.startTime;

			me.state.change(me.state.GAMEOVER);
			return true;
		}

		return false;
	}
});
