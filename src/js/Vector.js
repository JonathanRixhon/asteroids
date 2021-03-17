export default class Vector {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	add(vector) {
		this.x += vector.x
		this.y += vector.y
	}

	multiply(factor) {
		this.x *= factor
		this.y *= factor
	}
	static fromAngle(angle, magnitude) {
		//c'est un "outil" et donc une méthode de classe et donc on doit mettre static
		let mag = 1
		if (typeof magnitude !== 'undefined') {
			mag = magnitude
		}
		return new Vector(
			mag * Math.cos(angle - Math.PI / 2),
			mag * Math.sin(angle - Math.PI / 2)
		)
	}
}
