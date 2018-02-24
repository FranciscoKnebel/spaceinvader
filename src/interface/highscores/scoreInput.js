game.GUI = game.GUI || {};
game.GUI.ScoreInput = me.Renderable.extend({
	init(y, type, maxlength, onClickCallback) {
		this.$wrapper = $('<div class="wrapper ui action input">')
			.css({
				top: y
			});

		this.$input = $(`<input type="${type}" placeholder="Your name here" required>`);
		this.$button = $('<button class="ui button">')
			.text('Submit score')
			.on('click', () => {
				const value = this.$input.val();

				if (value.length > 0) {
					this.$input.val('Score sent!');
					this.$input.attr('disabled', true);

					game.socket.on('score saved', () => {
						this.$input.val('Score saved.');
					});

					this.$button.remove();
					onClickCallback(value);
				}
			});

		this.$wrapper.append(this.$input).append(this.$button);

		switch (type) {
		case 'text':
			this.$input
				.attr('maxlength', maxlength)
				.attr('pattern', '[a-zA-Z0-9_]+');
			break;
		case 'number':
			this.$input.attr('max', maxlength);
			break;
		default:
			break;
		}

		$(me.video.getWrapper()).append(this.$wrapper);
	},

	destroy() {
		this.$wrapper.remove();
		this.$input.remove();
		this.$button.remove();
	}
});
