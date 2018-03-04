game.data = game.data || {};
game.data.weapons = [{
	name: 'shotgun',
	damage: 100,
	ammunition: 3,
	reloadAmount: 3,
	reloadCost: 9,
	extraArg: 3
}, {
	name: 'trident',
	damage: 150,
	ammunition: 4,
	reloadAmount: 4,
	reloadCost: 15,
	extraArg: true
}, {
	name: 'bomb',
	damage: 50,
	ammunition: 2,
	reloadAmount: 2,
	reloadCost: 20
}, {
	name: 'trident-bomb',
	damage: 100,
	ammunition: 5,
	reloadAmount: 5,
	reloadCost: 15
}];

game.data.enemyWeapons = [{
	name: 'single',
	damage: 50
}, {
	name: 'dual',
	damage: 50
}];
