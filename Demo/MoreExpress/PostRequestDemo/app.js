var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
var friendsss = ["Tony!", "Miranda!", "Justin!", "Pierre!", "Lily!"];
app.set("view engine", "ejs");

app.get("/",function (req, res) {
    res.render("home");
});

//"friends"
app.get("/friends", function(req, res){

    res.render("friends", {fffriends: friendsss});
});

app.post("/addfriend", function (req, res) {
    var newFriend = req.body.newfriend;
    friendsss.push(newFriend);
    res.redirect("/friends");
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('PostRequest app listening at http://%s:%s', host, port);
});