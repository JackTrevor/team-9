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
    it('should insert a publisher into collection', async () => {
      const publishers = db.collection('publishers');
  
      const mockpublisher = {_id: 'some-publisher-id', name: 'mockName'};
      await publishers.insertOne(mockpublisher);
  
      const insertedpublisher = await publishers.findOne({_id: 'some-publisher-id'});
      expect(insertedpublisher).toEqual(mockpublisher);
    });


////////////
    it('should change a publisher into collection', async () => {
      const publishers = db.collection('publishers');
  
      const mockpublisher = {_id: 'some-publisher-id', name: 'newMockName'};
      await publishers.replaceOne({ _id: 'some-publisher-id' }, mockpublisher);
  
      const updatedpublisher = await publishers.findOne({_id: 'some-publisher-id'});
      expect(updatedpublisher).toEqual(mockpublisher);
    });


////////////
    it('should delete a publisher into collection', async () => {
      const publishers = db.collection('publishers');
  
      const mockpublisher = {_id: 'some-publisher-id'};
      await publishers.deleteOne(mockpublisher);

      const deletedpublisher = await publishers.findOne({_id: 'some-publisher-id'});
      expect(deletedpublisher).toBeNull();
    });

  });