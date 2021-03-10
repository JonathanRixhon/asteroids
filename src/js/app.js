import ship from './ship'
const animation = {
	canvasElt: null,
	canvasEltDimensions: { width: 640, height: 480 },
	ctx: null,

	//Asteroid
	asteroidSize: 40,
	init() {
		//creating canvasElt
		this.canvasElt = document.createElement('canvasElt')
		this.canvasElt.width = canvasEltDimensions.width
		this.canvasElt.height = canvasEltDimensions.height
		//replacing canvasElt
		document.body.removeChild(document.getElementById('asteroids'))
		document.body.insertAdjacentElement('afterbegin', this.canvasElt)
		this.ctx = this.canvasElt.getContext('2d')
		//Preparation
		this.ctx.strokeStyle = '#fff'
		ship.init(this.canvasElt, this.ctx)
		//Animation
		this.animate()
	},
	animate() {
		//clear the canvasElt
		this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
		//Update coordinates
		ship.update()
		//animation loop
		window.requestAnimationFrame(() => {
			this.animate()
		})
	},

	draw() {
		//asteroids
		this.asteroidDraw()
	},

	asteroidDraw() {
		this.ctx.save()
		//position
		this.ctx.translate(100, 100)
		//dessin
		this.ctx.strokeRect(
			-this.asteroidSize / 2,
			-this.asteroidSize / 2,
			this.asteroidSize,
			this.asteroidSize
		)
		this.ctx.restore()
	},
}
animation.init()
