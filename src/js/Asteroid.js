import asteroidShapes from './asteroidShapes'
import Vector from './Vector'
export default class Asteroid {
	constructor(canvasElt, ctx, parent = null) {
		//dom elt
		this.canvasElt = canvasElt
		this.ctx = ctx
		//Génération conditionnelle en fonction de si c'est un enfant ou pas
		if (!parent) {
			this.rotationSpeed = Math.random() / 30
			this.size = 10 + Math.random() * 5
			this.location = new Vector(
				Math.floor(Math.random() * this.canvasElt.width),
				Math.floor(Math.random() * this.canvasElt.height)
			)
		} else {
			this.rotationSpeed = parent.rotationSpeed * 2
			this.size = parent.size / 2
			this.location = new Vector(parent.location.x, parent.location.y)
		}
		//initialisation var de position et deplacement
		this.heading = Math.random() * Math.PI * 2
		this.speed = new Vector(0, 0)
		this.acceleration = new Vector(this.heading, 2 + Math.random() * 2)
		this.speed.add(this.acceleration)
		//rotation
		this.rotation = 0
		//preparing asterdoid
		const asCount = asteroidShapes.length
		const i = Math.floor(Math.random() * asCount)
		//path
		this.shape = asteroidShapes[i]
		this.path = new Path2D()
		this.createPath()
	}
	createPath() {
		this.path.moveTo(this.shape[0] * this.size, this.shape[1] * this.size)
		//auto draw
		let i = 2
		while (i <= this.shape.length) {
			this.path.lineTo(this.shape[i] * this.size, this.shape[++i] * this.size)
			i++
		}
		//
		this.path.closePath()
	}
	draw() {
		this.ctx.save()
		//position
		this.ctx.translate(this.location.x, this.location.y)
		this.ctx.rotate(this.rotation)
		//dessin

		this.ctx.fill(this.path)
		this.ctx.restore()
	}
	update() {
		this.location.add(this.speed)
		this.rotation += this.rotationSpeed
		this.checkEdges()
		this.draw()
	}
	checkEdges() {
		const offset = 50
		if (this.location.x > this.canvasElt.width + offset) {
			this.location.x = -offset
		}
		if (this.location.x < -offset) {
			this.location.x = this.canvasElt.width + offset
		}
		if (this.location.y > this.canvasElt.height + offset) {
			this.location.y = -offset
		}
		if (this.location.y < -offset) {
			this.location.y = this.canvasElt.height + offset
		}
	}
}
