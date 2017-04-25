game.LostScreen = me.ScreenObject.extend({
  onResetEvent() {
    me.game.world.addChild(new me.ColorLayer("background", "#FFF"), 0);

    // Play music
    me.audio.play("lost");

    me.game.world.addChild(new (me.Renderable.extend ({
      init() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

        this.titleFont = new me.Font('Serif', 72, '#000', "center");
        this.titleFont.textBaseline = "bottom";
        this.btnFont = new me.Font('Serif', 32, '#000', "center");
      },
      draw(renderer) {
        this.titleFont.draw(renderer, "YOU LOSE!", me.game.viewport.width / 2, 200);
        this.btnFont.draw(renderer, "PRESS ENTER TO RESTART", me.game.viewport.width / 2, 350);
      },
      update(dt) {
        return true;
      },
      onDestroyEvent() {},
    })), 2);

    me.input.bindKey(me.input.KEY.ENTER, "restart", true);
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "restart") {
        game.level = 0;
        me.state.change(me.state.PLAY);
      }
    });
  },

  onDestroyEvent() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.event.unsubscribe(this.handler);

    me.audio.stopTrack();
  },
});
