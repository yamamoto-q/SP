var React = require('react');
var ViewLoginForm = require('./View_LoginForm.js');
var Ctrl_Strage = require('./Ctrl_Strage.js');


module.exports = React.createClass({
	getInitialState: function getInitialState() {
		return {
			mode: this.props.mode
		}
	},
	componentDidMount: function componentDidMount() {
		console.log('Ctrl_Strage.Action.load("qUser");');
		Ctrl_Strage.Action.load("qUser");
	},
	render: function() {
		return(
			<ViewLoginForm mode={this.props.mode}/>
		)
	}
});