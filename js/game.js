/* Game namespace */
var game = {
  data: {
    score: 0,
    level: 0
  },

  // Run on page load.
  onload: function() {
    // Initialize the video.
    if (!me.video.init(640, 480, { wrapper : "screen", scale : "auto"})) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // set and load all resources.
    // (this will also automatically switch to the loading screen)
    me.loader.preload(game.resources, this.loaded.bind(this));
  },

  // Run on game resources loaded.
  loaded() {
    me.pool.register("player", game.Player);
    me.pool.register("enemy", game.Enemy);
    me.pool.register("laser", game.Laser);

    this.playScreen = new game.PlayScreen();
    me.state.set(me.state.PLAY, this.playScreen);
    me.state.set(me.state.GAMEOVER, new game.LostScreen());
    me.state.set(me.state.GAME_END, new game.WonScreen());
    me.state.set(me.state.MENU, new game.HelpScreen());

    // Start the game.
    me.audio.playTrack('tronicles');
    me.state.change(me.state.MENU);
  }
};
