const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
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