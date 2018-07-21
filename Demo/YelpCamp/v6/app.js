var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground");
    seedDB        = require("./seeds")
    User          = require("./models/user"),
    Comment       = require("./models/comment");

    var commentRoutes = require("./routes/comments")

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


mongoose.connect("mongodb://localhost:27017/yelp_camp_6", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
seedDB();


//PASSPORT CONFIGURATION
app.use(require("express-session")(
    {
        secret: "Once again BaoBao wins cutest dog",
        resave: false,
        saveUninitialized: false
    }
));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//add currentUser to every ROUTES
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//ROOT ROUTES
app.get("/", function (req, res) {
   res.render("landing");
});


//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res) {
    //Get all campgrounds from DB
    console.log(req.user);
    Campground.find({},function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{Campgrounds: allCampgrounds/*, currentUser: req.user*/});
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
app.post("/campgrounds/:id/comments",isLoggedIn, function (req,res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function  (err, campground){
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
//=========================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req,res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    })
});


//=========================
//AUTH ROUTE
//========================

//show register form
app.get("/register", function (req,res) {
    res.render("register");
});
//handle sign up logic
app.post("/register", function (req,res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

//show login form
app.get("/login", function (req,res) {
    res.render("login");
})

//handling login logic
//app.post("/login",middleware, callback)
app.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function (req,res) {
});

//logout route
app.get("/logout", function (req,res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
   console.log("YelpCamp Server is listening!");
});