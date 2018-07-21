var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
    {
        naame: "Cloud's Rest",
        imaage:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=500&q=60",
        description:"In the sky"
    },
    {
        naame: "Lake Lake",
        imaage:"https://images.unsplash.com/photo-1523497873958-8639c94677f2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b14f98986d5a26bbdebf7bcad17d9976&auto=format&fit=crop&w=500&q=60",
        description:"Peaceful lake"
    },
    {
        naame: "Light",
        imaage:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=500&q=60",
        description:"There is some light"
    },
    {
        naame: "星空",
        imaage:"https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e24a27e43e4985c7852a3bdea697da7&auto=format&fit=crop&w=500&q=60",
        description:"Under the sky"
    }
]

function seedDB(){

    //Remove all campgrounds;
    Campground.remove({}, function (err) {
        if(err){
            console.log(err);
        }
        console.log("remove campground");
        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text:"This place is great, but no internet",
                            author:"homer"
                        },function (err,comment) {
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;