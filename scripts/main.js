const searcher = document.getElementById('searcher')
const result = document.getElementById("result")

searcher.addEventListener("submit", getRepos)

async function getRepos(event) {
  event.preventDefault()
  clear()
  const username = event.target.username.value

  try {
    let result = await listRepositories(username)

    result.forEach(i => {
      const anchor = document.createElement("a")
      anchor.href = i.html_url
      anchor.textContent = i.name

      result.appendChild(anchor)
      result.appendChild(document.createElement("br"))
    })
  } catch (error) {
    console.log(error.message)
  }
}

function clear() {
  while (result.firstChild)
    result.removeChild(result.firstChild)
}
