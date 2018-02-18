game.Title = {
	draw(renderer, titleFont, versionFont) {
		titleFont.draw(renderer, 'Space Invader', me.game.viewport.width / 2, 50);
		versionFont.draw(renderer, 'version <<space_invader_release_version>>', me.game.viewport.width / 2, 130);
	}
};
