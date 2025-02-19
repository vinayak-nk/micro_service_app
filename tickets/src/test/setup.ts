import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
// import request from 'supertest';
// import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  // eslint-disable-next-line no-var
  var signin: () => Promise<string[]>
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = 'xyz'
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
      await collection.deleteMany({})
    }
  }
})


afterAll(async () => {
  if (mongo) {
    await mongo.stop()
  }
  await mongoose.connection.close()
})

global.signin = async () => {
  // Build JWT paload. { id, email }
  const payload = { id: 'qwertyuas', email: 'test@test.com' }
  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)
  // Build session object { jwt: value }
  const session = { jwt: token }
  // Turn that session into JSON
  const sessionJson = JSON.stringify(session)
  // Take JSON and encode as base64
  const base64 = Buffer.from(sessionJson).toString('base64')
  // return a string cookie data
  return [`session=${base64}`]
  /*
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201)

    const cookie = response.get('Set-Cookie')

    if (!cookie) throw new Error('Cookie undefined');

    return cookie
  */
}