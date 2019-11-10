import React from 'react'

export default class Popular extends React.Component {


	render() {

		const menuOptions = ['All', 'JavaScript', 'Ruby', 'Java', 'Css', 'Python']

		return (
			<ul className='flex-center'>
				{menuOptions.map((menuOption) => (
					<li key={menuOption}>
						<button className='btn-clear nav-link'>
							{menuOption}
						</button>
					</li>
					))
				}
			</ul>
			)
	}

}