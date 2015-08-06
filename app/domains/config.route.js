var express = require('express');
var router  = express.Router();
var service = require('./service');
var prefix = '/domains';

module.exports = router;
console.log(service);

router.get(prefix, function(req, res) {
    var domains = service.getAll(1);
    console.log(domains);
    domains.then(function(d) {
        d.forEach(function(item) {
            console.log(item.name);
        })

    });
    res.json({ message: domains });
});

router.get(prefix + '/:id', function(req, res) {
    var domain = service.get(req.params.id);

    console.log(domain);
    res.json({ message: domain });
});

router.post(prefix, function(req, res) {
    service.create(req.body.name);
    res.json({ message: 'post ' + req.body.name });
});

router.delete(prefix, function(req, res) {

});
router.put(prefix, function(req, res) {

});

