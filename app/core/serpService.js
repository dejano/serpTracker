var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var sleep = require('sleep');
request = request.defaults({jar: true})
module.exports = new SerpTracker();

function SerpTracker() {
    const domClass = '.r';
    var keyword;
    var domain;
    var numberOfResults = 10;
    var start = 0;
    var searchUrl = 'https://www.google.com/search?ie=UTF-8&q=%s&oq=%s&hl=en&site=webhp&start=%d';
    var callback;
    var self = this;


    var methods = {
        checkSerp: init
    };

    return methods;
    //////////////

    function init(keyword, domain, callback) {
        self.domain = normalizeDomain(domain);
        self.keyword = keyword;
        self.callback = callback;

        httpGet(start);
    }

    function httpGet(start) {
        var options = {
            url: util.format(util.format(searchUrl,searchUrl, encodeURIComponent(self.keyword), start)),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36',
                //'User-Agent': 'requests',
                'Host': 'www.google.com',
                'Connection': 'keep-alive',
                'Cache-Control': 'max-age=0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Referrer': 'https://www.google.com/',
                'Accept-Language': 'en-us;q=0.8,en;q=0.3',
                'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
            }
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = parseDom(body);
                if (!Object.keys(result).length) {
                    console.log('has property');
                    console.log(result);
                    self.callback(result);
                } else {
                    console.log('has no property');
                    sleep.sleep(10);
                    httpGet(start + numberOfResults);
                }
            } else {
                console.log('error ' + error);
                console.log('error ' + response.statusCode);
                if (body.indexOf('This page appears when Google automatically detects') > -1) {
                    self.callback($.html());
                } else {
                    self.callback(body);
                }
            }
        });
    }

    function parseDom(html) {
        var result = {};
        $ = cheerio.load(html);
        $(domClass).map(function (i, foo) {
            var url = $(foo).find('a').attr('href');
            url = url.split('/url?q=')[1].split('&sa=U&ved=')[0];

            if (url === self.domain) {
                result = {
                    keyword: self.keyword,
                    domain: self.domain,
                    position: self.start + i
                };
                //return false;
            }
        });
        return result;
    }

    function normalizeDomain(domain) {
        return domain;
    }
}