var express = require("express");
var app = express();

//"/"->"Hi there!"
app.get("/", function(req, ress){
   ress.sent("Hi there!");
});
//"/bye"->"Goodbye!"

//Tell Express to listen for requests(start server)
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});