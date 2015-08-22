var express = require('express');
var router = express.Router();
var domainController = require('./../controllers/domain.controller.js')();
var keywordController = require('./../controllers/keyword.controller.js')();

module.exports = router;

// Domain routes
router.route('/domains')
    .get(domainController.getAll)
    .post(domainController.create)
    .put(domainController.update);
router
    .get('/domains/:id', domainController.get)
    .delete('/domains/:id', domainController.delete);

// Keyword routes
router.route('/domains/:domainId/keywords/:keywordId')
    .post(keywordController.rank)
    .get(keywordController.history);
router.post('/domains/:id/keywords/', keywordController.rankAll)
    .delete('/domains/:domainId/keywords/:keywordId', keywordController.delete);