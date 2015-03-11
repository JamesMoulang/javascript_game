var

canvas,
ctx,
width,
height;

var directions = {
	NONE: -1,
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

var keycodes = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var pressed = {};
var background;
var players = [];

function Player(x, y, width, height, player1, movespeed, img) {
	this.init(x, y, width, height, player1, movespeed, img);
}

Player.prototype = {
	init: function (x, y, width, height, player1, movespeed, img) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.movespeed = movespeed;

		this.direction = directions.NONE;

		mid = new Sprite(img, 40+(player1)*60, 0, 20, 20);
		up = new Sprite(img, 20+(player1)*60, 0, 20, 20 );
		left = new Sprite( img, 0+(player1)*60, 20, 20, 20 );
		down = new Sprite( img, 20+(player1)*60, 40, 20, 20 );
		right = new Sprite( img, 40+(player1)*60, 20, 20, 20 );
	},

	draw: function(ctx) {
		switch(this.direction) {
			case directions.NONE:
				mid.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			case directions.UP:
				up.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			case directions.DOWN:
				down.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			case directions.LEFT:
				left.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			case directions.RIGHT:
				right.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
		}
		
	},

	update: function(input) {
		if (input[keycodes.UP]) {
			this.direction = directions.UP;
			this.y -= this.movespeed;
		} else if (input[keycodes.DOWN]) {
			this.direction = directions.DOWN;
			this.y += this.movespeed;
		} else if (input[keycodes.LEFT]) {
			this.direction = directions.LEFT;
			this.x -= this.movespeed;
		} else if (input[keycodes.RIGHT]) {
			this.direction = directions.RIGHT;
			this.x += this.movespeed;
		} else {
			this.direction = directions.NONE;
		}
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

	document.onkeydown=function(e) {
		e = e || window.event;
		pressed[e.keyCode] = true;
	}

	document.onkeyup=function(e) {
		e = e || window.event;
		delete pressed[e.keyCode];
	}

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

	background = new Image();
	background.src = "resources/background.png";
	
	players.push(new Player(10, 10, 20, 20, 0, 10, img));
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
		players[i].update(pressed);
	};
	pressed = {};
}

function render()
{
	ctx.drawImage(background, 0, 0);
	for (var i = 0; i < players.length; i++) {
		players[i].draw(ctx);
	};
}

main();