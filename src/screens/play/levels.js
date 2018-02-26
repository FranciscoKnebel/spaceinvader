const themes = [
	{
		levels: [
			{
				play: '#FFF',
				won: '#63C664',
				lost: '#FFF'
			}
		]
	}
];

function findTheme(level) {
	let levelCounter = 0;
	let obj;

	for (let i = 0; i < themes.length; i += 1) {
		if (level > themes[i].levels.length) {
			// Skip theme if level is not inside it.
			levelCounter += themes[i].levels.length;
		} else {
			for (let j = 0; j < themes[i].levels.length; j += 1) {
				if (level === levelCounter) {
					obj = {
						theme: themes[i],
						stage: themes[i].levels[j]
					};
					return obj;
				}
				levelCounter += 1;
			}
		}
	}

	return {
		theme: undefined,
		stage: {
			play: '#000',
			won: '#63C664',
			lost: '#FFF'
		}
	};
}

game.buildLevel = (level, state) => {
	const { theme, stage } = findTheme(level);
	const background = stage[state];

	me.game.world.addChild(new me.ColorLayer('background', background), 0);

	return {
		theme,
		stage,
		background
	};
};
