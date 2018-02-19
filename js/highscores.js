game.socket = io(game.constants.highscoresURI);

game.socket.submitNewScore = (points, level, name) => {
	game.socket.emit('new score', points, level, name, me.device.isMobile, game.constants.version);
};

game.socket.on('score saved', () => {
	console.log('Score is saved');
});
