game.Enemy = me.Entity.extend({
  init(x, y) {
    this._super(me.Entity, "init", [x, y, {
        image : "ships",
        width : 32,
        height : 32
    }]);

    this.body.setVelocity(0, 0);
    this.body.collisionType = me.collision.types.ENEMY_OBJECT;

    this.chooseShipImage();
  },

  update(time) {
    this._super(me.Entity, "update", [time]);

    this.body.update();

    return true;
  },

  chooseShipImage() {
    const frame = ~~(Math.random() * 3);

    this.renderable.addAnimation("idle", [frame], 1);
    this.renderable.setCurrentAnimation("idle");
  },
});
