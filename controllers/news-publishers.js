const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  /**
   * #swagger.tags = ['News Publishers']
   * #swagger.summary = "List all the news publishers"
  */
  
  try {
    const result = await mongodb.getDb().db().collection('news-publishers').find();
    result.toArray().then((lists) => {
      if (lists.length == 0) {
        res.status(404).json({ message: 'There are no registered news publishers' });
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
   * #swagger.tags = ['News Publishers']
   * #swagger.summary = "Get the news publisher by the ID register in MongoDB"
   * #swagger.description = "Enter the news publisher ID."
  */

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'You must use a valid news publisher ID to find one.' });
    }

    const publisherId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('news-publishers').find({ _id: publisherId });

    result.toArray().then((lists) => {
        if (lists.length == 0) {
          res.status(404).json({message: 'The news publisher with that ID does not exist.'});
          return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createPublisher = async (req, res) => {  
  /**
    * #swagger.tags = ['News Publisher']
    * #swagger.summary = "Create a new news publisher"
    * #swagger.description = "Enter the news publisher in the body template provided, publisherId is created automatically."
  */


  try {

    const publisherBody = {
      publisherId: req.body.publisherId,
      publisherName: req.body.publisherName,
      publisherEmail: req.body.publisherEmail,
      publisherCity: req.body.publisherCity,
      publisherEstablished: req.body.publisherEstablished
    };

    const response = await await mongodb.getDb().db().collection('news-publishers').insertOne(publisherBody);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json ({message: 'Some error occurred while creating the news publisher.'})
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  
const updatePublisher = async (req, res) => {
  /**
   * #swagger.tags = ['News Publishers']
   * #swagger.summary = "Update news publisher information by ID"
   * #swagger.description = "Enter the news publisher ID and any necessary changes in the body template provided."
  */

  const publisherBody = {
    publisherId: req.body.publisherId,
    publisherName: req.body.publisherName,
    publisherEmail: req.body.publisherEmail,
    publisherCity: req.body.publisherCity,
    publisherEstablished: req.body.publisherEstablished
  };

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'You must use a valid news publisher ID to find one.' });
    }

    const publisherId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('news-publishers').replaceOne({ _id: publisherId }, publisherBody);

    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const deletePublisher = async (req, res) => {
  /**
   * #swagger.tags = ['News Publishers']
   * #swagger.summary = "Remove a news publishers by ID"
   * #swagger.description = "Enter the news publisher ID <p> **WARNING:** The record will be permanently removed from the database.<p>"
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'You must use a valid news publisher ID to find one.' });
    }
    const publisherId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('news-publishers').deleteOne({ _id: publisherId }, true);

    if (response.deletedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    getAll,
    getSingle,
    createPublisher,
    updatePublisher,
    deletePublisher
};