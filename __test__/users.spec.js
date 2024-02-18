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
    it('Should insert a user into collection', async () => {
      const users = db.collection('users');
  
      const mockuser = {_id: 'some-user-id', name: 'mockName'};
      await users.insertOne(mockuser);
  
      const inserteduser = await users.findOne({_id: 'some-user-id'});
      expect(inserteduser).toEqual(mockuser);
    });


////////////
    it('Should change a user into collection', async () => {
      const users = db.collection('users');
  
      const mockuser = {_id: 'some-user-id', name: 'newMockName'};
      await users.replaceOne({ _id: 'some-user-id' }, mockuser);
  
      const updateduser = await users.findOne({_id: 'some-user-id'});
      expect(updateduser).toEqual(mockuser);
    });


////////////
    it('Should delete a user into collection', async () => {
      const users = db.collection('users');
  
      const mockuser = {_id: 'some-user-id'};
      await users.deleteOne(mockuser);

      const deleteduser = await users.findOne({_id: 'some-user-id'});
      expect(deleteduser).toBeNull();
    });


  });





// Test Handlers

const collectionNames = ['articles', 'journalists', 'news-publishers', 'users'];

collectionNames.forEach((collection) => {

  describe(`Tests the GET endpoint on the ${collection} collection`, () => {
  
    it('404 Status - Wrong endpoint', async () => {
      const response = await request.get("/other");
      expect(response.statusCode).toBe(404);
    });
  
  
    it(`200 Status - Should read ${collection} collection`, async () => {
        const response = await request.get(`/${collection}`);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.statusCode).toBe(200);
      });
  
  });



  describe(`Unauthorized endpoints on the ${collection} collection`, () => {

      const newUser = {
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


      it('POST - Should return 401 status', async () => {
        const response = await request.post(`/${collection}`).send(newUser);
        expect(response.statusCode).toBe(401);
      });

      it('PUT - Should return 401 Status', async () => {
        const response = await request.put(`/${collection}/65c2a48557f3af46b4d1486e`).send(otherUser);
        expect(response.statusCode).toBe(401);
      });
    
    
      it('DELETE - Should return 401 Status', async () => {
        const response = await request.del(`/${collection}/61216a421cdd420a85905155`);
        expect(response.statusCode).toBe(401);
      });
  
  });

})




///////////////////////////////////////////////
//    Tests when endpoints are authorized    //
///////////////////////////////////////////////


// const newUser = {
//   "id": new ObjectId('61216a421cdd420a85905155'),
//   "userFirstName": "new",
//   "userLastName": "new",
//   "phone": "5982566987",
//   "email": "new@example.com",
//   "birthDate": "1993-04-05",
//   "address": "new",
//   "jobTitle": "new"
// }

// const otherUser = {
//   "userFirstName": "other",
//   "userLastName": "other",
//   "phone": "5982566987",
//   "email": "other@example.com",
//   "birthDate": "1993-04-05",
//   "address": "other",
//   "jobTitle": "other"
// }

// const id = '61216a421cdd420a85905155';


// describe('Test POST endpoint /users', () => {

//   it('404 Status', async () => {
//     const response = await request.post("/other");
//     expect(response.statusCode).toBe(404);
//   });


//   it('Return 201 status', async () => {
//     const response = await request.post("/users").send(newUser);
//     expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     expect(response.statusCode).toBe(201);
//   });


//   it('Return 500 status - existing user', async () => {
//     const response = await request.post("/users").send(newUser);
//     expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     expect(response.statusCode).toBe(500);
//   });


// })


// describe('Test PUT endpoints /users', () => {

//   it('404 Status', async () => {
//     const response = await request.put(`/other/${id}`).send(otherUser);
//     expect(response.statusCode).toBe(404);
//   });


//   it('204 Status', async () => {
//     const response = await request.put(`/users/${id}`).send(otherUser);
//     expect(response.statusCode).toBe(204);
//   });


//   it('500 Status -  non existing user', async () => {
//     const response = await request.put(`/users/61216a421cdd420a85905152`).send(otherUser);
//     expect(response.statusCode).toBe(500);
//   });

// })



// describe('Test DELETE endpoints /users', () => {

//   it('404 Status', async () => {
//     const response = await request.del(`/other/${id}`);
//     expect(response.statusCode).toBe(404);
//   });


//   it('204 Status', async () => {
//     const response = await request.del(`/users/61216a421cdd420a85905155`);
//     expect(response.statusCode).toBe(204);
//   });


//   it('500 Status -  non existing user', async () => {
//     const response = await request.del(`/users/61216a421cdd420a85905155`);
//     expect(response.statusCode).toBe(500);
//   });


// })