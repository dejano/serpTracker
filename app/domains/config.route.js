var express = require('express');
var router = express.Router();
var controller = require('./domain.controller');

module.exports = router;

router.route('/domains')
    .get(function (req, res, next) {
        controller.getAll(req, res, next);
    })
    .post(function (req, res, next) {
        controller.create(req, res, next);
    })
    .put(function (req, res, next) {
        controller.update(req, res, next);
    });

router
    .get('/domains/:id', function (req, res, next) {
        controller.get(req, res, next);
    })
    .delete('/domains/:id', function (req, res, next) {
        controller.delete(req, res, next);
    });