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
    it('should insert an article into collection', async () => {
      const articles = db.collection('articles');
  
      const mockArticle = {_id: 'some-article-id', name: 'mockName'};
      await articles.insertOne(mockArticle);
  
      const insertedArticle = await articles.findOne({_id: 'some-article-id'});
      expect(insertedArticle).toEqual(mockArticle);
    });


////////////
    it('should change an article into collection', async () => {
      const articles = db.collection('articles');
  
      const mockArticle = {_id: 'some-article-id', name: 'newMockName'};
      await articles.replaceOne({ _id: 'some-article-id' }, mockArticle);
  
      const updatedArticle = await articles.findOne({_id: 'some-article-id'});
      expect(updatedArticle).toEqual(mockArticle);
    });


////////////
    it('should delete an article into collection', async () => {
      const articles = db.collection('articles');
  
      const mockArticle = {_id: 'some-article-id'};
      await articles.deleteOne(mockArticle);

      const deletedArticle = await articles.findOne({_id: 'some-article-id'});
      expect(deletedArticle).toBeNull();
    });


  });