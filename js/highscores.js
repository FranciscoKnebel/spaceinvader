game.socket = io(game.constants.highscoresURI);

game.socket.submitNewScore = (points, name) => {
	game.socket.emit('new score', points, name, game.constants.version);
};

game.socket.on('score saved', () => {
	console.log('Score is saved');
});
