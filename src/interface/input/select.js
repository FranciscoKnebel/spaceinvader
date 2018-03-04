game.GUI = game.GUI || {};
game.GUI.SelectInput = me.Renderable.extend({
	init(y, params, textInValue) {
		this.$wrapper = $('<div class="dropdown wrapper">')
			.css({
				top: y,
				left: 0,
				right: 0
			});

		const { title, id, options } = params;

		this.$select = $('<div class="select"></div>');
		this.$selectBox = $(`
			<select name="${id}" id="${id}">
				<option disabled selected>${title}</option>
			</select>
		`);

		for (let i = 0; i < options.length; i += 1) {
			const item = options[i];
			this.$selectBox.append($(`<option value="${textInValue ? item.text : item.value}" ${me.device.isMobile && item.active ? 'selected' : ''} ${item.active ? 'class="active"' : ''}>${item.text}</option>`));
		}

		this.$select.append(this.$selectBox);
		this.$wrapper.append(this.$select);
		$(me.video.getWrapper()).append(this.$wrapper);
	},

	destroy() {
		this.$wrapper.remove();
		this.$selectBox.remove();
	}
});
