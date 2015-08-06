var models  = require('../../models');

var service = {
    create : createDomain,
    getAll: getAllDomains,
    get : getDomain
};

function createDomain(domain) {
    return models.Domain.create({
        name: domain
    })
}

function getAllDomains(domain) {
    return models.Domain.findAll();
}

function getDomain(id) {
    console.log('return domain from data base');
    return models.Domain.findById(id);
}

module.exports = service;