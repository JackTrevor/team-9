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
  it('should insert a journalist into collection', async () => {
    const journalists = db.collection('journalists');

    const mockuser = {_id: 'some-journalist-id', name: 'mockName'};
    await journalists.insertOne(mockuser);

    const inserteduser = await journalists.findOne({_id: 'some-journalist-id'});
    expect(inserteduser).toEqual(mockuser);
  });


////////////
  it('should change a journalist in the collection', async () => {
    const users = db.collection('journalists');

    const mockuser = {_id: 'some-journalist-id', name: 'newMockName'};
    await users.replaceOne({_id: 'some-journalist-id'}, mockuser);

    const updateduser = await users.findOne({_id: 'some-journalist-id'});
    expect(updateduser).toEqual(mockuser);
  });


////////////
  it('should delete a journalist in the collection', async () => {
    const users = db.collection('journalists');

    const mockuser = {_id: 'some-journalist-id'};
    await users.deleteOne(mockuser);

    const deleteduser = await users.findOne({_id: 'some-journalist-id'});
    expect(deleteduser).toBeNull();
  });
});
