function movement(that) {
  const bounds = that.childBounds;

  if ((that.vel > 0 && (bounds.right + that.vel) >= me.game.viewport.width) ||
    (that.vel < 0 && (bounds.left + that.vel) <= 0)) {

    game.data.movementTime -= 10;
    that.vel *= -1;
    that.pos.y += that.baseSpeed;// + (0.25 * game.data.level);

    /* if (that.vel > 0) {
      that.vel += that.baseIncrement + (1.1 * game.data.level);
    } else {
      that.vel -= that.baseIncrement + (1.1 * game.data.level);
    } */

    game.playScreen.checkIfLoss(bounds.bottom);
  } else {
    that.pos.x += that.vel;
  }

  that.timer = me.timer.setTimeout(() => { movement(that); }, game.data.movementTime);
}

game.EnemyManager = me.Container.extend({
  init() {
    this.COLS = Math.floor((me.game.viewport.width - 32) / 64);
    this.ROWS = ((game.data.level + 1) % 10 === 0 ? 2 : 4);

    this._super(me.Container, "init", [0, 32,
      this.COLS * 64 - 32,
      this.ROWS * 64 - 32
    ]);

    this.baseSpeed = 16;
    this.baseIncrement = 5;

    if((game.data.level + 1) % 10 === 0) {
      this.baseSpeed = 24;
    } else if((game.data.level + 1) % 5 === 0) {
      this.baseSpeed = 20;
    }

    this.vel = this.baseSpeed;
  },


  createEnemies() {
    for (var i = 0; i < this.COLS; i++) {
      for (var j = 0; j < this.ROWS; j++) {
        this.addChild(me.pool.pull("enemy", i * 64, j * 64));
      }
    }

    this.updateChildBounds();
    this.createdEnemies = true;
  },

  update(time) {
    if (this.children.length === 0 && this.createdEnemies) {
      game.data.endTime = marky.stop('startGame');
      me.state.change(me.state.GAME_END);
    }

    this._super(me.Container, "update", [time]);
    this.updateChildBounds();
  },

  onActivateEvent() {
    game.data.movementTime = 500 - (Math.pow(1.15 * game.data.level, 2));

    this.timer = me.timer.setTimeout(() => { movement(this); }, game.data.movementTime);
  },

  onDeactivateEvent() {
    me.timer.clearInterval(this.timer);
  },

  removeChildNow(child) {
    this._super(me.Container, "removeChildNow", [child]);
    this.updateChildBounds();
  }
});
