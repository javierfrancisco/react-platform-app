import React from 'react'
import PropTypes from 'prop-types'


function MenuNav ({ selected, onUpdateOption}) {
	const menuOptions = ['Home', 'Projects', 'Playlists', 'Galleries', 'News']
	return (
		<ul className='flex-center'>
			{menuOptions.map((menuOption) => (
				<li key={menuOption}>
					<button 
					className='btn-clear nav-link'
					style={menuOption === selected ? {color: 'rgb(187,46,31)' } : null}
					onClick={() => onUpdateOption(menuOption) }>
						{menuOption}
					</button>
				</li>
				))
			}
		</ul>
		)
}

MenuNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateOption: PropTypes.func.isRequired
}

export default class Popular extends React.Component {

	constructor (props) {
		super(props)

		this.state = {
			selectedOption: 'Home'
		}
		this.updateOption = this.updateOption.bind(this);
	}

	updateOption (selectedOption) {

		this.setState({
			selectedOption
		})
	}

	render() {

		const { selectedOption } = this.state

		return (
			<React.Fragment>
				<MenuNav
					selected={selectedOption}
					onUpdateOption={this.updateOption}
				/>
			</React.Fragment>
			)
	}

}