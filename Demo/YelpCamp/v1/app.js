var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {naame: "CYY", imaage:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f1c77fa0eab0b9_340.jpg"},
    {naame: "HSK", imaage:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c77fa0eab0b9_340.jpg"},
    {naame: "SG", imaage:"https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144294f6c77ea0e8b4_340.jpg"},
    {naame: "CYY", imaage:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f1c77fa0eab0b9_340.jpg"},
    {naame: "HSK", imaage:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c77fa0eab0b9_340.jpg"},
    {naame: "SG", imaage:"https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144294f6c77ea0e8b4_340.jpg"},
    {naame: "CYY", imaage:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f1c77fa0eab0b9_340.jpg"},
    {naame: "HSK", imaage:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f1c77fa0eab0b9_340.jpg"},
    {naame: "SG", imaage:"https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144294f6c77ea0e8b4_340.jpg"}
];


app.get("/", function (req, res) {
   res.render("landing");
});

app.get("/campgrounds", function(req,res) {

   res.render("campgrounds",{Campgrounds: campgrounds});

});

app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array;
    var namee = req.body.naame;
    var imagee = req.body.imaage;
    var newCampground = {naame:namee, imaage:imagee};
    campgrounds.push(newCampground);
    //redirect to campgounds page!
    res.redirect("/campgrounds");

});

app.get('/campgrounds/new', function (req, res) {
    res.render("new");
});

app.listen(3000, function(){
   console.log("YelpCamp Server is listening!");
});