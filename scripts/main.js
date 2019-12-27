const searcher = document.getElementById('searcher')
const resultSection = document.getElementById('resultSection')
const personalData = document.getElementById('personalData')

searcher.addEventListener('submit', getData)

function getData(event) {
  event.preventDefault()
  const username = event.target.username.value
  clear()
  getUser(username)
  getRepositories(username)
}

async function getUser(username) {
  try {
    let user = await retrieveUser(username)

    const name = document.createElement('h1')
    const nickname = document.createElement('p')
    const avatar = document.createElement('img')
    const bio = document.createElement('p')
    const div = document.createElement('div')

    name.innerHTML = user.name
    nickname.innerHTML = `@${user.login}`
    avatar.src = user.avatar_url
    bio.innerHTML = user.bio

    personalData.appendChild(avatar)
    personalData.appendChild(div)
    div.appendChild(nickname)
    div.appendChild(name)
    div.appendChild(bio)

  } catch (error) {
    console.log(error.message)
  }
}

async function getRepositories(username) {
  const title = document.createElement('h1')
  title.innerHTML = 'Repositories'
  resultSection.appendChild(title)

  try {
    let results = await listRepositories(username)

    results.forEach(elem => {
      const anchor = document.createElement('a')
      const div = document.createElement('div')
      const forks = document.createElement('p')
      const stars = document.createElement('p')
      const forkIcon = document.createElement('i')
      const starIcon = document.createElement('i')
      const container = document.createElement('div')

      anchor.href = elem.html_url
      anchor.textContent = elem.name
      forks.innerHTML = elem.forks
      stars.innerHTML = elem.watchers

      anchor.classList.add('repository__name')
      container.classList.add('repository')
      div.classList.add('repository__info')

      starIcon.classList.add('fas')
      starIcon.classList.add('fa-star')
      forkIcon.classList.add('fas')
      forkIcon.classList.add('fa-code-branch')

      resultSection.appendChild(container)
      container.appendChild(anchor)
      container.appendChild(div)
      div.appendChild(starIcon)
      div.appendChild(stars)
      div.appendChild(forkIcon)
      div.appendChild(forks)
    })
  } catch (error) {
    console.log(error.message)
  }
}

function clear() {
  while (resultSection.firstChild)
    resultSection.removeChild(resultSection.firstChild)
}
