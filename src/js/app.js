import ship from './ship'
import Asteroid from './Asteroid'
import asteroidShapes from './asteroidShapes'
const main = {
	canvasElt: null,
	canvasEltDimensions: { width: 640, height: 480 },
	ctx: null,
	animationFrame: null,
	//Asteroid
	asteroids: [],
	asteroidCount: 4,

	init() {
		//creating canvasElt
		this.canvasElt = document.createElement('canvas')
		this.canvasElt.width = this.canvasEltDimensions.width
		this.canvasElt.height = this.canvasEltDimensions.height
		//replacing canvasElt
		document.body.removeChild(document.getElementById('asteroids'))
		document.body.insertAdjacentElement('afterbegin', this.canvasElt)
		//Preparation
		this.ctx = this.canvasElt.getContext('2d')
		this.ctx.strokeStyle = '#fff'
		this.ctx.fillStyle = '#fff'
		//initialisations
		for (let i = 0; i < this.asteroidCount; i++) {
			this.asteroids.push(new Asteroid(this.canvasElt, this.ctx))
		}

		ship.init(this.canvasElt, this.ctx)
		//Animation
		this.animate()
	},

	animate() {
		//clear the canvasElt
		this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
		//Update coordinates
		ship.update()

		ship.bullets.forEach(bullet => {
			bullet.update()
		})

		this.asteroids.forEach(asteroid => {
			asteroid.update()
		})
		//animation loop
		window.requestAnimationFrame(() => {
			this.animate()
		})
	},
}
main.init()
