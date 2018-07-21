var express = require('express');
var app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render('home');
});


app.get('/fallinlovewith/:thing', function (req, res) {
    var thing = req.params.thing;
    res.render('love', {thingVar: thing});
});

app.get("/posts", function(req, res){
   var posts = [
       {title:"post1", author: "Susy"},
       {title:"My pet", author: "Charlie"},
       {title:"Can you believe this pomsky?", author: "Colt"}
   ];
   res.render("posts",{posts: posts});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('EJSExample app listening at http://%s:%s', host, port);
});