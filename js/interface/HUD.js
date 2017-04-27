game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({

    init() {
        this._super(me.Container, 'init');

        this.isPersistent = false;
        this.floating = true;
        this.name = "HUD";

        this.addChild(new game.HUD.ScoreItem(5, 5));
    }
});

game.HUD.ScoreItem = me.Renderable.extend({
  init(x, y) {
    this._super(me.Renderable, 'init', [x, y, 10, 10]);

    this.data = {
      enemyQuantity: {
        value: -1,
        font: new me.Font('Serif', 24, '#FFFFFF', "left"),
      },
      enemyVelocity: {
        value: -1,
        font: new me.Font('Serif', 24, '#285428', "right"),
      },
      score: {
        value: 0,
        font: new me.Font('Arial', 32, '#FFFF5C', 'center'),
      },
      movementTime: {
        value: 0,
        font: new me.Font('Serif', 24, '#285428', "right"),
      },
    }
  },

  update() {
    let updated = false;

    if (this.data.enemyQuantity.value !== game.playScreen.enemyManager.children.length) {
      this.data.enemyQuantity.value = game.playScreen.enemyManager.children.length;
      updated = true;
    }

    /*
    if (this.data.enemyVelocity.value !== game.playScreen.enemyManager.vel) {
      this.data.enemyVelocity.value = game.playScreen.enemyManager.vel;
      updated = true;
    } */

    if(this.data.movementTime.value !== game.data.movementTime) {
      this.data.movementTime.value = game.data.movementTime;
      updated = true;
    }

    if(this.data.score.value !== game.data.score) {
      this.data.score.value = game.data.score;
      updated = true;
    }

    return updated;
  },

  draw(context) {
    this.data.enemyQuantity.font.draw(context, `${this.data.enemyQuantity.value} enemies`, 5, 5);
    //this.data.enemyVelocity.font.draw(context, Math.floor(Math.abs(this.data.enemyVelocity.value)), me.game.viewport.width - 5, 5);
    this.data.movementTime.font.draw(context, `${this.data.movementTime.value}ms`, me.game.viewport.width - 5, 5);

    this.data.score.font.draw(context, this.data.score.value, me.game.viewport.width / 2, 5);
  },
});
