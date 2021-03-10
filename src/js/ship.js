const ship = {
	size: 20,
	speed: { x: 1, y: 1 },
	location: null,
	canvasElt: null,
	ctx: null,
	init(canvasElt, ctx) {
		//initialisation des params
		this.canvasElt = canvasElt
		this.ctx = ctx
		//assignation
		this.location = {
			x: this.canvasElt.width / 2,
			y: this.canvasElt.height / 2,
		}
	},
	update() {
		this.location.x += this.speed.x
		this.location.y += this.speed.y
		//border collision detection
		if (this.location.x > this.canvasElt.width + 1.5 * this.size) {
			this.location.x = -1.5 * this.size
		}
		if (this.location.y > this.canvasElt.height + 1.5 * this.size) {
			this.location.y = -1.5 * this.size
		}
		this.draw()
	},
	draw() {
		this.ctx.save()
		//position
		this.ctx.translate(this.location.x, this.location.y)
		//dessin
		this.ctx.beginPath()

		this.ctx.moveTo(0, (-1.5 * this.size) / 2)
		this.ctx.lineTo(this.size / 2, 0.5 + (1.5 / 2) * this.size)
		this.ctx.lineTo(-this.size / 2, 0.5 + (1.5 / 2) * this.size)
		this.ctx.closePath()
		this.ctx.stroke()
		this.ctx.restore()
	},
}

export default ship
