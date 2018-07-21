var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");


/*
mongod(F:\Program Files\MongoDB\Server\4.0\bin,  ./mongod to open)
mongo(open another shell, ./mongo  to connect, ^c to quit)
help
show dbs
use
insert
find
update
remove

CRUD= "create read update($set) destroy"
* */


mongoose.connect("mongodb://localhost:27017/yelp_camp_2", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    naame: String,
    imaage: String,
    description: String
});
var Campground = mongoose.model("Campground",campgroundSchema);

/*Campground.create({
    naame: "Granite hill",
    imaage:"https://images.unsplash.com/photo-1495732140334-940c8108c072?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3fc25fea0b355fab82317afde8f9235e&auto=format&fit=crop&w=500&q=60",
    description:"This is a huge granite hill, no bathrooms, no water. "
}, function (err, campground) {
    if(err){
        console.log(err);
    }else{
        console.log("NEWLY CREATED CAMPGROUND!");
        console.log(campground);
    }
});*/

/*
var campgrounds = [
    {naame: "CYY", imaage:"https://images.unsplash.com/photo-1495732140334-940c8108c072?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3fc25fea0b355fab82317afde8f9235e&auto=format&fit=crop&w=500&q=60"},
    {naame: "HSK", imaage:"https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=053f91dd9aee1cc7bc5cafca28cb625c&auto=format&fit=crop&w=500&q=60"},
    {naame: "SG", imaage:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=500&q=60"},
    {naame: "CYY", imaage:"https://images.unsplash.com/photo-1507084479072-f6ebe14beb68?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c43aabf6f1d7686af3b05a8a47071f68&auto=format&fit=crop&w=500&q=60"},
    {naame: "HSK", imaage:"https://images.unsplash.com/photo-1480779735619-f73b30fdc062?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c472a8a962788aaa16003743a2b436a0&auto=format&fit=crop&w=500&q=60"},
    {naame: "SG", imaage:"https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=500&q=60"},
    {naame: "CYY", imaage:"https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e24a27e43e4985c7852a3bdea697da7&auto=format&fit=crop&w=500&q=60"},
    {naame: "HSK", imaage:"https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aaf08554d638e2690a4383bf1c632d93&auto=format&fit=crop&w=500&q=60"},
    {naame: "SG", imaage:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=500&q=60"}
];
*/

//
app.get("/", function (req, res) {
   res.render("landing");
});


//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res) {
    //Get all campgrounds from DB
    Campground.find({},function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("index",{Campgrounds: allCampgrounds});
        }
    })
});

//CREATE - add new campground to database.
app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds database;
    var namee = req.body.naame;
    var imagee = req.body.imaage;
    var desc = req.body.description;
    var newCampground = {naame:namee, imaage:imagee, description:desc};

    //Create  a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if(err){
            console.log(err);
        }else{
            //redirect to campgounds page!
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function (req, res) {
    res.render("new");
});

//SHOW - Shows info about each campground
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
   console.log("YelpCamp Server is listening!");
});