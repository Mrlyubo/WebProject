var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cap_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
   name:String,
   age: Number,
   temperament:String
});

var Cat = mongoose.model("Cat",catSchema);

//add a new cat to the DB
/*var george = new Cat({
    name:"Mrs. NOrris",
    age:7,
    temperament:"Evil"
});

george.save(function(err, cat) {
    if (err) {
        console.log("SOMETHING WENT WRONG!");
        console.log(cat);
    }else{
        console.log("WE JUST SAVED A CAT TO THE DB:");
        console.log(cat);
    }
});*/
Cat.create({
   name:"Snow White",
   age:15,
   temperament:"Bland"
}, function (err, cat) {
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});

Cat.find({},function (err, cats) {
    if(err){
        console.log("OH NO, ERROR!")
        console.log(err);
    }else{
        console.log("ATT THE CATS");
        console.log(cats);
    }
});

//retrieve all cats from the DB

