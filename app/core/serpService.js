'use strict';

var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var sleep = require('sleep');
request = request.defaults({jar: true});

function SerpTracker(keyword, domain, callback, url) {
    this.keyword = keyword;
    this.domain = domain;
    this.callback = callback;
    this.url = url;
    this._start = 0;
    this.numberOfResults = 50;
}

SerpTracker.prototype = {
    constructor: SerpTracker,
    track: function () {
        this._request();
    },
    _parseDom: function (html) {

    },
    _request: function () {
        var options = {
            url: util.format(this.url, this.numberOfResults, this._start),
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

        var self = this;
        var requestCallback = function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var result = self._parseDom(body);
                console.log(result);

                if (Object.keys(result).length) {
                    console.log('has property');
                    self.callback({result: result});
                } else {
                    console.log('has no property');
                    console.log(self._start + self.numberOfResults);
                    if ((self._start + self.numberOfResults) >= 50) {
                        result = {
                            keyword: self.keyword,
                            domain: self.domain,
                            position: 0
                        };
                        self.callback({result: result});
                        return;
                    }
                    sleep.sleep(5);

                    self._start += self.numberOfResults;
                    self._request();
                }
            } else {
                console.log('error ' + error);
                console.log('error ' + response.statusCode);
                if (body.indexOf('This page appears when Google automatically detects') > -1) {
                    self.callback({result: {error: 'Requires captcha confirmation', code: response.statusCode}});
                } else {
                    self.callback({result: {error: error, code: response.statusCode}});
                }
            }
        };

        request(options, requestCallback);
    }

};

//////
function Google(keyword, domain, callback) {
    var searchUrl = 'https://www.google.com/search?ie=UTF-8&q=%s&oq=%s&hl=en&site=webhp&num=%d&start=%d';
    var url = util.format(searchUrl, encodeURIComponent(keyword), encodeURIComponent(keyword));
    SerpTracker.call(this, keyword, domain, callback, url);
    console.log(this.numberOfResults);
}

Google.prototype = Object.create(SerpTracker.prototype);
Google.prototype.constructor = Google;
Google.prototype._parseDom = function (html) {
    var result = {};
    var $ = cheerio.load(html);
    var self = this; // this as second arg for map isn't working :S
    $('.r').map(function (i, div) {
        var url = $(div).find('a').attr('href');
        if ((url.indexOf(self.domain) > -1) && !result.position) {
            result = {
                keyword: self.keyword,
                domain: self.domain,
                position: self._start + i
            };
            console.log('FOUND');
            console.log(result);
        }
    });
    return result;
};

////////
function Bing(keyword, domain, callback) {
    SerpTracker.call(this, keyword, domain, callback, '');
}
Bing.prototype = Object.create(SerpTracker.prototype);
Bing.prototype.constructor = Bing;

////////
function Yahoo(keyword, domain, callback) {
    SerpTracker.call(this, keyword, domain, callback, '');
}
Yahoo.prototype = Object.create(Yahoo.prototype);
Yahoo.prototype.constructor = Yahoo;

var trackers = {
    Google: Google,
    Bing: Bing,
    Yahoo: Yahoo
};

module.exports = trackers;