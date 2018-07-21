console.log("connected"); 

var button = document.querySelector("button");//it is not ".button"!
var isPurple = false;

button.addEventListener("click", function(){
/*	if(isPurple){
		document.body.style.background = "white";
	}
	else{
		document.body.style.background = "purple";
		isPurple = true;
	}
	isPurple = !isPurple;*/
	document.body.classList.toggle("purple");//note: 加在body.
});
