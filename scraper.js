var needle = require('needle');
var cheerio = require('cheerio');
var tress = require('tress');
var resolve = require('url').resolve;
var sqlite3 = require('sqlite3').verbose();

var startURL = 'https://www.buzzbuzzhome.com/ca/map/vancouver-bc/new-homes';
var results = [];
var q = tress(work);
q.drain = done;
start();

function start(){
    needle.get(startURL, function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $('.city-dev-name>a').each(function(){
            q.push(resolve(startURL, $(this).attr('href')));
        });
    });
}

function work(url, cb){
    needle.get(url, function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        results.push([
            url,
            $('h1').text().trim(),
            $('.price-info').eq(0).text().replace(/\s+/g, ' ').trim()
        ]);
        cb();
    });
}

function done(){
	
	console.log(results);

}