function listRepositories(username) {
  // synchronous validation
  if (typeof username !== 'string') throw new TypeError(username + ' is not a string')
  if (!username.trim().length) throw new ContentError('username is empty or blank')

  return (async () => {
    const URL = `https://api.github.com/users/${username}/repos`
    const res = await call(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) return JSON.parse(res.body)
    if (res.status === 404) throw new NotFoundError('There are no repositories')
  })()
}
