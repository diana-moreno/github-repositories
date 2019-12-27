const searcher = document.getElementById('searcher')
const resultSection = document.getElementById('resultSection')
const personalData = document.getElementById('personalData')

searcher.addEventListener('submit', getData)

async function getData(event) {
  event.preventDefault()
  const username = event.target.username.value
  clear(personalData)
  clear(resultSection)
  let user = await getUser(username)
  user && await getRepositories(username)
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

    return user

  } catch ({ message }) {
    const div = document.createElement('div')
    personalData.appendChild(div)
    const errorMessage = document.createElement('p')
    errorMessage.innerHTML = message
    div.appendChild(errorMessage)
    div.classList.add('feedback')
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
  } catch ({ message }) {
    const div = document.createElement('div')
    personalData.appendChild(div)
    const errorMessage = document.createElement('p')
    errorMessage.innerHTML = message
    div.appendChild(errorMessage)
    div.classList.add('feedback')
  }
}

function clear(container) {
  while (container.firstChild)
    container.removeChild(container.firstChild)
}
