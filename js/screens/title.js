game.Title = {
	version: game.constants.version,
	version_date: game.constants.version_date,

	draw(renderer, titleFont, versionFont, titleHeight = 50, versionHeight = 130) {
		titleFont.draw(renderer, 'Space Invader', me.game.viewport.width / 2, titleHeight);
		versionFont.draw(renderer, `version ${this.version} - ${this.version_date}`, me.game.viewport.width / 2, versionHeight);
	}
};
