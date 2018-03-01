const optionsKey = 'options';

game.storage = {
	checkOptions(options) {
		const stored = store.get(optionsKey);

		if (stored) {
			return stored;
		}
		return this.saveOptions(options);
	},
	saveOptions(options) {
		return store.set(optionsKey, options);
	},
	clearOptions() {
		return store.remove(optionsKey);
	},
	clearAll() {
		return store.clearAll();
	}
};
