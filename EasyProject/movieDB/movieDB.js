console.log("connected");

var movies = [
    {
	 title: "superstar",
	 hasWatched:true,
	 rating:5
    },
    {
	 title:"frozen",
     hasWatched:false,
     rating:4.5	
	}
	
]

/*movies.forEach(function(movie){
	var res = "You have ";
	if(movie.hasWatched){
		res += "watched ";
	}else{
		res += "not seen ";
	}

	res += "\""+movie.title+ "\" -  ";
	res += movie.rating + " stars";
	console.log(res);
});*/

function buildStr(movie){
	var res = "You have ";
	if(movie.hasWatched){
		res += "watched ";
	}else{
		res += "not seen ";
	}

	res += "\""+movie.title+ "\" -  ";
	res += movie.rating + " stars";
	console.log(res);
}

movies.forEach(function(movie){
	console.log(buildStr(movie)); 
})