game.Screens = game.Screens || {};
game.Screens.Play = me.ScreenObject.extend({
	onResetEvent(level, fromStartMenu) {
		const { theme, stage, enemyConfig } = game.buildLevel(level, 'play');

		me.audio.pauseTrack();
		if (fromStartMenu) {
			// If starting game, play the track for the first theme.
			me.audio.playTrack(game.themes[0].track);
		} else if (enemyConfig.boss) {
			// If on a boss fight, swap the track for the boss theme.
			me.audio.stopTrack();
			me.audio.playTrack(stage.track);
		} else if (me.audio.getCurrentTrack() !== theme.track) {
			// If the track currently playing is not the track for this theme,
			// stop it and play the current theme track (switch of themes).
			me.audio.stopTrack();
			me.audio.playTrack(theme.track);
		} else {
			// Theme is correct, so keep playing the current track.
			me.audio.resumeTrack();
		}

		this.player = me.pool.pull('player');
		me.game.world.addChild(this.player, 1);

		this.enemyManager = new game.Entities.EnemyManager(enemyConfig);
		me.game.world.addChild(this.enemyManager, 2);

		this.HUD = new game.GUI.HUD.Container();
		me.game.world.addChild(this.HUD);

		// DEBUG HUD, uncomment only for DEBUGGING purposes.
		// this.debugHUD = new game.GUI.HUD.debugContainer();
		// me.game.world.addChild(this.debugHUD);

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
				me.state.change(me.state.HELP);
			}
		});

		me.input.bindKey(me.input.KEY.Q, 'weapon-minus', true);
		me.input.bindKey(me.input.KEY.E, 'weapon-plus', true);
		me.input.bindKey(me.input.KEY.R, 'reload', true);
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

		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.R);
	},

	checkIfLoss(y) {
		if (y >= this.player.pos.y) {
			me.audio.pauseTrack();
			game.data.endPlayTime = new Date() - game.data.startPlayTime;

			me.state.change(me.state.GAMEOVER);
			return true;
		}
		return false;
	}
});
