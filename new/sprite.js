var 

up,
left,
down,
right

function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, this.width, this.height);
};

function initSprites(img) {
	mid = new Sprite(img, 40, 40, 20, 20);
	up = new Sprite(img, 20, 0, 20, 20 );
	left = new Sprite( img, 0, 20, 20, 20 );
	down = new Sprite( img, 20, 40, 20, 20 );
	right = new Sprite( img, 40, 20, 20, 20 );

	mid2 = new Sprite(img, 100, 40, 20, 20);
	up2 = new Sprite(img, 80, 0, 20, 20 );
	left2 = new Sprite( img, 60, 20, 20, 20 );
	down2 = new Sprite( img, 80, 40, 20, 20 );
	right2 = new Sprite( img, 100, 20, 20, 20 );	
}