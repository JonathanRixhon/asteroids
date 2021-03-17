import Vector from './Vector'
import Bullet from './Bullet'
import controller from './controller'

const ship = {
	size: 20,
	speed: null,
	location: null,
	acceleration: null,
	heading: 0,
	path: null,
	//Bullets
	bulletTimer: -1,
	bulletTimerTreshold: 10,
	bullets: [],
	//dom elt
	canvasElt: null,
	ctx: null,

	init(canvasElt, ctx) {
		//initialisation des params
		this.canvasElt = canvasElt
		this.ctx = ctx

		//Init du controlleur
		controller.init()

		//assignation
		this.location = new Vector(
			this.canvasElt.width / 2,
			this.canvasElt.height / 2
		)
		this.speed = new Vector(0, 0)
		this.path = new Path2D()
		this.shape = [
			0,
			(-1.5 * this.size) / 2,
			this.size / 2,
			0.5 + (1.5 / 2) * this.size,
			-this.size / 2,
			0.5 + (1.5 / 2) * this.size,
		]
		this.createPath()
	},

	createPath() {
		this.path.moveTo(this.shape[0], this.shape[1])
		this.path.lineTo(this.shape[2], this.shape[3])
		this.path.lineTo(this.shape[4], this.shape[5])
		this.path.closePath()
	},

	update() {
		//speed increase
		this.checkKeys()
		//apply speed to location and deceleration
		this.speed.multiply(0.97)
		this.location.add(this.speed)

		//border collision detection
		this.checkEdges()

		this.draw()
	},
	checkKeys() {
		controller.activeKeys.forEach(activeKey => {
			if (activeKey === 'ArrowUp') {
				this.acceleration = Vector.fromAngle(this.heading)
				this.speed.add(this.acceleration)
			} else if (activeKey === 'ArrowRight' || activeKey === 'ArrowLeft') {
				this.updateHeading(controller.keys[activeKey])
			} else if (activeKey === ' ') {
				this.bulletTimer++
				if (!(this.bulletTimer % this.bulletTimerTreshold)) {
					this.bullets.push(new Bullet())
				}
			} else {
				this.bulletTimer = -1
			}
		})
	},
	checkEdges() {
		if (this.location.x > this.canvasElt.width + this.size) {
			this.location.x = -this.size
		}
		if (this.location.x < -this.size) {
			this.location.x = this.canvasElt.width + this.size
		}
		if (this.location.y > this.canvasElt.height + this.size) {
			this.location.y = -this.size
		}
		if (this.location.y < -this.size) {
			this.location.y = this.canvasElt.height + this.size
		}
	},

	updateHeading(angle) {
		this.heading += angle
	},
	draw() {
		this.ctx.save()
		//position
		this.ctx.translate(this.location.x, this.location.y)
		this.ctx.rotate(this.heading)
		this.ctx.stroke(this.path)
		this.ctx.restore()
	},
}

export default ship
