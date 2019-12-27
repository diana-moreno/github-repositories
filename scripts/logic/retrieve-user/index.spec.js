describe('logic - retrieve user', () => {
  it('should succeed on correct username', async () => {
    const username = 'diana-moreno'

    const user = await retrieveUser(username)
    expect(user).toBeDefined()

    expect(user.name).toBeDefined()
    expect(typeof user.name).toBe('string')
    expect(user.name.length).toBeGreaterThan(0)

    expect(user.login).toBeDefined()
    expect(typeof user.login).toBe('string')
    expect(user.login.length).toBeGreaterThan(0)
    expect(user.login).toEqual(username)

    expect(user.avatar_url).toBeDefined()
    expect(typeof user.avatar_url).toBe('string')
    expect(user.avatar_url.length).toBeGreaterThan(0)

    expect(user.bio).toBeDefined()
    expect(typeof user.bio).toBe('string')
    expect(user.bio.length).toBeGreaterThan(0)
  })

  it('should fail on incorrect username', async () => {
    const username = 'sdfghjklrtyhjkdfdsdfhbskdjfn'
    try {
      const user = await retrieveUser(username)
      expect(user).toBeUndefined()

    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBeDefined()
      expect(typeof error.message).toBe('string')
      expect(error.message.length).toBeGreaterThan(0)
      expect(error.message).toEqual('Does not exist')
    }
  })

  it('should fail on empty username', async () => {
    const username = ''
    try {
      const user = await retrieveUser(username)
      expect(user).toBeUndefined()

    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBeDefined()
      expect(typeof error.message).toBe('string')
      expect(error.message.length).toBeGreaterThan(0)
      expect(error.message).toEqual('username is empty or blank')
    }
  })

  it('should fail on incorrect username expression type', () => {
    expect(function() { retrieveUser(1) }).toThrowError(TypeError, '1 is not a string')
    expect(function() { retrieveUser(true) }).toThrowError(TypeError, 'true is not a string')
    expect(function() { retrieveUser([]) }).toThrowError(TypeError, ' is not a string')
    expect(function() { retrieveUser({}) }).toThrowError(TypeError, '[object Object] is not a string')
    expect(function() { retrieveUser(undefined) }).toThrowError(TypeError, 'undefined is not a string')
    expect(function() { retrieveUser(null) }).toThrowError(TypeError, 'null is not a string')
  })
})
