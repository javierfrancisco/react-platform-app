import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'


function MenuNav ({ selected, onUpdateOption}) {
	const menuOptions = ['All', 'Java', 'Home', 'Projects', 'Playlists', 'Galleries', 'News']
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
			selectedOption: 'Home',
			repos: {},
			error: null
		}
		this.updateOption = this.updateOption.bind(this);
		this.isLoading = this.isLoading.bind(this);
	}

	componentDidMount () {
		this.updateOption(this.state.selectedOption)
	}

	updateOption (selectedOption) {

		this.setState({
			selectedOption,
			error: null
		})

		if (!this.state.repos[selectedOption]) {
			fetchPopularRepos(selectedOption)
			.then((data) => {
				this.setState(({ repos }) => ({
					repos: {
						...repos,
						[selectedOption]: data
					}
				}))
			})
			.catch(() => {
				console.warn('Error fetching repos', error)
				this.setState({
					error: 'There was an error fetching repositories'

				})
			})
			
		}

		
	}

	isLoading () {

		const { selectedOption, repos, error } = this.state

		return !repos[selectedOption] && error === null

	}



	render() {

		const { selectedOption, repos, error } = this.state

		return (
			<React.Fragment>
				<MenuNav
					selected={selectedOption}
					onUpdateOption={this.updateOption}
				/>

				{this.isLoading() && <p>LOADING</p>}

				{error && <p>{error}</p>}

				{repos[selectedOption] && <pre>{JSON.stringify(repos[selectedOption], null, 2)}</pre>}
			</React.Fragment>
			)
	}

}