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

var keycodes1 = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var keycodes2 = {
	UP: 87,
	DOWN: 83,
	LEFT: 65,
	RIGHT: 68
};

var pressed = {};
var background;
var players = [];

function Player(x, y, width, height, player, movespeed, img) {
	this.init(x, y, width, height, player, movespeed, img);
}

Player.prototype = {
	init: function (x, y, width, height, player, movespeed, img) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.movespeed = movespeed;
		this.direction = directions.NONE;
		this.player = player;

		// if (player == 1) {
		// 	mid = new Sprite(img, 40, 0, 20, 20);
		// 	up = new Sprite(img, 20, 0, 20, 20 );
		// 	left = new Sprite( img, 0, 20, 20, 20 );
		// 	down = new Sprite( img, 20, 40, 20, 20 );
		// 	right = new Sprite( img, 40, 20, 20, 20 );
		// } else if (player == 2) {
		// 	mid = new Sprite(img, 100, 0, 20, 20);
		// 	up = new Sprite(img, 80, 0, 20, 20 );
		// 	left = new Sprite( img, 60, 20, 20, 20 );
		// 	down = new Sprite( img, 80, 40, 20, 20 );
		// 	right = new Sprite( img, 100, 20, 20, 20 );
		// }
	},

	draw: function(ctx) {
		if (this.player == 1) {
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
		} else if (this.player == 2) {
			switch(this.direction) {
			case directions.NONE:
				mid2.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			case directions.UP:
				up2.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			case directions.DOWN:
				down2.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			case directions.LEFT:
				left2.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			case directions.RIGHT:
				right2.draw( ctx, this.x-this.width/2, this.y-this.height/2);
				break;
			}
		}
	},

	update: function(input) {
		var x_move = 0;
		var y_move = 0;
		this.direction = directions.NONE;

		if (this.player == 1) {
			_keycodes = keycodes1;
		} else if (this.player == 2) {
			_keycodes = keycodes2;
		}

		if (input[_keycodes.UP]) {
			y_move = -1;
			this.direction = directions.UP;
		} else if (input[_keycodes.DOWN]) {
			y_move = 1;
			this.direction = directions.DOWN;
		}

		if (input[_keycodes.LEFT]) {
			x_move = -1;
			this.direction = directions.LEFT;
		} else if (input[_keycodes.RIGHT]) {
			x_move = 1;
			this.direction = directions.RIGHT;
		}

		var future_x = this.x + x_move * this.movespeed;
		var future_y = this.y + y_move * this.movespeed;

		if ((future_x - this.width/2) < 0) {
			this.x = this.width/2;
		} else {
			this.x += x_move * this.movespeed;	
		}

		if ((future_x + this.width/2) > 320) {
			this.x = 320 - this.width/2;
		} else {
			this.x += x_move * this.movespeed;	
		}

		if ((future_y - this.width/2) < 0) {
			this.y = this.width/2;
		} else {
			this.y += y_move * this.movespeed;	
		}

		if ((future_y + this.width/2) > 480) {
			this.y = 480 - this.width/2;
		} else {
			this.y += y_move * this.movespeed;	
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

	document.onkeypressed=function(e) {
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
	
	var player1 = new Player(10, 10, 20, 20, 1, 2, img);
	var player2 = new Player(40, 40, 20, 20, 2, 2, img);

	players.push(player1);
	players.push(player2);
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
	// pressed = {};
}

function render()
{
	ctx.drawImage(background, 0, 0);
	for (var i = 0; i < players.length; i++) {
		players[i].draw(ctx);
	};
}

main();