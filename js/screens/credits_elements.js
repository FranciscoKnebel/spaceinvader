const FontSize = {
	header: 36,
	subheader: 18,
	p: 24
};
const minHeight = 160;

function creditElement(headerText, subheaderText, itemsText) {
	const header = {
		text: headerText,
		height: game.Credits.currentHeight
	};
	game.Credits.currentHeight += FontSize.header;

	const subheader = {};
	if (subheaderText) {
		subheader.text = subheaderText;
		subheader.height = game.Credits.currentHeight;

		game.Credits.currentHeight += FontSize.subheader;
	}

	const items = [];
	if (itemsText) {
		for (let i = 0; i < itemsText.length; i += 1) {
			items.push({
				text: itemsText[i],
				height: game.Credits.currentHeight
			});
			game.Credits.currentHeight += FontSize.p;
		}
	}

	game.Credits.currentHeight += FontSize.header;

	return {
		header,
		subheader,
		items
	};
}

game.Credits = {
	FontSize,
	minHeight,
	transitionSpeed: 0.5,
	elements: [
		{
			header: 'Author',
			items: [
				'Francisco Knebel'
			]
		},
		{
			header: 'Music'
		},
		{
			header: 'Sirius Beat',
			subheader: '(http://youtu.be/zIRo7NJ4uLE)',
			items: [
				'Tronicles'
			]
		},
		{
			header: 'OBLIDIVM',
			subheader: '(http://oblidivmmusic.blogspot.com.es)',
			items: [
				'Rain of Lasers',
				'Defeated',
				'Victory Tune',
				'DeathMatch'
			]
		},
		{
			header: 'cyguration',
			subheader: '(https://modarchive.org/forums/index.php?topic=1620.0)',
			items: [
				'Tranquil Trance Express',
				'Cold Stone'
			]
		}
	],
	buildElements: () => {
		const response = [];
		for (let i = 0; i < game.Credits.elements.length; i += 1) {
			response.push(creditElement(
				game.Credits.elements[i].header,
				game.Credits.elements[i].subheader,
				game.Credits.elements[i].items
			));
		}

		return response;
	}
};
