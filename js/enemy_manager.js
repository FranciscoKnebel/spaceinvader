game.EnemyManager = me.Container.extend({
  init : function () {
      this._super(me.Container, "init", [0, 32,
        this.COLS * 64 - 32,
        this.ROWS * 64 - 32
      ]);
      this.COLS = 9;
      this.ROWS = 4;

      this.vel = 16;
  },

  createEnemies : function () {
    for (var i = 0; i < this.COLS; i++) {
      for (var j = 0; j < this.ROWS; j++) {
        this.addChild(me.pool.pull("enemy", i * 64, j * 64));
      }
    }

    this.updateChildBounds();
    this.createdEnemies = true;
  },

  update : function (time) {
    if (this.children.length === 0 && this.createdEnemies) {
        game.playScreen.reset();
    }

    this._super(me.Container, "update", [time]);
    this.updateChildBounds();
  },

  onActivateEvent : function () {
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

  onDeactivateEvent : function () {
    me.timer.clearInterval(this.timer);
  },

  removeChildNow : function (child) {
    this._super(me.Container, "removeChildNow", [child]);
    this.updateChildBounds();
  }
});
