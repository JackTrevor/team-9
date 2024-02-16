// Jest
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

// Supertest
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const ObjectId = require('mongodb').ObjectId;


// Test MongoDB
describe('MongoDb', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(process.env.MONGODB_URI);
      db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });
  
    afterAll(async () => {
      await connection.close();
    });




////////////
    it('should insert a user into collection', async () => {
      const users = db.collection('users');
  
      const mockuser = {_id: 'some-user-id', name: 'mockName'};
      await users.insertOne(mockuser);
  
      const inserteduser = await users.findOne({_id: 'some-user-id'});
      expect(inserteduser).toEqual(mockuser);
    });


////////////
    it('should change a user into collection', async () => {
      const users = db.collection('users');
  
      const mockuser = {_id: 'some-user-id', name: 'newMockName'};
      await users.replaceOne({ _id: 'some-user-id' }, mockuser);
  
      const updateduser = await users.findOne({_id: 'some-user-id'});
      expect(updateduser).toEqual(mockuser);
    });


////////////
    it('should delete a user into collection', async () => {
      const users = db.collection('users');
  
      const mockuser = {_id: 'some-user-id'};
      await users.deleteOne(mockuser);

      const deleteduser = await users.findOne({_id: 'some-user-id'});
      expect(deleteduser).toBeNull();
    });


  });


  // Test Handlers
describe('Tests GET endpoint /users', () => {

  const id = '65c2a48557f3af46b4d1486e';
  const noId = '65c2a48557f3af46';

  it('404 Status', async () => {
    const response = await request.get("/other");
    expect(response.statusCode).toBe(404);
  });


  it('Return 200 status', async () => {
      const response = await request.get("/users");
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      expect(response.statusCode).toBe(200);
    });


  it('Return 200 status userId', async () => {
    const response = await request.get(`/users/${id}`);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });


})


const newUser = {
  "id": new ObjectId('61216a421cdd420a85905155'),
  "userFirstName": "new",
  "userLastName": "new",
  "phone": "5982566987",
  "email": "new@example.com",
  "birthDate": "1993-04-05",
  "address": "new",
  "jobTitle": "new"
}

const otherUser = {
  "userFirstName": "other",
  "userLastName": "other",
  "phone": "5982566987",
  "email": "other@example.com",
  "birthDate": "1993-04-05",
  "address": "other",
  "jobTitle": "other"
}

const id = '61216a421cdd420a85905155';


describe('Test POST endpoint /users', () => {

  it('404 Status', async () => {
    const response = await request.post("/other");
    expect(response.statusCode).toBe(404);
  });


  it('Return 201 status', async () => {
    const response = await request.post("/users").send(newUser);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
  });


  it('Return 500 status - existing user', async () => {
    const response = await request.post("/users").send(newUser);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(500);
  });


})


describe('Test PUT endpoints /users', () => {

  it('404 Status', async () => {
    const response = await request.put(`/other/${id}`).send(otherUser);
    expect(response.statusCode).toBe(404);
  });


  it('204 Status', async () => {
    const response = await request.put(`/users/${id}`).send(otherUser);
    expect(response.statusCode).toBe(204);
  });


  it('500 Status -  non existing user', async () => {
    const response = await request.put(`/users/61216a421cdd420a85905152`).send(otherUser);
    expect(response.statusCode).toBe(500);
  });

})



describe('Test DELETE endpoints /users', () => {

  it('404 Status', async () => {
    const response = await request.del(`/other/${id}`);
    expect(response.statusCode).toBe(404);
  });


  it('204 Status', async () => {
    const response = await request.del(`/users/61216a421cdd420a85905155`);
    expect(response.statusCode).toBe(204);
  });


  it('500 Status -  non existing user', async () => {
    const response = await request.del(`/users/61216a421cdd420a85905155`);
    expect(response.statusCode).toBe(500);
  });


})