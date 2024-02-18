const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = "List all the users"
  */

  try {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json( {message: 'There are no registered users'});
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });

  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const getSingle = async (req, res) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = "Get the user by the ID"
  */

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'You must use a valid user ID to find an user.'});
    }

    const userIdDB = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userIdDB });

    result.toArray().then((lists) => {
        if (lists.length === 0) {
          res.status(404).json({message: 'The user with that ID does not exist.'});
          return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};



const createUser = async (req, res) => {
  /**
    * #swagger.tags = ['Users']
    * #swagger.summary = "Create a new user"
    * #swagger.description = "Enter the user information in the body template provided, userID is created automatically."
  */

  try {

    const userBody = {
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      phone: req.body.phone,
      email: req.body.email,
      birthDate: req.body.birthDate,
      address: req.body.address,
      jobTitle: req.body.jobTitle
    };

    const response = await mongodb.getDb().db().collection('users').insertOne(userBody);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({message: 'Some error occurred while creating the user.'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const updateUser = async (req, res) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = "Update user information by ID"
   * #swagger.description = "Enter the user ID and any necessary changes in the body template provided."
  */

  const userBody = {
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    phone: req.body.phone,
    email: req.body.email,
    birthDate: req.body.birthDate,
    address: req.body.address,
    jobTitle: req.body.jobTitle
  };

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'You must use a valid user ID to find an user.'});
    }

    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId }, userBody);

    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }

};



const deleteUser = async (req, res) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = "Remove a user by ID"
   * #swagger.description = "Enter the user ID <p> **WARNING:** The user will be permanently removed from the database.<p>"
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'You must use a valid user ID to find an user.'});
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId }, true);

    if (response.deletedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
