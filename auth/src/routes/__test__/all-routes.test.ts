import request from 'supertest';

import { app } from '../../app';

describe('POST /api/v1/users/signup', () => {
  it('should return 201 on successful signup', async () => {
    return request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201)
  });

  it('should return 400 with invalid email', async () => {
    return request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test',
        password: 'password'
      })
      .expect(400)
  });

  it('should return 400 with invalid password', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'pas'
      })
      .expect(400)
  });

  it('should return 400 with duplicate email not allowed', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201)
    await request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(400)
  });

  it('should set coockie after successful signup', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
  });
})

describe('POST /api/v1/users/signin', () => {
  it('should fail if email does not exist', async () => {
    await request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400)
  });

  it('should fail if invalid password passed does not exist', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201)

    await request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'test@test.com', password: 'xyz' })
      .expect(400)
  });

  it('should sign in successfully with a cookie', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201)

    const response = await request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
  });

  // it('should set coockie after successful signin', async () => {
  //   const response = await request(app)
  //     .post('/api/v1/users/signin')
  //     .send({ email: 'test@test.com', password: 'password' })
  //     .expect(201)

  //   expect(response.get('Set-Cookie')).toBeDefined()
  // });
})

describe('POST /api/v1/users/signout', () => {
  it('should clear cookie after signing out', async () => {
    await request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201)

    const response = await request(app)
      .post('/api/v1/users/signout')
      .send({})
      .expect(200)

    // console.log(response.get('Set-Cookie'))
    const cookie = response.get('Set-Cookie')

    if (!cookie) throw new Error('cookie undefined')

    expect(cookie[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
  });
})

describe('POST /api/v1/users/currentuser', () => {
  it('should crespond with details of current user', async () => {
    let response = await request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201)

    const cookie = response.get('Set-Cookie')

    if (!cookie) throw new Error('cookie undefined')

    response = await request(app)
      .get('/api/v1/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com')

  });
})
