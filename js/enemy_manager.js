game.EnemyManager = me.Container.extend({
  init() {
    this._super(me.Container, "init", [0, 32,
      this.COLS * 64 - 32,
      this.ROWS * 64 - 32
    ]);
    this.COLS = 9;
    this.ROWS = 4;

    this.vel = 64;
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
      //game.playScreen.reset();
      me.state.change(me.state.GAME_END);
    }

    this._super(me.Container, "update", [time]);
    this.updateChildBounds();
  },

  onActivateEvent() {
    this.timer = me.timer.setInterval(() => {
      const bounds = this.childBounds;

      if ((this.vel > 0 && (bounds.right + this.vel) >= me.game.viewport.width) ||
        (this.vel < 0 && (bounds.left + this.vel) <= 0)) {

        this.vel *= -1;
        this.pos.y += 16;

        if (this.vel > 0) {
          this.vel += 5;
        } else {
          this.vel -= 5;
        }

        game.playScreen.checkIfLoss(bounds.bottom);
      } else {
        this.pos.x += this.vel;
      }
    }, 500);
  },

  onDeactivateEvent() {
    me.timer.clearInterval(this.timer);
  },

  removeChildNow(child) {
    this._super(me.Container, "removeChildNow", [child]);
    this.updateChildBounds();
  }
});
