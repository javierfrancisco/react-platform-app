export function fetchPopularRepos (option) {

  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${option}&sort=stars&order=desc&type=Repositories`)

  console.log('repo endpoint:' + endpoint);

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message)
      }

      return data.items
    })
}