game.themes = [
	{
		track: 'tronicles',
		enemies: [0, 1, 2, 3],
		levels: [
			{
				probability: [
					6, 2, 0, 0
				],
				play: '#246482',
				won: '#63C664',
				lost: '#FFF'
			},
			{
				probability: [
					4, 2, 1, 0
				],
				play: '#1D5068',
				won: '#63C664',
				lost: '#FFF'
			},
			{
				probability: [
					3, 3, 1, 0
				],
				play: '#174053',
				won: '#63C664',
				lost: '#FFF'
			},
			{
				probability: [
					2, 5, 1, 0
				],
				play: '#123342',
				won: '#63C664',
				lost: '#FFF'
			},
			{
				probability: [
					4, 0, 3, 1
				],
				play: '#0E2935',
				won: '#63C664',
				lost: '#FFF'
			},
			{
				probability: [
					4, 3, 2, 0
				],
				play: '#5A7D8A',
				won: '#C78213',
				lost: '#66D8E8'
			},
			{
				probability: [
					4, 4, 3, 2
				],
				play: '#48646E',
				won: '#C78213',
				lost: '#66D8E8'
			},
			{
				probability: [
					1, 5, 1, 3
				],
				play: '#3A5058',
				won: '#C78213',
				lost: '#66D8E8'
			},
			{
				probability: [
					1, 5, 3, 5
				],
				play: '#2E4046',
				won: '#C78213',
				lost: '#66D8E8'
			},
			{
				track: 'deathmatch',
				boss: [0],
				probability: [
					2, 1, 2, 1
				],
				play: '#81451B',
				won: '#C78213',
				lost: '#66D8E8'
			}
		]
	},
	{
		track: 'rain_of_lasers',
		enemies: [2, 3],
		levels: [
			{
				probability: [
					1, 3
				],
				play: '#0B4FE1',
				won: '#BE166C',
				lost: '#E1B65D'
			}
		]
	}
];

function findTheme(level) {
	let levelCounter = 0;
	let obj;

	for (let i = 0; i < game.themes.length; i += 1) {
		for (let j = 0; j < game.themes[i].levels.length; j += 1) {
			if (level === levelCounter) {
				obj = {
					theme: game.themes[i],
					stage: game.themes[i].levels[j]
				};
				return obj;
			}
			levelCounter += 1;
		}
	}


	// Generate array with all enemies indexes from EnemyList.
	const N = game.Entities.EnemyList.length;
	const enemies = Array.from(Array(N).keys());

	return {
		theme: {
			track: 'cold_stone',
			enemies
		},
		stage: {
			play: '#000',
			won: '#63C664',
			lost: '#FFF'
		}
	};
}

game.buildLevel = (level, state) => {
	const { theme, stage } = findTheme(level);

	const { boss, probability } = stage;
	const { enemies } = theme;

	const background = stage[state];

	me.game.world.addChild(new me.ColorLayer('background', background), 0);

	const enemyConfig = {
		probability,
		enemies,
		boss
	};

	return {
		theme,
		stage,
		enemyConfig,
		background
	};
};
