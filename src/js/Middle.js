"use strict";

var React = require('react');

module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var OuterStyle = {};
		if (this.props.style) {
			OuterStyle = this.props.style;
		}
		OuterStyle.display = "table";
		OuterStyle.height = "100%";
		OuterStyle.width = "100%";

		var InnerStyle = {
			display: "table-cell",
			verticalAlign: "middle"
		};
		return React.createElement(
			"div",
			{ id: this.props.id, style: OuterStyle },
			React.createElement(
				"div",
				{ style: InnerStyle },
				this.props.children
			)
		);
	}
});
