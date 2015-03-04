var

canvas,
ctx,
width,
height

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

}

function render()
{
	up.draw( ctx, 100, 0 );
	left.draw( ctx, 10, 10 );
	down.draw( ctx, 15, 180 );
	right.draw( ctx, 134, 10 );

}

main();
