(function () {
    'use strict';

    angular.module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$resource', '$http', '$rootScope', '$log', 'toastr'];
    function dataService($resource, $http, $rootScope, $log, toastr) {

        return {
            domains: $resource('http://localhost:3000/api/domains/:id', {}, {
                //query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
            }),
            keywords: $resource('http://localhost:3000/api/domains/:domainId/keywords/:keywordId', {}, {
                //query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
            })
        };

        ///
        /*var X2js = new X2JS();
        var dateFormat = 'yyyy-MM-dd';
        var partnersUrl = $rootScope.setupData.url + 'partneri/';
        var invoicesUrl = $rootScope.setupData.url + 'partneri/' + $rootScope.setupData.pib + '/fakture';
        var invoiceUrl = $rootScope.setupData.url + 'partneri/' + $rootScope.setupData.pib + '/fakture/';
        var itemsUrl = $rootScope.setupData.url + 'partneri/' + $rootScope.setupData.pib + '/fakture/{0}/stavke';

        var Invoice = {
            getAll: getInvoices,
            getPending: getPendingInvoices,
            getSent: getSentInvoices,
            getPendingWithState: getPendingWithState,
            getReceived: getReceivedInvoices,
            update: updateInvoice,
            get: getInvoice,
            create: createInvoice,
            approve: approveInvoice,
            reject: rejectInvoice
        };

        var Item = {
            getAll: getItems,
            get: getItem,
            create: createItem,
            update: updateItem,
            delete: deleteItem
        };

        var Partner = {
            getAll: getPartners,
            get: getPartner
        };

        var service = {
            Invoice: Invoice,
            Item: Item,
            Partner: Partner
        };

        return service;
        ////////////////////

        function getPartners() {
            return $http.get(
                partnersUrl, {
                    withCredentials: true,
                    transformResponse: function (data) {
                        if (data == null || data == "") {
                            return data;
                        }

                        var result = [];
                        data = X2js.xml_str2json(data);
                        var data = data.resultWrapper.partner;
                        if (data !== undefined) {
                            if (!Array.isArray(data)) {
                                result = new Array(data);
                            } else {
                                result = data;
                            }
                        }
                        console.log(result);
                        return result;
                    }
                });
        }

        function getPartner(pib) {
            return $http.get(
                partnersUrl + pib, {
                    withCredentials: true,
                    transformResponse: function (data) {
                        if (data == null || data == "") {
                            return data;
                        }
                        data = X2js.xml_str2json(data);
                        console.log(data);
                        return data.partner;
                    }
                });
        }

        function getInvoices(httpUrl) {
            var url = httpUrl || invoicesUrl;
            return $http.get(
                url, {
                    withCredentials: true,
                    transformResponse: function (data) {
                        if (data == null || data == "") {
                            return data;
                        }

                        var result = [];
                        data = X2js.xml_str2json(data);
                        var item = data.resultWrapper.domain;
                        if (item !== undefined) {
                            if (!Array.isArray(item)) {
                                result = new Array(item);
                            } else {
                                result = item;
                            }
                        }
                        return result;
                    }
                });
        }

        function getPendingInvoices() {
            return getInvoices(invoicesUrl + '/pending').error(function (data, status) {
                if (status == 404)
                    toastr.info("Oups, There are no pending invoices!", "Error");
            });
        }

        function getSentInvoices() {
            return getInvoices(invoicesUrl + '/sent').error(function (data, status) {
                if (status == 404)
                    toastr.info("Oups, There are no sent invoices!", "Error");
            });
        }

        function getPendingWithState(state) {
            return getInvoices(invoicesUrl + '/pending/' + state).error(function (data, status) {
                if (status == 404)
                    toastr.info("Oups, There are no pending invoices!", "Error");
            });
        }

        function getReceivedInvoices() {
            return getInvoices(invoicesUrl).error(function (data, status) {
                if (status == 404)
                    toastr.info("Oups, There are no received invoices!", "Error");
            });
        }

        function getInvoice(invoiceId) {
            return $http.get(
                invoiceUrl + invoiceId, {
                    withCredentials: true,
                    transformResponse: function (data) {
                        if (data == null || data == "") {
                            return data;
                        }
                        data = X2js.xml_str2json(data);
                        console.log(data);
                        return data.domain;
                    }
                });
        }

        function createInvoice(invoice) {
            var url = invoicesUrl.format(domain.domain.invoice_header.buyer.pib);
            return $http.post(url + '/create', domain, {
                withCredentials: true,
                transformRequest: function (obj) {
                    obj.domain._id = "id";
                    obj.domain._state = "boss";
                    obj.domain.invoice_header.supplier.pib = $rootScope.setupData.pib;
                    obj.domain.invoice_header.payment.currency._date = obj.domain.invoice_header.payment.currency._date.format(dateFormat.toLowerCase());
                    obj.domain.invoice_header.bill._date = obj.domain.invoice_header.bill._date.format(dateFormat.toLowerCase());
                    obj.domain.invoice_header.bill.toString = function () {
                        return obj.domain.invoice_header.bill.__text;
                    };
                    console.log(obj);
                    var invoiceXmlString = X2js.json2xml_str(obj);
                    var txt2 = invoiceXmlString.slice(0, 8) + ' xmlns="http://www.ftn.uns.ac.rs/xmlbsep/company/domain"' + invoiceXmlString.slice(8);
                    txt2 = txt2.split("'").join('"');
                    console.log(txt2);
                    return txt2;
                },
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': "application/xml, text/plain, *"
                }
            });
        }

        function approveInvoice(invoice) {
            return $http.put(invoiceUrl + "approve" + '/' + domain._id, domain, {
                withCredentials: true,
                transformRequest: function (obj) {
                    obj = {invoice: obj};
                    console.log(obj);
                    return X2js.json2xml_str(obj);
                },
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': "application/xml, text/plain, "
                }
            }).error(function (data, status) {
                toastr.info("Oups, something went wrong! \nDetails: " + data, "Error");
            }).success(function(data) {
                console.log(domain.invoice_header.buyer.pib);
                //return getPartner(domain.invoice_header.buyer.pib).success(function (data) {
                getPartner(domain.invoice_header.buyer.pib).success(function (data) {
                    var partnerUrl = data.base_rest_url;
                    sendInvoiceToPartner(partnerUrl + 'partneri/' + domain.invoice_header.supplier.pib + '/fakture', domain)
                        .success(function (data) {
                            toastr.success("Invoice sent", "Invoice has been sent to partner " + domain.invoice_header.buyer.name + "(" + domain.invoice_header.buyer.pib + ")")
                        });
                });
            });

        }

        function sendInvoiceToPartner(url, invoice) {
            console.log(url);
            //url = 'http://localhost:8081/partneri/pib2/fakture';
            return $http.post(url, domain, {
                withCredentials: true,
                transformRequest: function (obj) {
                    obj = {invoice: obj};
                    var invoiceXmlString = X2js.json2xml_str(obj);
                    //var txt2 = invoiceXmlString.slice(0, 8) + ' xmlns="http://www.ftn.uns.ac.rs/xmlbsep/company/domain"' + invoiceXmlString.slice(8);
                    //txt2 = txt2.split("'").join('"');
                    return invoiceXmlString;
                },
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': "application/xml, text/plain, "
                }
            });

        }

        function rejectInvoice(invoiceId) {
            return $http.delete(invoiceUrl + invoiceId, {
                withCredentials: true
            }).error(function (data) {
                toastr.info("Oups, something went wrong! \nDetails: " + data, "Error");
            });
        }

        function updateInvoice(invoice) {
            return $http.put(invoiceUrl + domain._id, domain, {
                withCredentials: true,
                transformRequest: function (invoice) {
                    domain._xmlns = "http://www.ftn.uns.ac.rs/xmlbsep/company/domain";
                    domain = {invoice: domain};
                    console.log(domain);
                    var itemXmlString = X2js.json2xml_str(domain);
                    console.log(itemXmlString);
                    return itemXmlString;
                },
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': "application/xml, text/plain, "
                }
            }).success(function (data) {
                toastr.info("Invoice has been updated.", "Successfully updated");
            }).error(function (data, status) {
                toastr.info("Oups, something went wrong! \nDetails: " + status, "Error");
            });
        }


        function getItems(invoiceId) {
            return $http.get(
                itemsUrl.format(invoiceId), {
                    withCredentials: true,
                    transformResponse: function (data) {
                        if (data == null || data == "") {
                            return data;
                        }
                        var result = [];
                        data = X2js.xml_str2json(data);
                        var item = data.resultWrapper.item;
                        if (item !== undefined) {
                            if (!Array.isArray(item)) {
                                result = new Array(item);
                            } else {
                                result = item;
                            }
                        }
                        return result;
                    }
                });
        }

        function getItem() {

        }

        function createItem(invoiceId, item) {
            return $http.post(itemsUrl.format(invoiceId), item, {
                withCredentials: true,
                transformRequest: function (object) {
                    object._id = 0;
                    var itemToSave = {item: object};
                    var itemXmlString = X2js.json2xml_str(itemToSave);
                    var txt2 = itemXmlString.slice(0, 5) + ' xmlns="http://www.ftn.uns.ac.rs/xmlbsep/company/domain"' + itemXmlString.slice(5);
                    console.log(txt2);
                    return txt2;
                },
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': "application/xml, text/plain, "
                }
            }).success(function (data) {
                toastr.info("Item has been created.", "Successfully created");
            }).error(function (data) {
                toastr.info("Oups, something went wrong! \nDetails: " + data, "Error");
            });
        }

        function updateItem(invoiceId, item) {
            return $http.put(itemsUrl.format(invoiceId) + "/" + item._id, item, {
                withCredentials: true,
                transformRequest: function (item) {
                    item._xmlns = "http://www.ftn.uns.ac.rs/xmlbsep/company/domain";
                    item = {item: item};
                    console.log(item);
                    var itemXmlString = X2js.json2xml_str(item);
                    console.log(itemXmlString);
                    return itemXmlString;
                },
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': "application/xml, text/plain, "
                }
            }).success(function (data) {
                toastr.info("Item has been updated.", "Successfully updated");
            }).error(function (data, status) {
                toastr.info("Oups, something went wrong! \nDetails: " + status, "Error");
            });
        }

        function deleteItem(invoiceId, itemId) {
            return $http.delete(itemsUrl.format(invoiceId) + "/" + itemId, {
                withCredentials: true
            }).success(function (data) {
                toastr.info("Item has been deleted.", "Successfully Deleted");
            }).error(function (data) {
                toastr.info("Oups, something went wrong! \nDetails: " + data, "Error");
            });
        }*/

    }
})();