game.EnemyManager = me.Container.extend({
  init() {
    this.COLS = Math.floor((me.game.viewport.width - 32) / 64);
    this.ROWS = 4;

    this._super(me.Container, "init", [0, 32,
      this.COLS * 64 - 32,
      this.ROWS * 64 - 32
    ]);

    this.baseSpeed = 16;
    this.baseIncrement = 5;

    if((game.data.level + 1) % 10) {
      this.baseSpeed = 24;
    } else if((game.data.level + 1) % 5) {
      this.baseSpeed = 20;
    }

    this.vel = this.baseSpeed + (1.25 * game.data.level);
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
        this.pos.y += this.baseSpeed + (0.25 * game.data.level);

        if (this.vel > 0) {
          this.vel += this.baseIncrement + (1.1 * game.data.level);
        } else {
          this.vel -= this.baseIncrement + (1.1 * game.data.level);
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
