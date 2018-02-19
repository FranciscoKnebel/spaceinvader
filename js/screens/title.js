game.Title = {
	version: game.constants.version,
	version_date: game.constants.version_date,

	draw(renderer, titleFont, versionFont) {
		titleFont.draw(renderer, 'Space Invader', me.game.viewport.width / 2, 50);
		versionFont.draw(renderer, `version ${this.version} - ${this.version_date}`, me.game.viewport.width / 2, 130);
	}
};
