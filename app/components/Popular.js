import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

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

function ReposGrid ({repos}) {

  return (
      <ul className='grid space-around'>
        {repos.map((repo, index) => {
          const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
          const { login, avatar_url } = owner

          return (
            <li key={html_url}>
              <Card header={`#${index + 1}`}
                avatar={avatar_url}
                href={html_url}
                name={login}
              >
                <ul className='card-list'>
                  <li>
                    <Tooltip text='Github Username'>
                      <FaUser color='rgb(255, 191, 116)' size={22} />
                      <a href={'https://github.com/${login}'}>
                        {login}
                      </a>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip text='Users location'>
                      <FaStar color='rgb(255, 215, 0)' size={22}/>
                      {stargazers_count.toLocaleString()} stars
                    </Tooltip>
                  </li>
                  <li>
                    <FaCodeBranch color='rgb(129, 195, 245)' size={22}/>
                    {forks.toLocaleString()} forks
                  </li>
                  <li>
                    <FaExclamationTriangle color='rgb(241, 138, 147)' size={22}/>
                    {open_issues.toLocaleString()} open issues
                  </li>
                </ul>
              </Card>
            </li>
            )
        })

        }
      </ul>
    )
}

ReposGrid.propTypes = {

  repos: PropTypes.array.isRequired
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

        {this.isLoading() && <Loading text='Fetching Repos'/>}

        {error && <p className='center-text error'>{error}</p>}

        {repos[selectedOption] && <ReposGrid repos={repos[selectedOption]}/>}
      </React.Fragment>
      )
  }

}