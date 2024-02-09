const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const collectionName = 'journalists';
const getAll = async (req, res) => {
  /**
   * #swagger.tags = ['Journalists']
   * #swagger.summary = "List all the Journalists"
   */
  try {
    const result = await mongodb.getDb().db().collection(collectionName).find();

    if (result) {
      result.toArray().then((list) => {
        if (list.length === 0) {
          res.status(404).json({message: 'There are no registered Journalists'});
          return;
        }
        res.status(200).json(list);
      });
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const getSingle = async (req, res) => {
  /**
   * #swagger.tags = ['Journalists']
   * #swagger.summary = "Get the Journalist by the ID"
   */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'Invalid id'});
    }

    const result = await mongodb.getDb().db().collection(collectionName).findOne({
      _id: new ObjectId(req.params.id)
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const createJournalist = async (req, res) => {
  /**
   * #swagger.tags = ['Journalists']
   * #swagger.summary = "Create a new Journalist"
   * #swagger.description = "Enter the Journalist information in the body template provided, JournalistID is created automatically."
   */
  try {
    const journalistDTO = {
      name: req.body.name,
      tags: req.body.tags,
      email: req.body.email,
      publisher: req.body.publisher,
      twitter: req.body.twitter,
    };

    const response = await mongodb.getDb().db().collection(collectionName).insertOne(journalistDTO);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({message: 'Some error occurred while creating the Journalist.'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const updateJournalist = async (req, res) => {
  /**
   * #swagger.tags = ['Journalists']
   * #swagger.summary = "Update Journalist information by ID"
   * #swagger.description = "Enter the Journalist ID and any necessary changes in the body template provided."
   */
  const journalistDTO = {
    name: req.body.name,
    tags: req.body.tags,
    email: req.body.email,
    publisher: req.body.publisher,
    twitter: req.body.twitter,
  };

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'You must use a valid Journalist ID to find an Journalist.'});
    }

    const response = await mongodb.getDb().db().collection(collectionName)
      .replaceOne({_id: new ObjectId(req.params.id)}, journalistDTO);

    if (response.modifiedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the Journalist.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const deleteJournalist = async (req, res) => {
  /**
   * #swagger.tags = ['Journalists']
   * #swagger.summary = "Remove a Journalist by ID"
   * #swagger.description = "Enter the Journalist ID <p> **WARNING:** The Journalist will be permanently removed from the database.<p>"
   */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'You must use a valid Journalist ID to find an Journalist.'});
    }

    const response = await mongodb.getDb().db().collection(collectionName).deleteOne({_id: new ObjectId(req.params.id)});

    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the Journalist.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

module.exports = {
  getAll,
  getSingle,
  createJournalist,
  updateJournalist,
  deleteJournalist
};
