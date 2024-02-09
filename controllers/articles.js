const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  /**
   * #swagger.tags = ['Articles']
   * #swagger.summary = "List all articles"
  */
  
  try {
    const result = await mongodb.getDb().db().collection('articles').find();
    result.toArray().then((lists) => {
      if (lists.length == 0) {
        res.status(404).json({ message: 'There are no registered articles' });
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getSingle = async (req, res, next) => {
  /**
   * #swagger.tags = ['Articles']
   * #swagger.summary = "Get an article by the ID register in MongoDB"
   * #swagger.description = "Enter the article ID."
  */

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'You must use a valid article ID to find one.' });
    }

    const articleId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('articles').find({ _id: articleId });

    result.toArray().then((lists) => {
        if (lists.length == 0) {
          res.status(404).json({message: 'The article with that ID does not exist.'});
          return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createArticle = async (req, res) => {  
  /**
    * #swagger.tags = ['Articles']
    * #swagger.summary = "Create an article"
    * #swagger.description = "Enter the article in the body template provided, articleId is created automatically."
  */


  try {

    const articleBody = {
      title: req.body.title,
      author: req.body.author,
      publication_date: req.body.publication_date,
      content: req.body.content,
      keywords: req.body.keywords,
      source: req.body.source,
      url: req.body.url,

    };

    const response = await await mongodb.getDb().db().collection('articles').insertOne(articleBody);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json ({message: 'Some error occurred while creating the article.'})
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  
const updateArticle = async (req, res) => {
  /**
   * #swagger.tags = ['Articles']
   * #swagger.summary = "Update article information by ID"
   * #swagger.description = "Enter the article ID and any necessary changes in the body template provided."
  */

  const articleBody = {
      title: req.body.title,
      author: req.body.author,
      publication_date: req.body.publication_date,
      content: req.body.content,
      keywords: req.body.keywords,
      source: req.body.source,
      url: req.body.url,
  };

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'You must use a valid article ID to find one.' });
    }

    const articleId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('articles').replaceOne({ _id: articleId }, articleBody);

    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the article.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const deleteArticle = async (req, res) => {
  /**
   * #swagger.tags = ['Articles']
   * #swagger.summary = "Remove an article by ID"
   * #swagger.description = "Enter the article ID <p> **WARNING:** The record will be permanently removed from the database.<p>"
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'You must use a valid article ID to find one.' });
    }
    const articleId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('articles').deleteOne({ _id: articleId }, true);

    if (response.deletedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the article.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    getAll,
    getSingle,
    createArticle,
    updateArticle,
    deleteArticle
};