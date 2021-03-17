import Vector from './Vector'
import ship from './ship'
import garbageManager from './garbageManager'
export default class Bullet {
	constructor() {
		this.ctx = ship.ctx
		this.location = new Vector(ship.location.x, ship.location.y)
		this.heading = ship.heading
		this.size = 4
		this.speed = new Vector(ship.speed.x, ship.speed.y)
		this.acceleration = Vector.fromAngle(this.heading, 10)
		this.speed.add(this.acceleration)
	}

	update() {
		this.location.add(this.speed)
		this.draw()
		//deleting bullet if not in the screen
		this.checkEdges()
	}

	checkEdges() {
		if (
			this.location.x > ship.canvasElt.width + this.size ||
			this.location.x < 0 ||
			this.location.y > ship.canvasElt.height + this.size ||
			this.location.y < 0
		) {
			garbageManager.remove(this, ship.bullets)
		}
	}

	draw() {
		this.ctx.save()
		//position
		this.ctx.translate(this.location.x, this.location.y)
		this.ctx.rotate(this.heading)
		//drawing the bullet
		this.ctx.fillRect(-this.size / 2, -this.size * 3, this.size, this.size)
		this.ctx.restore()
	}
}
