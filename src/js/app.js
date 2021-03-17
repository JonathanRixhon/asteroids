import ship from './ship'
import Asteroid from './Asteroid'
import collisionDetector from './collisionDetector'
import garbageManager from './garbageManager'
import { detect } from 'async'
const main = {
	canvasElt: null,
	canvasEltDimensions: { width: 640, height: 480 },
	ctx: null,
	requestId: 0,
	//Asteroid
	asteroids: [],
	asteroidCount: 2,

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
		//test verouillage à 60 fps pour les écrans +60fps

		//animation loop
		this.requestId = window.requestAnimationFrame(timestamp => {
			console.log(timestamp)
			this.animate()
		})
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
		//detection les collisions
		if (ship.bullets.length && this.asteroids.length) {
			const collidingPair = collisionDetector.detectBulletAsteroid(
				this.ctx,
				ship,
				this.asteroids
			)
			if (collidingPair) {
				garbageManager.remove(collidingPair.bullet, ship.bullets)
				if (collidingPair.asteroid.size > 10) {
					this.generateSmallAsteroids(collidingPair.asteroid)
				}
				garbageManager.remove(collidingPair.asteroid, this.asteroids)
			}
		}
		if (ship && this.asteroids.length) {
			if (
				collisionDetector.detectShipAsteroid(this.ctx, ship, this.asteroids)
			) {
				window.cancelAnimationFrame(this.requestId)
			}
		}
	},
	generateSmallAsteroids(parentAsteroid) {
		const childrenCount = Math.floor(2 + Math.random() * 3)
		for (let i = 0; i < childrenCount; i++) {
			this.asteroids.push(
				new Asteroid(this.canvasElt, this.ctx, parentAsteroid)
			)
		}
	},
}
main.init()
