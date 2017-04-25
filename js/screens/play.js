game.PlayScreen = me.ScreenObject.extend({
  onResetEvent() {
    me.game.world.addChild(new me.ColorLayer("background", "#000"), 0);

    this.player = me.pool.pull("player");
    me.game.world.addChild(this.player, 1);

    this.enemyManager = new game.EnemyManager();
    this.enemyManager.createEnemies();
    me.game.world.addChild(this.enemyManager, 2);

    // Commands
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.A, "left");
    me.input.bindKey(me.input.KEY.D, "right");
    me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
  },

  onDestroyEvent() {
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.D);
    me.input.unbindKey(me.input.KEY.SPACE);
  },

  checkIfLoss(y) {
    if (y >= (this.player.pos.y - this.player.height)) {
      me.state.change(me.state.GAMEOVER);
    }
  },
});
