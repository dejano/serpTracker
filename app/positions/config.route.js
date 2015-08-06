var express = require('express');
var router  = express.Router();
//var service = require('service');
var prefix = '/domains';

module.exports = router;

router.get(prefix, function(req, res) {
    res.json({ message: 'get' });
});

router.get(prefix + '/:id', function(req, res) {
    res.json({ message: 'get ' + req.params.id });
});

router.post(prefix, function(req, res) {
    res.json({ message: 'post ' + req.body.name });
});

router.delete(prefix, function(req, res) {

});
router.put(prefix, function(req, res) {

});

