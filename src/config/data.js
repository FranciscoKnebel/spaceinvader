game.data = {
	score: 0,
	levelscore: 0,
	level: 0,
	startPlayTime: new Date(),
	weaponEquipped: 0,
	weapons: [{
		name: 'shotgun',
		damage: 100,
		ammunition: 3,
		reloadAmount: 3,
		extraArg: 3
	}, {
		name: 'trident',
		damage: 150,
		ammunition: 7,
		reloadAmount: 7,
		extraArg: true
	}, {
		name: 'bomb',
		damage: 50,
		ammunition: 2,
		reloadAmount: 2
	}, {
		name: 'trident-bomb',
		damage: 100,
		ammunition: 5,
		reloadAmount: 5
	}]
};
