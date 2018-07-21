var express = require('express');
var app = express();
var request = require('request');
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("search");
});

app.get('/results', function (req,res) {
    var query = req.query.yourInputSearchTerm;
    var url = "https://api.douban.com/v2/movie/search?q="+query;

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results",{ddata: data});
        }
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Movie app listening at http://%s:%s', host, port);
});