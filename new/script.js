var

canvas,
ctx,
width,
height;

var players = [];

function Player(x, y, width, height) {
	this.init(x, y, width, height);
}

Player.prototype = {
	init: function (x, y, width, height, player1, img) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		up = new Sprite(img, 20+(player1)*60, 0, 20, 20 );
		left = new Sprite( img, 0+(player1)*60, 20, 20, 20 );
		down = new Sprite( img, 20+(player1)*60, 40, 20, 20 );
		right = new Sprite( img, 40+(player1)*60, 20, 20, 20 );
	},

	draw: function(ctx) {
		up.draw( ctx, this.x-this.width/2, this.y-this.height/2);
	},

	update: function() {

	}
}

function gameloop() {
	update();
	render();
}

function main()
{
	//setting up the canvas
	canvas = document.createElement( "canvas" );

	width = window.innerWidth;
	height = window.innerHeight;

	//if not on the phone
	if( width >= 500 )
	{
		width = 320;
		height = 480;
		canvas.style.border = "1px solid #000";
	}

	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext( "2d" );

	document.body.appendChild( canvas );

	//loading images
	var img = new Image();

	img.onload = function(){
		initSprites( this );
		run();
	}	

	img.src = "resources/arrows.png";
	
	players.push(new Player(10, 10, 20, 20, img));
}

function run()
{
	var loop = function() {
		update();
		render();
		window.requestAnimationFrame( loop, canvas );
	}
	window.requestAnimationFrame( loop, canvas );
}

function update()
{
	for (var i = 0; i < players.length; i++) {
		players[i].update();
	};
}

function render()
{
	for (var i = 0; i < players.length; i++) {
		players[i].draw(ctx);
	};
}

main();