describe('logic - list repositories', () => {
  it('should succeed on correct username', async () => {
    const username = 'diana-moreno'

    const repositories = await listRepositories(username)
    expect(repositories).toBeDefined()
    expect(repositories.length).toBeGreaterThan(0)

    repositories.forEach(repo => {
      expect(repo.owner.login).toBeDefined()

      expect(repo.name).toBeDefined()
      expect(typeof repo.name).toBe('string')
      expect(repo.name.length).toBeGreaterThan(0)

      expect(repo.html_url).toBeDefined()
      expect(typeof repo.html_url).toBe('string')
      expect(repo.html_url.length).toBeGreaterThan(0)

      expect(repo.forks).toBeDefined()
      expect(typeof repo.forks).toBe('number')

      expect(repo.watchers).toBeDefined()
      expect(typeof repo.watchers).toBe('number')
    })
  })

  it('should fail on incorrect username', async () => {
    const username = 'sdfghjklrtyhjkdfdsdfhbskdjfn'
    try {
      const repositories = await listRepositories(username)
      expect(repositories).toBeUndefined()

    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBeDefined()
      expect(typeof error.message).toBe('string')
      expect(error.message.length).toBeGreaterThan(0)
      expect(error.message).toEqual('There are no repositories')
    }
  })

  it('should fail on empty username', async () => {
    const username = ''
    try {
      const repositories = await listRepositories(username)
      expect(repositories).toBeUndefined()

    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBeDefined()
      expect(typeof error.message).toBe('string')
      expect(error.message.length).toBeGreaterThan(0)
      expect(error.message).toEqual('username is empty or blank')
    }
  })

  it('should fail on incorrect username expression type', () => {
    expect(function() { listRepositories(1) }).toThrowError(TypeError, '1 is not a string')
    expect(function() { listRepositories(true) }).toThrowError(TypeError, 'true is not a string')
    expect(function() { listRepositories([]) }).toThrowError(TypeError, ' is not a string')
    expect(function() { listRepositories({}) }).toThrowError(TypeError, '[object Object] is not a string')
    expect(function() { listRepositories(undefined) }).toThrowError(TypeError, 'undefined is not a string')
    expect(function() { listRepositories(null) }).toThrowError(TypeError, 'null is not a string')
  })
})
