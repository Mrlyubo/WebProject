var comments = {};
comments.data = ["Good","Nice!"];


function print(arr){
	arr.forEach(function(el){
		console.log(el);
	});
}

comments.print = function(){
	this.data.forEach(function(e){
		console.log(e);
	});
}