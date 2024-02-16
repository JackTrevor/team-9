const {body, validationResult} = require('express-validator')

const requiredField = (field) => body(field).notEmpty().withMessage('Field is required');
const collections = {
  users: ['userFirstName', 'userLastName', 'phone', 'email', 'birthDate', 'address', 'jobTitle'],
  publishers: ['publisherName', 'publisherEmail', 'publisherCity', 'publisherEstablished'],
  journalists: ['name', 'tags', 'email', 'publisher', 'twitter'],
  articles: ['title', 'author', 'publication_date', 'content', 'keywords', 'source', 'url']
}
const validationRules = {};

Object.keys(collections).forEach(collection => {
  validationRules[collection] = collections[collection].map(field => requiredField(field));
});

const validations = () => validationRules;
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return res.status(422).json({
    errors: errors.array().map(err => ({[err.path]: err.msg}))
  })
}

module.exports = {
  validationRules,
  validations,
  validate
}
