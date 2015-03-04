var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
ctx.fillRect(0,0,150,75);
ctx.font = "30px Times";
ctx.fillText("Hello World",10,50);

function startLoop() {
	while (true) {
		update();
		draw();
	}
}



function update() {
	
}

function draw() {
	
}