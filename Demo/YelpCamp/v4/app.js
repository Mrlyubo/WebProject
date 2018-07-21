var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground");
    seedDB     = require("./seeds")
    Comment    = require("./models/comment");


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

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp_3", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


//ROOT ROUTES
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
            res.render("campgrounds/index",{Campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
});

//POST - 
app.post("/campgrounds/:id/comments", function (req,res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function (err, comment) {
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});


//SHOW - Shows info about each campground
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//=========================
//COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", function (req,res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    })
});


//=========================

app.listen(3000, function(){
   console.log("YelpCamp Server is listening!");
});